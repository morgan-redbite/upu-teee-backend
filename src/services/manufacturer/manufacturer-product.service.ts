import ManufacturerProductModel, { ManufacturerProduct } from "../../database/manufacturerSchema/manufacturerProduct.schema";
import * as uuid from 'uuid';
import ManufacturerProductImagesModel from "../../database/manufacturerSchema/manufacturerProductImages.schema";
import ManufacturerProductSupportingDocsModel from "../../database/manufacturerSchema/manufacturerProductSupportingDocs.schema";
import ManufacturerProfileModel, { IManufacturerProfile } from "../../database/manufacturerSchema/manufacturerProfile.schema";

export const getManufacturerProducts = async (manufacturerId: string) => {
    try {
        const result = await ManufacturerProductModel.find({
            manufacturerId: manufacturerId,
        });

        return result;
    } catch (error) {
        throw 'Error in [getManufacturerProducts]: ' + error;
    }
}

export const addManufacturerProduct = async (payload: ManufacturerProduct) => {
    try {
        let result;
        if (!payload.productId) {
            // If productId is not provided, it is new addition
            result = await ManufacturerProductModel.create({
                ...payload,
                productId: uuid.v4(),
            });
            return result;
        } else {
            // If productId is provided, it is an update, but we need to check if it exists
            const existingProduct = await ManufacturerProductModel.findOne({
                productId: payload.productId,
            });
            if (existingProduct) {
                // If it exists, update it
                throw `Product with ID ${payload.productId} already exists. Do you mean to update it?`;
            } else {
                throw `Product with ID ${payload.productId} does not exist`;
            }
        }
    } catch (error) {
        throw 'Error in [addManufacturerProduct]: ' + error;
    }
};

export const addOrUpdateManufacturerProduct = async (payload: ManufacturerProduct) => {
    try {
        let productId = payload.productId; // Check if productId is already provided

        if (!productId) {
            const result = await ManufacturerProductModel.create({
                ...payload,
                productId: uuid.v4(),
            });

            return result;
        } else {
            const result = await ManufacturerProductModel.updateOne(
                {
                    productId: payload.productId,
                },
                {
                    $set: payload
                },
                {
                    upsert: true,
                    new: true,
                }
            );

            return result;
        }
    } catch (error) {
        throw 'Error in [addManufacturerProduct]' + error;
    }
};

export const getFullManufacturerProduct = async (productId: string) => {
    try {
        const productInformation = await ManufacturerProductModel.findOne({
            productId: productId,
        });

        const productImages = await ManufacturerProductImagesModel.findOne({
            productId: productId,
        });

        const productSupportingDocs = await ManufacturerProductSupportingDocsModel.findOne({
            productId: productId,
        });

        if (!productInformation) {
            throw 'Product not found';
        }

        const result = {
            productInformation: productInformation,
            productImages: productImages?.images,
            supportingDocs: productSupportingDocs?.supportingDocs,
        };

        return result;
    } catch (error) {
        throw 'Error in [getFullManufacturerProduct]: ' + error;
    }
}

export const getFullManufacturerProductByAggregateSearchLike = async (anyIdString: string): 
Promise<ManufacturerProductWithImagesAndDocs> => {
    try {
        const result = await ManufacturerProductModel.aggregate(
            [
                {
                    $match: {
                        $or: [
                            { productId: anyIdString },
                            { productCode: anyIdString },
                        ],
                    },
                },
                {
                    $lookup: {
                        from: 'manufacturerproductimages',
                        localField: 'productId',
                        foreignField: 'productId',
                        as: 'productImages',
                    },
                },
                {
                    $lookup: {
                        from: 'manufacturerproductsupportingdocs',
                        localField: 'productId',
                        foreignField: 'productId',
                        as: 'supportingDocs',
                    },
                },
                {
                    $project: {
                        _id: 0,
                        createdAt: 0,
                        updatedAt: 0,
                        __v: 0,
                        'productImages._id': 0,
                        'productImages.createdAt': 0,
                        'productImages.updatedAt': 0,
                        'productImages.__v': 0,
                        'supportingDocs._id': 0,
                        'supportingDocs.createdAt': 0,
                        'supportingDocs.updatedAt': 0,
                        'supportingDocs.__v': 0,
                    },
                },
            ]
        )

        const mannufacturerProfile = await ManufacturerProfileModel.findOne({
            manufacturerId: result[0].manufacturerId,
        }, { _id: 0, createdAt: 0, updatedAt: 0, __v: 0, email: 0, });

        if (result.length === 0) {
            throw 'Product not found';
        }
        const productInformation = result[0];

        const { productImages, supportingDocs, ...rest } = productInformation;

        const exludeSupportingDocsIds = supportingDocs[0].supportingDocs.map((doc: any) => { delete doc._id; return doc; });
        
        return {
            productInformation: rest,
            productImages: productImages[0].images,
            supportingDocs: exludeSupportingDocsIds,
            mannufacturerProfile: mannufacturerProfile,
        }

    } catch (error) {
        throw 'Error in [getFullManufacturerProductByAggregateSearchLike]: ' + error;
    }
}

export interface ManufacturerProductWithImagesAndDocs {
    productInformation: ManufacturerProduct;
    productImages: string[];
    supportingDocs: string[];
    mannufacturerProfile: any;
}
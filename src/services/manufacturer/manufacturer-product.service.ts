import ManufacturerProductModel, { ManufacturerProduct } from "../../database/manufacturerSchema/manufacturerProduct.schema";
import * as uuid from 'uuid';

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

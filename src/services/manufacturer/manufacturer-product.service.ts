import ManufacturerProductModel, { ManufacturerProduct } from "../../database/manufacturerSchema/manufacturerProduct.schema";
import { IManufacturerProfile } from "../../database/manufacturerSchema/manufacturerProfile.schema";
import * as uuid from 'uuid';

export const addManufacturerProduct = async (payload: ManufacturerProduct) => {
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
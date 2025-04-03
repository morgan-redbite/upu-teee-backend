import ManufacturerProductImagesModel, { ManufacturerProductImages } from "../../database/manufacturerSchema/manufacturerProductImages.schema";

export const getManufacturerProductImages = async (productId: string) => {
  try {
    const result = await ManufacturerProductImagesModel.findOne({
        productId: productId,
    });

    return result;
  } catch (error) {
    throw 'Error in [getManufacturerProductImages]: ' + error;
  }
};

export const addManufacturerProductImages = async (payload: ManufacturerProductImages) => {
  try {
    const result = await ManufacturerProductImagesModel.updateOne({
      productId: payload.productId,
    }, {
      $set: payload,
    }, {
      upsert: true,
    });
    return result;
  } catch (error) {
    throw 'Error in [addManufacturerProductImages]: ' + error;
  }
};
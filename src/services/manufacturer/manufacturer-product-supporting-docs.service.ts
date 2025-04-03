import ManufacturerProductSupportingDocsModel, { ManufacturerProductSupportingDocs } from "../../database/manufacturerSchema/manufacturerProductSupportingDocs.schema";

export const getManufacturerProductSupportingDocs = async (productId: string) => {
  try {
    const result = await ManufacturerProductSupportingDocsModel.findOne({
        productId: productId,
    });

    return result;
  } catch (error) {
    throw 'Error in [getManufacturerProductSupportingDocs]: ' + error;
  }
};

export const addManufacturerProductSupportingDocs = async (payload: ManufacturerProductSupportingDocs) => {
  try {
    console.log('addManufacturerProductSupportingDocs payload:', payload);
    const result = await ManufacturerProductSupportingDocsModel.updateOne({
      productId: payload.productId,
    }, {
      $set: {
        productId: payload.productId,
        supportingDocs: payload.supportingDocs,
      },
    }, {
      upsert: true,
    });
    return result;
  } catch (error) {
    throw 'Error in [addManufacturerProductSupportingDocs]: ' + error;
  }
};
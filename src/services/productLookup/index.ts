import ManufacturerProductModel from "../../database/manufacturerSchema/manufacturerProduct.schema";
import ManufacturerProfileModel from "../../database/manufacturerSchema/manufacturerProfile.schema";
import { getFullManufacturerProduct } from "../manufacturer/manufacturer-product.service";

export const ProductLookupById = async (id: string) => {
  try {
    const result = await getFullManufacturerProduct(id);
    if (!result) {
      throw `Product with ID ${id} does not exist`;
    }
    const getManufacturerInfo = await ManufacturerProfileModel.findOne({
      manufacturerId: result.productInformation.manufacturerId,
    });
    return result;
  } catch (error) {
    
  }
}
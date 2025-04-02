import { PrivyAuthPayload } from '../../../types/express';
import ManufacturerProfileModel from '../../database/manufacturerSchema/manufacturerProfile.schema';

export const registerOrGetManufacturer = async (profileData: PrivyAuthPayload) => {
  try {
    const findOneExist = await ManufacturerProfileModel.findOne({
      manufacturerId: profileData.sub
    });

    if (findOneExist) {
      return findOneExist;
    } else {
      const result = await ManufacturerProfileModel.create({
        manufacturerId: profileData.sub
      });

      return result;
    }
  } catch (error) {
    throw 'Error in [registerManufacturer]' + error;
  }
}
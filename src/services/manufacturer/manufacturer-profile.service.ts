import { PrivyAuthPayload } from '../../../types/express';
import ManufacturerProfileModel, { IManufacturerProfile } from '../../database/manufacturerSchema/manufacturerProfile.schema';

export const registerOrGetManufacturer = async (privyUser: PrivyAuthPayload) => {
  try {
    const findOneExist = await ManufacturerProfileModel.findOne({
      manufacturerId: privyUser.sub
    });

    if (findOneExist) {
      return findOneExist;
    } else {
      const result = await ManufacturerProfileModel.create({
        manufacturerId: privyUser.sub
      });

      return result;
    }
  } catch (error) {
    throw 'Error in [registerManufacturer]' + error;
  }
}

export const updateManufacturerProfile = async (payload: IManufacturerProfile) => {
  try {
    const result = await ManufacturerProfileModel.findOneAndUpdate({
      manufacturerId: payload.manufacturerId
    }, {
      ...payload
    }, {
      new: true
    });

    return result;
  } catch (error) {
    throw 'Error in [updateManufacturerProfile]' + error;
  }
}
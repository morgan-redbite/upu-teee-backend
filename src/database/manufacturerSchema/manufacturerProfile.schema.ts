import mongoose, { Document, Schema } from 'mongoose';

export interface IManufacturerProfile extends Document {
  manufacturerId: string;
  companyName: string;
  email: string;
  country: string;
  industry: string;
  yearEstablished: string;
  website: string;
};

const ManufacturerProfileSchema = new Schema({
  manufacturerId: {
    type: String,
    required: true,
    unique: true,
  },
  companyName: {
    type: String,
    required: false,
    default: null,
  },
  email: {
    type: String,
    required: false,
    default: null
  },
  country: {
    type: String,
    required: false,
    default: null
  },
  industry: {
    type: String,
    required: false,
    default: null
  },
  yearEstablished: {
    type: String,
    required: false,
    default: null
  },
  website: {
    type: String,
    required: false,
    default: null
  },
}, {
  timestamps: true,
});

const ManufacturerProfileModel = mongoose.model<IManufacturerProfile>('ManufacturerProfile', ManufacturerProfileSchema);
export default ManufacturerProfileModel;

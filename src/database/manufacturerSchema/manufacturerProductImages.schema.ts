import mongoose, { Document, Schema } from 'mongoose';

export interface ManufacturerProductImages {
  productId: string;
  images: string[];
}

interface ManufacturerProductImagesDocument extends ManufacturerProductImages, Document {}

const ManufacturerProductImagesSchema = new Schema<ManufacturerProductImagesDocument>({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  images: {
    type: [String],
    required: true,
  },
}, {
  timestamps: true,
  _id: true,
});

const ManufacturerProductImagesModel = mongoose.model<ManufacturerProductImagesDocument>('ManufacturerProductImages', ManufacturerProductImagesSchema);
export default ManufacturerProductImagesModel;
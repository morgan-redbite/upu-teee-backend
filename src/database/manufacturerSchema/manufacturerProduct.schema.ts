import mongoose, { Document, Schema } from 'mongoose';

export interface ManufacturerProduct {
  productId?: string;
  manufacturerId: string;
  brand: string;
  productName: string;
  category: string[];
  sku?: string;
  productCode?: string;
  productDescription?: string;
  information?: any[]; // Consider a more specific type if possible
}

interface ManufacturerProductDocument extends ManufacturerProduct, Document {}

const ManufacturerProductSchema = new Schema<ManufacturerProductDocument>({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  manufacturerId: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  category: {
    type: [String],
    required: true,
  },
  sku: {
    type: String,
    required: false,
    default: null,
  },
  productCode: {
    type: String,
    required: false,
    default: null,
  },
  productDescription: {
    type: String,
    required: false,
    default: null,
  },
  information: {
    type: Array,
    required: false,
  },
}, {
  timestamps: true,
  _id: true,
});

const ManufacturerProductModel = mongoose.model<ManufacturerProductDocument>('ManufacturerProduct', ManufacturerProductSchema);
export default ManufacturerProductModel;

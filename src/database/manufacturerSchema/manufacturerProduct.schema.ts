import mongoose, { Document, Schema } from 'mongoose';

const ManufacturerProductSchema = new Schema({
  manufacturerId: {
    type: String,
    required: true,
    unique: true,
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
  },
  productCode: {
    type: String,
    required: false,
  },
  productDescription: {
    type: String,
    required: false,
  },
  information: {
    type: Array,
    required: false,
  },
});

const ManufacturerProductModel = mongoose.model('ManufacturerProduct', ManufacturerProductSchema);
export default ManufacturerProductModel;

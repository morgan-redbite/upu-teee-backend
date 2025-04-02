import mongoose, { Document, Schema } from 'mongoose';

const ProductDescriptionSchema: Schema = new Schema({
  udid: { type: String, required: true },
  description: { type: String, required: true },
}, {
  timestamps: true,
});

const ProductDescriptionrModel = mongoose.model('ProductDescription', ProductDescriptionSchema);
export default ProductDescriptionrModel;

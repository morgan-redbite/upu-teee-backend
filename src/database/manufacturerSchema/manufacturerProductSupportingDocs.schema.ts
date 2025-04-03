import mongoose, { Document, Schema } from 'mongoose';

interface SupportingDoc {
  documentName: string;
  documentType: string;
  documentData: string;
}

export interface ManufacturerProductSupportingDocs {
  productId: string;
  supportingDocs: SupportingDoc[];
}

interface ManufacturerProductSupportingDocsDocument extends ManufacturerProductSupportingDocs, Document {}

const ManufacturerProductSupportingDocsSchema = new Schema<ManufacturerProductSupportingDocsDocument>({
  productId: {
    type: String,
    required: true,
    unique: true,
  },
  supportingDocs: {
    type: [
      {
        documentName: { type: String, required: true },
        documentType: { type: String, required: true },
        documentData: { type: String, required: true },
      },
    ],
    required: true,
  },
}, {
  timestamps: true,
  _id: true,
});

const ManufacturerProductSupportingDocsModel = mongoose.model<ManufacturerProductSupportingDocsDocument>('ManufacturerProductSupportingDocs', ManufacturerProductSupportingDocsSchema);
export default ManufacturerProductSupportingDocsModel;
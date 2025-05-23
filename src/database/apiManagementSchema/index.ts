import mongoose, { Document, Model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

/**
 * Interface describing the shape of an API Key document
 */
export interface IApiKey extends Document {
  /** Unique UUID for this record */
  id: string;
  /** ID of the manufacturer who owns this key */
  manufacturerId: string;
  /** The actual API key string */
  apiKey: string;
  /** Whether this key is active */
  active: boolean;
  /** Timestamp when this key was created */
  createdAt: Date;
}

/**
 * Mongoose schema for API Key storage
 */
const ApiKeySchema = new mongoose.Schema<IApiKey>(
  {
    id: {
      type: String,
      default: uuidv4,
      unique: true,
      index: true,
    },
    manufacturerId: {
      type: String,
      required: true,
      index: true,
    },
    apiKey: {
      type: String,
      required: true,
      unique: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  {
    // Ensure virtuals (like `id`) show up when documents are serialized
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

/**
 * Expose the model for use in services
 */
export const ApiKeyModel: Model<IApiKey> = mongoose.model<IApiKey>('ApiKey', ApiKeySchema);
export default ApiKeyModel;

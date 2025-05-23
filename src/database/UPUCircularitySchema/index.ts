import mongoose, { Document, Model } from 'mongoose';

/**
 * Interface describing the shape of an e-waste collection booking
 */
export interface IEwasteBooking extends Document {
  /** Optional arbitrary date (e.g. request date) */
  date?: Date;
  /** ID of the product being collected */
  productId: string;
  /** Estimated price for collection */
  estimatedPrice: number;
  /** Scheduled collection date */
  collectionDate: Date;
  /** Scheduled pickup time (e.g. "14:30") */
  pickupTime: string;
  /** Transaction identifier for this booking */
  transactionId: string;
}

/**
 * Mongoose schema for e-waste collection bookings
 */
const EwasteBookingSchema = new mongoose.Schema<IEwasteBooking>(
  {
    productId: {
      type: String,
      required: true,
      index: true,
    },
    estimatedPrice: {
      type: Number,
      required: true,
    },
    collectionDate: {
      type: Date,
      required: true,
    },
    pickupTime: {
      type: String,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Expose the model
 */
export const EwasteBookingModel: Model<IEwasteBooking> =
  mongoose.model<IEwasteBooking>('EwasteBooking', EwasteBookingSchema);

export default EwasteBookingModel;

import EwasteBookingModel, { IEwasteBooking } from "../../database/UPUCircularitySchema";
import { v4 as uuid } from "uuid";

export interface BookingInput {
    productId: string;
    estimatedPrice: number;
    collectionDate: Date;
    pickupTime: string;
    transactionId: string;
}

const MOCK_PAYLOAD = {
    productId: "123456",
    collectionDate: new Date(),
    pickupTime: "14:30",
}

export const BookingServices = async (data: BookingInput): Promise<IEwasteBooking> => {
    try {

      // random estimate price between 100 to 300
			const randomPrice = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
      // create & save a new booking
      const payload = {
        ...MOCK_PAYLOAD,
				estimatedPrice: randomPrice,
        transactionId: generateTransactionId(),
      }
      const booking = new EwasteBookingModel(payload);
      return await booking.save();
    } catch (error) {
      // bubble up for the controller to handle
      throw error;
    }
};

const generateTransactionId = () => {
    return uuid(); 
}
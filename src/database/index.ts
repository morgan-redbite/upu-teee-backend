import mongoose from 'mongoose';

const mongooseConnection = async () => {
  try {
    const url = process.env.MONGO_URI || '';
    const client = await mongoose.connect(url);
    if (client.connection.readyState === 1) {
      console.log('Connected to MongoDB', client.connection.config);
    }
  } catch (error) {
    console.error('Error [mongoConnection]:', error);
  }
}

export default mongooseConnection;
import mongoose, { Schema } from 'mongoose';

const DIDIndexer: Schema = new Schema({
  udid: { type: String, required: true },
  owner: { type: String, required: true },
}, {
  timestamps: true,
});

const DIDIndexerModel = mongoose.model('DIDIndexer', DIDIndexer);
export default DIDIndexerModel;

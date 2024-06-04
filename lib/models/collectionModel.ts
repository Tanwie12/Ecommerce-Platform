import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema({
  title: {
    unique: true,
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  }],
}, { timestamps: true });

const Collection = mongoose.models.Collection || mongoose.model('Collection', collectionSchema);
export default Collection;

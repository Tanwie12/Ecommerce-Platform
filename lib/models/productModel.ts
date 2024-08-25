
import mongoose from "mongoose";


const ProductSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    media: [String],
    category: String,
    collections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Collection",
      },
    ],
    tags: [String],
    price: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    cost: {
      type: mongoose.Schema.Types.Decimal128,
      get: (v: mongoose.Schema.Types.Decimal128) => {
        return parseFloat(v.toString());
      },
    },
    colors: [String],
    sizes: [String],
  },
  { toJSON: { getters: true }, timestamps: true }
);

const Product=mongoose.models.Product || mongoose.model("Product",ProductSchema)

export default Product
import { model, Schema } from "mongoose";

const cardSchema = new Schema(
  {
    ygoId: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    race: {
      type: String,
    },
    attribute: {
      type: String,
    },
    atk: {
      type: Number,
    },
    def: {
      type: Number,
    },
    level: {
      type: Number,
    },
    originalImageUrl: {
      type: String,
      required: true,
    },
    imagePath: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

export const cardModel = model("Card", cardSchema);

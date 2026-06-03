import { model, Schema, HydratedDocument } from "mongoose";

export interface ICard {
  ygoId: number;
  type: string;
  name: string;
  description: string;
  race?: string;
  attribute?: string;
  atk?: number;
  def?: number;
  level?: number;
  originalImageUrl: string;
  imagePath?: string;
}

const cardSchema = new Schema<ICard>(
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

export type TCardDocument = HydratedDocument<ICard>;
export const cardModel = model<ICard>("Card", cardSchema);

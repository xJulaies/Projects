import { RequestHandler } from "express";
import { cardModel } from "./cards.model";
import { createError } from "../../lib/handleError/createError";
import { createAnswer } from "../../lib/handleError/createAnswer";
import type { TCardNameParams } from "../../types/card.types";

export const GET_CardsByName: RequestHandler<TCardNameParams> = async (
  req,
  res,
  next,
) => {
  try {
    const { cardName } = req.params;
    const cards = await cardModel.find({
      name: new RegExp(cardName, "i"),
    });

    if (cards.length === 0) {
      return next(createError(404, "No cards found"));
    }

    return res
      .status(200)
      .json(createAnswer(200, "All card data by name", cards));
  } catch (error) {
    return next(createError(500, "Cannot load card data"));
  }
};

export const POST_Cards: RequestHandler = async (req, res, next) => {
  try {
    const response = await fetch(
      "https://db.ygoprodeck.com/api/v7/cardinfo.php",
    );

    if (!response.ok) {
      return next(createError(400, "Could not load data"));
    }

    const result = await response.json();

    return res
      .status(200)
      .json(
        createAnswer(200, "Cards successfully fetched", [result.data.length]),
      );
  } catch (error) {
    return next(createError(500, "Failed to update card database"));
  }
};

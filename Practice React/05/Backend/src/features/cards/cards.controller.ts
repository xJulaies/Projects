import { RequestHandler } from "express";
import { cardModel } from "./cards.model";
import { createError } from "../../lib/handleError/createError";
import { createAnswer } from "../../lib/handleError/createAnswer";
import { handleImages } from "./image.service";
import type { TCardNameParams } from "../../types/card.types";
import type { TCardDocument } from "./cards.model";

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

    async function checkImage(cards: TCardDocument[]) {
      for (const card of cards) {
        await handleImages(card);
      }
    }
    await checkImage(cards);

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

    const results = await response.json();

    async function writeCardsInDB() {
      for (const result of results.data) {
        await cardModel.updateOne(
          { ygoId: result.id },
          {
            $set: {
              name: result.name,
              type: result.type,
              description: result.desc,
              race: result.race,
              attribute: result.attribute,
              atk: result.atk,
              def: result.def,
              level: result.level,
              originalImageUrl: result.card_images[0].image_url,
            },
            $setOnInsert: {
              ygoId: result.id,
              imagePath: "",
            },
          },
          {
            upsert: true,
          },
        );
      }
    }
    await writeCardsInDB();

    return res
      .status(200)
      .json(
        createAnswer(200, "Cards successfully updated", [
          { processedCards: results.data.length },
        ]),
      );
  } catch (error) {
    return next(createError(500, "Failed to update card database"));
  }
};

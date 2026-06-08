import { Router } from "express";
import {
  GET_CardsByName,
  GET_RandomCard,
  POST_Cards,
} from "./cards.controller";

export const cardsRouter = Router();

cardsRouter.get("/search/:cardName", GET_CardsByName);
cardsRouter.get("/random", GET_RandomCard);
cardsRouter.post("/import", POST_Cards);

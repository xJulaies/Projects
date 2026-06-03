import { Router } from "express";
import { GET_CardsByName, POST_Cards } from "./cards.controller";

export const cardsRouter = Router();

cardsRouter.get("/search/:cardName", GET_CardsByName);
cardsRouter.post("/import", POST_Cards);

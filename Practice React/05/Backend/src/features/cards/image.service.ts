import path from "path";
import { writeFile } from "fs/promises";
import { createError } from "../../lib/handleError/createError";

import type { TCardDocument } from "./cards.model";

export async function handleImages(card: TCardDocument) {
  if (!card.imagePath) {
    console.log(`Downloading image for ${card.name}`);
    const image = await fetch(card.originalImageUrl);
    if (!image.ok) {
      throw createError(500, "Unable to fetch image");
    }
    const imageBuffer = Buffer.from(await image.arrayBuffer());

    const fileName = `${card.ygoId}.jpg`;
    const localImagePath = path.join(
      process.cwd(),
      "public",
      "card-images",
      fileName,
    );
    const publicImagePath = `/card-images/${fileName}`;

    await writeFile(localImagePath, imageBuffer);
    card.imagePath = publicImagePath;
    await card.save();

    return card;
  }
  console.log(`Using local image for ${card.name}`);
  return card;
}

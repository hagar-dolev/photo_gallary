import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

import { PhotoType } from "./types/PhotoType";
import { getRandomInt } from "./utils";

const key = "1a8b5921600c4f1a8fccb93eb05c98f1";
// const endpoint = "https://westcentralus.api.cognitive.microsoft.com/vision";
const endpoint = "https://westcentralus.api.cognitive.microsoft.com/";

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

export const randomImages = async (
  amount: number,
  sizeX: number,
  sizeY: number
) => {
  let images: PhotoType[] = [];
  for (let index = 0; index < amount; index++) {
    const randomId = getRandomInt(1000);
    const imageUrl = `https://picsum.photos/seed/${randomId.toString()}/${sizeX}/${sizeY}.jpg`;
    let description = await computerVisionClient.describeImage(`${imageUrl}`);
    if (description) {
      let tags = description.tags;
      let caption = description.captions ? description.captions[0].text : "";
      if (!tags || !caption) {
        index -= 1;
        continue;
      }
      let currPhoto: PhotoType = {
        id: randomId,
        srcUrl: imageUrl,
        description: caption,
        tags: tags,
      };
      images.push(currPhoto);
    }
  }
  return images;
};

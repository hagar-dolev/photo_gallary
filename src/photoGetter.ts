import { ComputerVisionClient } from "@azure/cognitiveservices-computervision";
import { ApiKeyCredentials } from "@azure/ms-rest-js";

import { getRandomInt } from "./utils";

const key = "1a8b5921600c4f1a8fccb93eb05c98f1";
const endpoint = "https://westcentralus.api.cognitive.microsoft.com/";

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { "Ocp-Apim-Subscription-Key": key } }),
  endpoint
);

const createImageUrl = (id: number, sizeX: number, sizeY: number) => {
  return `https://picsum.photos/seed/${id.toString()}/${sizeX}/${sizeY}.jpg`;
};

export const randomImages = async (
  amount: number,
  sizeX: number,
  sizeY: number
) => {
  const imagesPromises = Array.from(new Array(amount).keys()).map(async () => {
    const randomId = getRandomInt(1000);
    const imageUrl = createImageUrl(randomId, sizeX, sizeY);
    const description = await computerVisionClient.describeImage(`${imageUrl}`);
    const tags = description?.tags;
    const caption = description?.captions ? description?.captions[0].text : "";
    return {
      id: randomId,
      srcUrl: imageUrl,
      description: caption,
      tags: tags,
    };
  });
  return Promise.all(imagesPromises);
};

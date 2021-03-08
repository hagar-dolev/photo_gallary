import { getRandomInt } from "./utils";

const key = "1a8b5921600c4f1a8fccb93eb05c98f1";
const endpoint =
  "https://westcentralus.api.cognitive.microsoft.com/vision/v3.1/describe";

const computerVisionClient = (imageUrl: string) => {
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Host: "westcentralus.api.cognitive.microsoft.com",
      "Content-Type": "application/json",
      "Ocp-Apim-Subscription-Key": key,
    },
    body: `{"url":"${imageUrl}"}`,
  })
    .then((value) => value.json())
    .catch(console.error);
};

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
    const description = (await computerVisionClient(imageUrl))?.description;
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

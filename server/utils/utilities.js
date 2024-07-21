import fetch from "node-fetch";
import { createApi } from "unsplash-js";
import dotenv from "dotenv";

dotenv.config();

function checkArray(arr1, arr2, sequence) {
  if (arr1.length !== arr2.length) return false;

  if (sequence) {
    return arr1.every((value, index) => value === arr2[index]);
  }

  return arr1.every((value) => arr2.includes(value));
}

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_SECRET_KEY,
  fetch: fetch,
});

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export { checkArray, unsplash, shuffleArray };

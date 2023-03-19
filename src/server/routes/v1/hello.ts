import {defineEventHandler} from "h3";

export default defineEventHandler(event => {
  return { body: "Thank you for visited" };
})

import {defineEventHandler, readBody} from "h3";
import {getAll, likePost, viewPost} from "../../utils/post-update";

// pools will use environment variables
// for connection information

export default defineEventHandler(async (event) => {
  console.log("Got request event", event);
  const node = event.node;
  try {
    if (node.req.method == "PUT") {
      let body = await readBody(event);
      if (body.like) {
        await likePost(body.postSlug, body.like > 0);
      }
      if (body.view) {
        await viewPost(body.postSlug);
      }
    } else if (node.req.method === "GET") {
      return await getAll();
    } else {
      return {status: 404};
    }
  } catch (e) {
    return {status: 400};
  }
  return {status: 200};
});

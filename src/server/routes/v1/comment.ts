import {defineEventHandler, getQuery, readBody} from "h3";
import {ICommentInfo} from "../../models/comment.model";
import {commentPost, getAllComments, likeComment} from "../../utils/comment-update";

// pools will use environment variables
// for connection information

export default defineEventHandler(async (event) => {
  const node = event.node;
  try {
    if (node.req.method === "GET") {
      let body = getQuery(event) as any;
      return await getAllComments(body.slug);
    } else if (node.req.method === "POST") {
      let body = await readBody(event);
      await commentPost(body as ICommentInfo);
    } else if (node.req.method === "PUT") {
      let body = await readBody(event);
      await likeComment(body as ICommentInfo);
    } else {
      return {status: 404};
    }
  } catch (e) {
    return {status: 400};
  }
  return {status: 200};
});

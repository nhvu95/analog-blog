import {ICommentInfo} from "../models/comment.model";
import {client} from "./database";
import {Client} from "ts-postgres";
async function _checkPostExist(client: Client, postId: string) {
  const checkExist = await client.query(`SELECT exists(SELECT 1 FROM post WHERE slug=$1)`, [postId]);
  const exist = checkExist.rows[0][0] as boolean;
  return exist;
}
async function _commentPost(comment: ICommentInfo): Promise<void> {
  try {
    // Check comment exist
    if (comment.id) {
      await client.query(`DELETE FROM comment WHERE slug=$1 AND id=$2;`, [comment.slug, comment.id]);
    }
    if (await _checkPostExist(client, comment.slug)) {
      await client.query(`UPDATE post SET comment = comment+$1 WHERE slug=$2;`, [1, comment.slug]);
    }
    await client.query(`INSERT INTO comment (slug,content,liked,disliked) VALUES ($1,$2,$3,$4);`, [comment.slug, comment.content, 0, 0]);
  } catch (e) {
    throw e;
  }
}

async function _likeComment(comment: ICommentInfo): Promise<void> {
  try {
    // Check post exist
    if (await _checkPostExist(client, comment.slug) === true && comment.id && comment.alreadyLike) {
      await client.query(`UPDATE comment SET liked=liked+$1 WHERE slug=$2 AND id=$3;`, [1, comment.slug, comment.id]);
    } else if (await _checkPostExist(client, comment.slug) === true && comment.id && !comment.alreadyLike) {
      await client.query(`UPDATE comment SET disliked=disliked+$1 WHERE slug=$2 AND id=$3;`, [1, comment.slug, comment.id]);
    }
  } catch (e) {
    throw e;
  }
}

async function _getAllComments(slug: string): Promise<ICommentInfo[]> {
  try {
    const queryAll = await client.query(`SELECT * FROM comment WHERE slug=$1`, [slug]);
    return queryAll.rows.map(row => {
      return {slug: row[0], id: row[1], content: row[2], liked: row[3], disliked: row[4], createdAt: row[5]} as ICommentInfo;
    })
  } catch (e) {
    throw e;
  }
  return [];
}

export { _commentPost as commentPost, _getAllComments as getAllComments, _likeComment as likeComment};

import {Client} from 'ts-postgres';
import {IPostInfo} from "../models/post.model";
import {client} from "./database";

async function _likePost(postId: string, isIncrease = true): Promise<void> {
  try {
    // Check post exist
    if (await _checkPostExist(client, postId) === false) {
      await client.query(`INSERT INTO post VALUES ($1,$2,$3,$4);`, [postId, 1, 0, 0]);
    } else {
      await client.query(`UPDATE post SET liked=liked+$1 WHERE slug=$2;`, [isIncrease ? 1 : -1, postId]);
    }
  } catch (e) {
    throw e;
  }
}

async function _viewPost(postId: string): Promise<void> {
  try {
    // Check post exist
    if (await _checkPostExist(client, postId) === false) {
      await client.query(`INSERT INTO post VALUES ($1,$2,$3,$4);`, [postId, 0, 1, 0]);
    } else {
      await client.query(`UPDATE post SET read=read+$1 WHERE slug=$2;`, [1, postId]);
    }
  } catch (e) {
    throw e;
  }
}

async function _checkPostExist(client: Client, postId: string) {
  const checkExist = await client.query(`SELECT exists(SELECT 1 FROM post WHERE slug=$1)`, [postId]);
  const exist = checkExist.rows[0][0] as boolean;
  return exist;
}
async function _getAll(): Promise<IPostInfo[]> {
  try {
    const queryAll = await client.query(`SELECT * FROM post`);
    return queryAll.rows.map(row => {
      return {slug: row[0], liked: row[1], read: row[2], comment: row[3]} as IPostInfo;
    })
  } catch (e) {
    throw e;
  }
  return [];
}


export {_likePost as likePost, _viewPost as viewPost, _getAll as getAll};

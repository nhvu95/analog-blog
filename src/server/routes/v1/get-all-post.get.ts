import { defineEventHandler } from 'h3';
import { AppDataSource } from '../../utils/database';
import { IPostInfo } from '../../models/post.model';

export default defineEventHandler(async (event) => {
  return await AppDataSource.getRepository(IPostInfo).find();
});

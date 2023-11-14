import { defineEventHandler, getQuery } from 'h3';
import { AppDataSource } from '../../utils/database';
import { ICommentInfo } from '../../models/comment.model';

export default defineEventHandler(async (event) => {
  const queryData = getQuery(event) as {
    slug: string;
  };
  return await AppDataSource.getRepository(ICommentInfo).find({
    where: {
      slug: queryData.slug,
    },
  });
});

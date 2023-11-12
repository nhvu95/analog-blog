import { defineEventHandler, getQuery } from 'h3';
import { IPostInfo } from '../../models/post.model';
import { AppDataSource } from '../../utils/database';

export default defineEventHandler(async (event) => {
  const queryData = getQuery(event) as { slug?: string };
  const entity = AppDataSource.getRepository(IPostInfo);
  const posts = await entity.find({
    where: {
      slug: queryData.slug,
    },
  });

  if (posts.length === 0) {
    const newPost = entity.create({
      slug: queryData.slug,
      comment: 0,
      liked: 1,
      read: 0,
      date: new Date(),
    });
    return await entity.save(newPost);
  } else {
    return await entity.update(
      { slug: posts[0].slug },
      { liked: posts[0].liked + 1 }
    );
  }
});

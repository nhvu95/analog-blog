import { defineEventHandler, readBody } from 'h3';
import { IPostInfo } from '../../models/post.model';
import { AppDataSource } from '../../utils/database';
import { ICommentInfo } from '../../models/comment.model';

export default defineEventHandler(async (event) => {
  const queryData = (await readBody(event)) as {
    slug: string;
    comment: string;
    author: string;
  };
  const entityPost = AppDataSource.getRepository(IPostInfo);
  const entityComment = AppDataSource.getRepository(ICommentInfo);
  const posts = await entityPost.find({
    where: {
      slug: queryData.slug,
    },
  });

  if (posts.length === 0) {
    const post = entityPost.create({
      slug: queryData.slug,
      comment: 1,
      liked: 0,
      read: 0,
      date: Date.now(),
    });
    await entityPost.save(post);
  } else {
    await entityPost.update(
      { slug: posts[0].slug },
      { comment: posts[0].comment + 1 }
    );
  }
  return await entityComment.save({
    slug: queryData.slug,
    content: queryData.comment,
    liked: 0,
    disliked: 0,
    createdAt: Date.now(),
  } as ICommentInfo);
});

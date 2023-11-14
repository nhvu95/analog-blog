import { defineEventHandler, readBody } from 'h3';
import { AppDataSource } from '../../utils/database';
import { ICommentInfo } from '../../models/comment.model';

export default defineEventHandler(async (event) => {
  const queryData = (await readBody(event)) as {
    commentId: number;
    unlike: string;
  };
  const entityComment = AppDataSource.getRepository(ICommentInfo);
  const comments = await entityComment.findBy({ id: queryData.commentId });

  if (comments.length > 0) {
    await entityComment.update(
      { id: comments[0].id },
      {
        disliked: comments[0].disliked
          ? comments[0].disliked + (queryData.unlike === 'true' ? -1 : 1)
          : 1,
      }
    );
    return (
      (await entityComment.findBy({ id: queryData.commentId }))[0] ?? {
        error: 404,
      }
    );
  } else {
    return { error: 404 };
  }
});

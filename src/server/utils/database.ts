import { DataSource } from 'typeorm';
import { ICommentInfo } from '../models/comment.model';
import { IPostInfo } from '../models/post.model';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: `./line.sqlite`,
  entities: [ICommentInfo, IPostInfo],
  synchronize: true,
  logging: false,
});
AppDataSource.initialize()
  .then(() => {
    console.log('Initialize success');
  })
  .catch((err) => {
    console.log(err);
  });

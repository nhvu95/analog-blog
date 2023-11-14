import { defineEventHandler } from 'h3';
import { AppDataSource } from '../utils/database';
import { DataSource } from 'typeorm';

let dataSource: DataSource | null = null;
export default defineEventHandler(async () => {
  if (!dataSource) {
    await AppDataSource.initialize()
      .then((source) => {
        console.log('Initialize success');
        dataSource = source;
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

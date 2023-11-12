import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ICommentInfo {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('text', { nullable: false })
  // @ts-ignore
  slug: string;

  @Column('text', { nullable: true })
  author?: string;

  @Column('text', { nullable: false })
  // @ts-ignore
  content: string;

  @Column('integer', { nullable: true })
  liked?: number;

  @Column('integer', { nullable: true })
  disliked?: number;

  @Column('integer', { nullable: true })
  createdAt?: number;

  createdDayAgo?: string;
  alreadyLike?: boolean;
  alreadyDislike?: boolean;
}

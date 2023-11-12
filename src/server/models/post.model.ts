import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class IPostInfo {
  @PrimaryColumn('text', { nullable: false })
  // @ts-ignore
  slug: string;

  @Column('integer', { nullable: false })
  // @ts-ignore
  liked: number;

  @Column('date', { nullable: false })
  // @ts-ignore
  date: Date;

  @Column('integer', { nullable: false })
  // @ts-ignore
  read: number;

  @Column('integer', { nullable: false })
  // @ts-ignore
  comment: number;
}

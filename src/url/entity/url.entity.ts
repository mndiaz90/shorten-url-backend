import { Matches } from 'class-validator';
import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Clicks } from './clicks.entity';
@Entity()
export class Url {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  short_url: string;

  @Column()
  @Matches(
    'https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)',
  )
  original_url: string;

  @OneToMany(() => Clicks, (click) => click.url, {
    eager: true,
  })
  @JoinColumn()
  clicks: Clicks[];
}

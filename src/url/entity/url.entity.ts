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
  original_url: string;

  @OneToMany(() => Clicks, (click) => click.url, {
    eager: true,
  })
  @JoinColumn()
  clicks: Clicks[];
}

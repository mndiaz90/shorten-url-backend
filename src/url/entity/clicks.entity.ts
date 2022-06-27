import {
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Url } from './url.entity';

@Entity()
export class Clicks {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => Url, (url) => url.clicks, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  url: Url;
}

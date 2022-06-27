import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Clicks } from '../entity/clicks.entity';
import { Url } from '../entity/url.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectRepository(Url)
    private urlRepository: Repository<Url>,
    @InjectRepository(Clicks)
    private clickRepository: Repository<Clicks>,
  ) {}
  async findAll(): Promise<Url[]> {
    return await this.urlRepository.find();
  }
  async create(url: Url): Promise<Url> {
    url.short_url = `http://${Math.random().toString(36).substring(2, 7)}`;
    return await this.urlRepository.save(url);
  }

  async visit(id: number): Promise<string> {
    const url = await this.urlRepository.findOneBy({
      id,
    });
    this.clickRepository.save({ url });
    return url.original_url;
  }

  async statsById(id: number): Promise<object> {
    const result = this.clickRepository
      .createQueryBuilder('clicks')
      .select('created_at, count(*) as count')
      .where('urlId = :id', { id })
      .groupBy('Date(clicks.created_at)')
      .getRawMany();

    return result;
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.urlRepository.delete(id);
  }
}

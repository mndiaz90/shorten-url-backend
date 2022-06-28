import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { Url } from '../entity/url.entity';
import { UrlService } from '../service/url.service';

@Controller('api/url')
export class UrlController {
  constructor(private urlService: UrlService) {}

  @Get()
  async getAll(): Promise<Url[]> {
    return this.urlService.findAll();
  }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() url: Url): Promise<Url> {
    return await this.urlService.create(url);
  }

  @Post('visit/:id')
  async visit(@Param('id') id: number): Promise<object> {
    return await this.urlService.visit(id);
  }

  @Get('stats/:id')
  async statsById(@Param('id') id: number): Promise<object> {
    return await this.urlService.statsById(id);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.urlService.delete(id);
  }
}

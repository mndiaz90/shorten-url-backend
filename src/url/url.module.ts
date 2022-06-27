import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './controller/url.controller';
import { UrlService } from './service/url.service';
import { Url } from './entity/url.entity';
import { Clicks } from './entity/clicks.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Url, Clicks])],
  providers: [UrlService],
  controllers: [UrlController],
})
export class UrlModule {}

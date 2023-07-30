import { Module } from '@nestjs/common';
import { CrawlerService } from './crawler.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Business, Company } from '../_entities';
import { CrawlerController } from './crawler.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Company, Business])],
  providers: [CrawlerService],
  controllers: [CrawlerController],
  exports: [CrawlerService],
})
export class CrawlerModule {}

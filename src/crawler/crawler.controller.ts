import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProvincePage } from '../_types/ProvincePage';
import { CrawlerService } from './crawler.service';

@ApiTags('Crawler')
@Controller('/api/crawler')
export class CrawlerController {
  constructor(private readonly crawlerService: CrawlerService) {}

  @Get('/query')
  @ApiResponse({
    type: String,
  })
  async query(): Promise<ProvincePage[]> {
    return this.crawlerService.getProvincePages();
  }
}

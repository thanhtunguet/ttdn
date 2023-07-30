import { Injectable } from '@nestjs/common';
import { InfoRepository } from './_repositories/info-repository';
import { firstValueFrom } from 'rxjs';
import { SOURCE_URL } from './_config/consts';
import { WEB_URI } from './_config/dotenv';
import { CrawlerService } from './crawler/crawler.service';

@Injectable()
export class AppService {
  constructor(
    private readonly infoRepository: InfoRepository,
    private readonly crawlerService: CrawlerService,
  ) {}

  public company(company: string): Promise<string> {
    return firstValueFrom(this.infoRepository.company(company)).then(
      async (html) => {
        await this.crawlerService.crawlCompany(company, html);
        return this.replaceUrl(html);
      },
    );
  }

  public province(province: string): Promise<string> {
    return firstValueFrom(this.infoRepository.province(province)).then(
      (html) => {
        return this.replaceUrl(html);
      },
    );
  }

  public district(
    province: string,
    district: string,
    page = 1,
  ): Promise<string> {
    return firstValueFrom(
      this.infoRepository.district(province, district, page),
    ).then((html) => this.replaceUrl(html));
  }

  public index(): Promise<string> {
    return firstValueFrom(this.infoRepository.index()).then((html) =>
      this.replaceUrl(html),
    );
  }

  private replaceUrl(html: string) {
    return html.split(SOURCE_URL).join(WEB_URI);
  }
}

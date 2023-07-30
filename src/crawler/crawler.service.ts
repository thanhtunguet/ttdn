import { Injectable } from '@nestjs/common';
import axios from 'axios/index';
import * as cheerio from 'cheerio';
import { CheerioAPI } from 'cheerio';
import { ProvincePage } from '../_types/ProvincePage';
import { SOURCE_URL } from '../_config/consts';

function splitArrayByLength(arr, chunkSize) {
  const result = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    const chunk = arr.slice(i, i + chunkSize);
    result.push(chunk);
  }
  return result;
}

// Example usage:
const longArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
const chunkedArrays = splitArrayByLength(longArray, 5);
console.log(chunkedArrays);

@Injectable()
export class CrawlerService {
  async sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async getProvincePages(): Promise<ProvincePage[]> {
    const html = await axios.get(SOURCE_URL).then((resp) => resp.data);
    const $: CheerioAPI = cheerio.load(html);

    const anchors = $('.list-link')
      .children()
      .map(function () {
        return $(this).children('a');
      })
      .toArray();
    const provincePages = anchors.map(
      (anchor): ProvincePage => ({
        href: anchor.attr('href'),
        text: anchor.text(),
        pages: 0,
      }),
    );
    const chunks = splitArrayByLength(provincePages, 4);
    for (const chunk of chunks) {
      await Promise.all(
        chunk.map(async (page: ProvincePage) => {
          page.pages = await this.getLastPageOfProvince(page);
        }),
      );
    }
    return provincePages;
  }

  public async crawlCompany(company: string, html: string) {
    console.log(company);
  }

  private async getLastPageOfProvince(
    provincePage: ProvincePage,
  ): Promise<number> {
    const html = await axios.get(provincePage.href).then((resp) => resp.data);
    const $ = cheerio.load(html);
    const href = $('.last-page').children('a').attr('href');
    const pages = href.replace(/^(.*)\/trang-([0-9]+)\/?$/gm, '$2');
    return Number(pages);
  }
}

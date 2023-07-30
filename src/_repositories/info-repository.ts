import { Repository } from 'react3l';
import { Injectable } from '@nestjs/common';
import { SOURCE_URL } from '../_config/consts';
import { httpConfig } from '../_config/repository';

@Injectable()
export class InfoRepository extends Repository {
  constructor() {
    super(httpConfig);
    this.baseURL = SOURCE_URL;
  }

  public readonly company = (companyURL: string) => {
    return this.http
      .get(`/thong-tin/${companyURL}.html`)
      .pipe(Repository.responseDataMapper<string>());
  };

  public readonly province = (province: string) => {
    return this.http
      .get(`/${province}/`)
      .pipe(Repository.responseDataMapper<string>());
  };

  public readonly district = (province: string, district: string, page = 1) => {
    const pagePath = page > 1 ? `/trang-${page}/` : '/';
    return this.http
      .get(`/${province}/${district}${pagePath}`)
      .pipe(Repository.responseDataMapper<string>());
  };

  public readonly index = () => {
    return this.http.get(`/`).pipe(Repository.responseDataMapper<string>());
  };
}

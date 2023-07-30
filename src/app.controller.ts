import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/thong-tin/:company.html')
  @ApiResponse({
    type: String,
  })
  async company(@Param('company') company: string): Promise<string> {
    return this.appService.company(company);
  }

  @Get('/:province/:district/trang-:page/')
  @ApiResponse({
    type: String,
  })
  async districtByPage(
    @Param('province') province: string,
    @Param('district') district: string,
    @Param('page') page: number,
  ): Promise<string> {
    console.log(page);
    return this.appService.district(province, district, page);
  }

  @Get('/:province/:district')
  @ApiResponse({
    type: String,
  })
  async district(
    @Param('province') province: string,
    @Param('district') district: string,
  ): Promise<string> {
    return this.appService.district(province, district);
  }

  @Get('/:province')
  @ApiResponse({
    type: String,
  })
  async province(@Param('province') province: string): Promise<string> {
    return this.appService.province(province);
  }

  @Get('/')
  @ApiResponse({
    type: String,
  })
  async index(): Promise<string> {
    return this.appService.index();
  }
}

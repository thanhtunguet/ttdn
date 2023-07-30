import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from './_config/dotenv';
import * as entities from './_entities';
import { DivisionModule } from './division/division.module';
import { CrawlerModule } from './crawler/crawler.module';
import { InfoRepository } from './_repositories/info-repository';

@Module({
  imports: [
    DivisionModule,
    CrawlerModule,

    TypeOrmModule.forRoot({
      type: 'mssql',
      host: DB_HOST,
      port: DB_PORT,
      username: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      entities: Object.values(entities),
      extra: {
        trustServerCertificate: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, InfoRepository],
})
export class AppModule {}

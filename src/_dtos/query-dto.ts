import { ModelFilter } from 'react3l';
import { ApiProperty } from '@nestjs/swagger';

export class QueryDto extends ModelFilter {
  @ApiProperty({
    type: Number,
    required: false,
  })
  skip: number;

  @ApiProperty({
    type: Number,
    required: false,
  })
  take: number;
}

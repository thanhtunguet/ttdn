import { ApiProperty } from '@nestjs/swagger';

export class ProvincePage {
  @ApiProperty({
    type: String,
  })
  href: string;

  @ApiProperty({
    type: String,
  })
  text: string;

  @ApiProperty({
    type: Number,
  })
  pages: number;
}

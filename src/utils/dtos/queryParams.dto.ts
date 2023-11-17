import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @IsString()
  populate: string;

  @IsOptional()
  @IsString()
  @Type(() => Number)
  //   @Transform(({ value }) => {
  //     console.log(parseInt(value));
  //     if (!value) return 10;
  //     return parseInt(value);
  //   })
  limit: number;

  @IsOptional()
  @IsString()
  //   @Transform(({ value }) => {
  //     if (!value) return 1;
  //     return parseInt(value);
  //   })
  page: number;
}

import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional } from 'class-validator';

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  @IsOptional()
  public limit?: number;

  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  @IsOptional()
  public page?: number;

  @IsOptional()
  public search?: string;

  @IsOptional()
  public populate?: string;

  @IsOptional()
  public sortBy?: string;

  @IsEnum(SortOrder)
  @IsOptional()
  public sortOrder?: SortOrder = SortOrder.DESC;
}

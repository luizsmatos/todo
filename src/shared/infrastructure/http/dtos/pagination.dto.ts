import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @ApiProperty({
    description: 'Current page number',
    example: 1,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  @IsInt()
  @IsPositive()
  @IsOptional()
  @Transform(({ value }) => Number(value))
  pageSize: number;
}

type Constructor<T = object> = new (...args: any[]) => T;

export function PaginationMixin<T extends Constructor>(Base: T) {
  class Pagination {
    @ApiProperty({
      description: 'Current page number',
      example: 1,
    })
    page: number;

    @ApiProperty({
      description: 'Number of items per page',
      example: 10,
    })
    pageSize: number;

    @ApiProperty({
      description: 'Total items available',
      example: 100,
    })
    totalItems: number;

    @ApiProperty({
      description: 'Total pages available',
      example: 10,
    })
    totalPages: number;

    @ApiProperty({
      description: 'List of items on the current page',
      isArray: true,
      type: () => Base,
    })
    items: InstanceType<T>[];

    constructor(partial: Partial<Pagination>) {
      Object.assign(this, partial);
    }
  }

  return Pagination;
}

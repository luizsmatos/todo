import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class DeleteTaskParamsDto {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426655440000',
  })
  @IsUUID()
  taskId: string;
}

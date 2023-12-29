import { AutoMap } from '@automapper/classes';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { IsGTE } from '../../../../utils/is-gte.validator';

export class CreateTaskDto {
  @AutoMap()
  @IsString()
  @Length(2, 1000)
  @IsNotEmpty()
  readonly description?: string;

  @AutoMap()
  @IsOptional()
  @IsDate()
  @IsGTE()
  readonly dueDate?: Date;
}

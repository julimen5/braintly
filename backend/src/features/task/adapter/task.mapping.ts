import type { Mapper } from '@automapper/types';
import { Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Task } from '../domain/task.entity';
import { mapGetMany } from '../../shared/adapter/shared.mapping';
import { TaskDto } from './dto/task.dto';

@Injectable()
export class TaskMapping {
  constructor(@InjectMapper() private readonly mapper: Mapper) {}

  getTaskDto(dto: Task): TaskDto {
    return this.mapper.map(dto, Task, TaskDto);
  }

  getManyTasksDto(data: Pagination<Task>): Pagination<TaskDto> {
    return mapGetMany(data, this.getTaskDto.bind(this));
  }
}

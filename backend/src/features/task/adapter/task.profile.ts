import {
  createMap,
  forMember,
  ignore,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TaskDto } from './dto/task.dto';
import { CreateTaskDto } from './dto/task.create.dto';

@Injectable()
export class TaskProfile extends AutomapperProfile {
  constructor(@InjectMapper() readonly mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper: Mapper): void => {
      createMap(
        mapper,
        CreateTaskDto,
        Task,
        forMember((d) => d.id, ignore()),
      );
      createMap(mapper, Task, TaskDto);
    };
  }
}

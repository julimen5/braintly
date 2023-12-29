import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskInterfaceRepository } from './task.interface.repository';
import { BaseAbstractRepository } from '../../../repository/generic.repository';

@Injectable()
export class TaskRepository
  extends BaseAbstractRepository<Task>
  implements TaskInterfaceRepository
{
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }
}

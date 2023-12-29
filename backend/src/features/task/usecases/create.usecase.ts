import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TaskInterfaceRepository } from '../domain/task.interface.repository';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateTaskDto } from '../adapter/dto/task.create.dto';

@Injectable()
export class CreateUseCase {
  private readonly entityName = 'Task';

  constructor(private readonly taskRepository: TaskInterfaceRepository) {}

  async create(body: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create(body);
    return this.taskRepository.insert(task);
  }
}

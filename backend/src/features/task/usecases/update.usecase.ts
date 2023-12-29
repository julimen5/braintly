import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TaskInterfaceRepository } from '../domain/task.interface.repository';
import { Pagination } from 'nestjs-typeorm-paginate';
import { CreateTaskDto } from '../adapter/dto/task.create.dto';
import { DeepPartial } from 'typeorm/common/DeepPartial';
import { RegisterNotFound } from '../../../repository/repository.exception';

@Injectable()
export class UpdateUseCase {
  private readonly entityName = 'Task';

  constructor(private readonly taskRepository: TaskInterfaceRepository) {}

  async update(id: number, partialEntity: Partial<Task>): Promise<Task> {
    const task = await this.taskRepository.findOneById(id);
    if (task) {
      return this.taskRepository.save({ ...task, ...partialEntity });
    } else {
      throw new RegisterNotFound();
    }
  }
}

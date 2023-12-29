import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TaskInterfaceRepository } from '../domain/task.interface.repository';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from '../../shared/adapter/dto/pagination.dto';

@Injectable()
export class FindAllUseCase {
  private readonly entityName = 'Task';

  constructor(private readonly taskRepository: TaskInterfaceRepository) {}

  async findAll(paginationOptions: PaginationDto): Promise<Pagination<Task>> {
    return this.taskRepository.paginate(paginationOptions, {
      order: { dueDate: 'DESC' },
    });
  }
}

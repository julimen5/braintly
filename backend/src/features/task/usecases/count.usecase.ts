import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TaskInterfaceRepository } from '../domain/task.interface.repository';
import { Pagination } from 'nestjs-typeorm-paginate';

@Injectable()
export class CountUseCase {
  private readonly entityName = 'Task';

  constructor(private readonly taskRepository: TaskInterfaceRepository) {}

  async count(): Promise<any> {
    return (
      await this.taskRepository.entity
        .createQueryBuilder('task')
        .select('state')
        .addSelect('COUNT(task.id) as amount')
        .groupBy('task.state')
        .getRawMany()
    ).reduce((acc, cur) => {
      return {
        ...acc,
        [cur.state]: cur.amount,
      };
    }, {});
  }
}

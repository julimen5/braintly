import { Injectable } from '@nestjs/common';
import { Task } from '../domain/task.entity';
import { TaskInterfaceRepository } from '../domain/task.interface.repository';

@Injectable()
export class DeleteUseCase {
  private readonly entityName = 'Task';

  constructor(private readonly taskRepository: TaskInterfaceRepository) {}

  async delete(id: number): Promise<void> {
    await this.taskRepository.delete({ id });
  }
}

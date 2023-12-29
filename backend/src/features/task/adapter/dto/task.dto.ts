import { AutoMap } from '@automapper/classes';
import { States } from '../../domain/state.enum';

export class TaskDto {
  @AutoMap()
  readonly id: number;

  @AutoMap()
  readonly description: string;

  @AutoMap()
  readonly state: States;

  @AutoMap()
  readonly dueDate: Date;

  @AutoMap()
  readonly createdAt: Date;

  @AutoMap()
  readonly updatedAt: Date;
}

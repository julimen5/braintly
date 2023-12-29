import { Task } from './task.entity';
import { BaseInterfaceRepository } from '../../../repository/generic.abstract.repository';

export abstract class TaskInterfaceRepository extends BaseInterfaceRepository<Task> {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './domain/task.entity';
import { TaskRepository } from './domain/task.repository';
import { TaskInterfaceRepository } from './domain/task.interface.repository';
// import { AutomapperModule } from '@automapper/nestjs';
import { TaskController } from './adapter/task.controller';
import { FindAllUseCase } from './usecases/find-all.usecase';
import { AutomapperModule } from '@automapper/nestjs';
import { TaskMapping } from './adapter/task.mapping';
import { TaskProfile } from './adapter/task.profile';
import { DeleteUseCase } from './usecases/delete.usecase.service';
import { CreateUseCase } from './usecases/create.usecase';
import { UpdateUseCase } from './usecases/update.usecase';
import { CountUseCase } from './usecases/count.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AutomapperModule],
  controllers: [TaskController],
  providers: [
    TaskMapping,
    TaskProfile,
    FindAllUseCase,
    DeleteUseCase,
    CreateUseCase,
    UpdateUseCase,
    CountUseCase,
    {
      provide: TaskInterfaceRepository,
      useClass: TaskRepository,
    },
  ],
  exports: [
    TypeOrmModule,
    FindAllUseCase,
    DeleteUseCase,
    CreateUseCase,
    UpdateUseCase,
    CountUseCase,
    TaskMapping,
  ],
})
export class TaskModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './config/database/database.module';
import { TaskModule } from './features/task/task.module';
import { MapperModule } from './config/automapper/automapper.module';

@Module({
  imports: [DatabaseModule, TaskModule, MapperModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

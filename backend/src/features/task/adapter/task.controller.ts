import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { FindAllUseCase } from '../usecases/find-all.usecase';
import { TaskMapping } from './task.mapping';
import { Pagination } from 'nestjs-typeorm-paginate';
import { DeleteUseCase } from '../usecases/delete.usecase.service';
import { CreateTaskDto } from './dto/task.create.dto';
import { CreateUseCase } from '../usecases/create.usecase';
import { UpdateUseCase } from '../usecases/update.usecase';
import { CountUseCase } from '../usecases/count.usecase';
import { PaginationDto } from '../../shared/adapter/dto/pagination.dto';

//@ApiTags(normalizeTag('Tasks', 'ext'))
//@UseFilters(CompanyExceptionFilter)
@Controller({ path: 'tasks', version: '1' })
export class TaskController {
  constructor(
    private readonly findAllUseCase: FindAllUseCase,
    private readonly deleteUseCase: DeleteUseCase,
    private readonly createUseCase: CreateUseCase,
    private readonly updateUseCase: UpdateUseCase,
    private readonly countUseCase: CountUseCase,
    private readonly taskMapping: TaskMapping,
  ) {}

  @Get('/count')
  async count(): Promise<any> {
    return this.countUseCase.count();
  }

  @Delete(':id')
  async deleteOne(@Param('id') id: number): Promise<void> {
    await this.deleteUseCase.delete(id);
  }

  @Patch(':id')
  async updateOne(
    @Param('id') id: number,
    @Body() body: any,
  ): Promise<TaskDto> {
    const task = await this.updateUseCase.update(id, body);
    return this.taskMapping.getTaskDto(task);
  }

  @Post()
  async create(@Body() body: CreateTaskDto): Promise<TaskDto> {
    const task = await this.createUseCase.create(body);
    return this.taskMapping.getTaskDto(task);
  }

  @Get()
  async findAll(
    @Query() paginationOptions: PaginationDto,
  ): Promise<Pagination<TaskDto>> {
    const tasks = await this.findAllUseCase.findAll(paginationOptions);
    return this.taskMapping.getManyTasksDto(tasks);
  }
}

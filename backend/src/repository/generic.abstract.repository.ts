import { DeepPartial } from 'typeorm/common/DeepPartial';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from '../features/shared/adapter/dto/pagination.dto';
import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';

export abstract class BaseInterfaceRepository<T> {
  readonly entity: Repository<T>;

  abstract create(data: DeepPartial<T>): T;

  abstract delete(condition: FindOptionsWhere<T>): void;

  abstract insert(data: QueryDeepPartialEntity<T>): Promise<T>;

  abstract findOneById(id: number): Promise<T>;

  abstract save(entity: T): Promise<T>;

  abstract paginate(
    options: PaginationDto,
    searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
  ): Promise<Pagination<T>>;
}

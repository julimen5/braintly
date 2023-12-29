import { FindManyOptions, FindOptionsWhere, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IdEntity } from '../features/shared/domain/idEntity';
import { BaseInterfaceRepository } from './generic.abstract.repository';
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { PaginationDto } from '../features/shared/adapter/dto/pagination.dto';
import { RegisterAlreadyExistsException } from './repository.exception';

export abstract class BaseAbstractRepository<T extends IdEntity>
  implements BaseInterfaceRepository<T>
{
  readonly entity: Repository<T>;

  protected constructor(entity: Repository<T>) {
    this.entity = entity;
  }

  create(data: T): T {
    return this.entity.create(data);
  }

  async delete(options: FindOptionsWhere<T>): Promise<void> {
    await this.entity.delete(options);
  }

  async save(entity: T): Promise<T> {
    return this.entity.save(entity);
  }

  // this id should be a string but ts is throwing compiler error
  async findOneById(id: number): Promise<T> {
    return this.entity.findOneBy({ id } as FindOptionsWhere<T>);
  }

  async insert(data: QueryDeepPartialEntity<T>): Promise<T> {
    try {
      const insertResult = await this.entity.insert(data);
      if (insertResult.identifiers.length === 1) {
        return this.findOneById(insertResult.identifiers[0].id);
      }
    } catch (e) {
      if (e?.code === 'ER_DUP_ENTRY') {
        throw new RegisterAlreadyExistsException('The register already exists');
      }
    }

    // remains throw error
  }

  async paginate(
    options: PaginationDto,
    searchOptions?: FindOptionsWhere<T> | FindManyOptions<T>,
  ): Promise<Pagination<T>> {
    return paginate<T>(
      this.entity,
      { limit: options.pageSize, page: options.page },
      searchOptions,
    );
  }
}

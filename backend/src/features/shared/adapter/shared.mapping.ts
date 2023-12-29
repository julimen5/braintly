import { Pagination } from 'nestjs-typeorm-paginate';

export function mapGetMany<Entity, Dto>(
  responseToMap: Pagination<Entity>,
  mappingFn: (value: Entity) => Dto,
): Pagination<Dto> {
  return {
    ...responseToMap,
    items: responseToMap?.items.map((user) => mappingFn(user)),
  };
}

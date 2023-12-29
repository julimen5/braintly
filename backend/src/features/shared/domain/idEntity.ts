import { AutoMap } from '@automapper/classes';
import { Generated, PrimaryColumn } from 'typeorm';

export abstract class IdEntity {
  @AutoMap()
  @PrimaryColumn()
  @Generated()
  id: number;
}

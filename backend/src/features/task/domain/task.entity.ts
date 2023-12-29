import { AutoMap } from '@automapper/classes';
import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { IdEntity } from '../../shared/domain/idEntity';
import { States } from './state.enum';

@Entity()
export class Task extends IdEntity {
  //#region Columns

  @AutoMap()
  @Column({ type: 'text', nullable: false })
  description: string;

  @AutoMap()
  @Column({ type: 'enum', enum: States, default: States.Pending })
  state: States;

  @AutoMap()
  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    nullable: true,
    default: () => null,
  })
  dueDate: Date;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
    onUpdate: 'CURRENT_TIMESTAMP(3)',
  })
  updatedAt: Date;

  //#endregion
}

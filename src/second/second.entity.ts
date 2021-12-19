import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Day } from 'src/day/day.entity';

@Entity()
export class Second {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  calories?: number;

  @Column()
  weight!: number;

  @OneToMany(() => Day, (day:Day) => day.second)
  days: Day[];
}

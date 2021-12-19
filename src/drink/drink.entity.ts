import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Day } from '../day/day.entity';

@Entity()
export class Drink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @Column()
  calories!: number;

  @Column()
  volume!: number;

  @OneToMany(() => Day, (day:Day) => day.drink)
  days: Day[];
}

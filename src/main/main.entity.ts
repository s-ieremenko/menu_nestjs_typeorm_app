import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { Day } from 'src/day/day.entity';

@Entity()
export class Main {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  calories?: number;

  @Column()
  weight!: number;

  @OneToMany(() => Day, (day) => day.main)
  days: Day[];
}

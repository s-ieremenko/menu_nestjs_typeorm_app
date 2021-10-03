import { Day } from 'src/day/day.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @OneToMany(() => Day, (day) => day.second)
  days: Day[];
}

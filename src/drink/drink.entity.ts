import { Day } from 'src/day/day.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

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

  @OneToMany(() => Day, (day) => day.drink)
  days: Day[];
}

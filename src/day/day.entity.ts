import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Second } from '../second/second.entity';
import { Drink } from '../drink/drink.entity';
import { Main } from '../main/main.entity';
import WEEKDAYS from '../common/enum.week';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: WEEKDAYS })
  name!: WEEKDAYS;

  @ManyToOne(() => Main, (main) => main.days)
  main: Main;

  @ManyToOne(() => Second, (second) => second.days)
  second: Second;

  @ManyToOne(() => Drink, (drink) => drink.days)
  drink: Drink;
}
import { Drink } from '../drink/drink.entity';
import { Second } from '../second/second.entity';
import { Main } from '../main/main.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Day {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name!: string;
  @ManyToOne(() => Main, (main) => main.days)
  main: Main;

  @ManyToOne(() => Second, (second) => second.days)
  second: Second;

  @ManyToOne(() => Drink, (drink) => drink.days)
  drink: Drink;

  // @OneToOne(() => Second)
  // @JoinColumn()
  // second: Second;

  // @OneToOne(() => Drink)
  // @JoinColumn()
  // drink: Drink;
}

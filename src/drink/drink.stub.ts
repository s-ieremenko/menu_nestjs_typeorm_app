import { Drink } from './drink.entity';

export const drinkStub = (): Drink => {
  return {
    id: 1,
    name: 'Example',
    volume: 200,
    calories: 200 || null,
    days: [],
  };
};
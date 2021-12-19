import WEEKDAYS from '../common/enum.week';
import { drinkStub } from '../drink/drink.stub';
import { mainStub } from '../main/main.stub';
import { secondStub } from '../second/second.stub';
import { Day } from './day.entity';

export const dayStub = (): Day => {
  return {
    id: 1,
    name: WEEKDAYS.FRIDAY,
    main: mainStub(),
    second: secondStub(),
    drink: drinkStub(),
  };
};
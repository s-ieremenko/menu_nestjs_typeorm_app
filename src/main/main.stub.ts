import { Main } from './main.entity';

export const mainStub = (): Main => {
  return {
    id: 1,
    name: 'Example',
    weight: 200,
    calories: 200 || null,
    days: [],
  };
};
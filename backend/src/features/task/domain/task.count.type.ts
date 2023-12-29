import { States } from './state.enum';

export type TaskCountType = {
  [key in `${States}`]: number;
};

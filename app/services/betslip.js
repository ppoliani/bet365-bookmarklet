import {entries} from './utils';

export const getTotalStake = aggregates =>
  +[...entries(aggregates)]
    .reduce((acc, [_, {stake}]) => acc + stake, 0)
    .toFixed(2);

export const getTotalReturnValue = aggregates =>
    +[...entries(aggregates)]
    .reduce((acc, [_, {returnValue}]) => acc + returnValue, 0)
    .toFixed(2);

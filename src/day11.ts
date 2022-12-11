import * as Util from './util';
import {cloneDeep} from 'lodash';

export const run = ():void => {
    console.log(`----------- Day 11 -----------`);
    const dataRaw = Util.readDataFile('data/day11/input.txt');

    console.log(`Part 1: `);



    console.log(`Part 2: `);


};

export function reduceWorryLevel(worryLevel: number) {
    // bitwise OR to round "down" to the nearest integer value
    // Note: rounds towards 0. Math.floor() rounds towards negative infinity
    return (worryLevel / 3) | 0;
}

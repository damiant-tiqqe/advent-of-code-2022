import { assert } from 'chai';
import {cloneDeep} from 'lodash';
import * as Util from './util';
import * as Day11 from './day11';

describe(`Advent of Code 2022 - Day 11`, async () => {
    
    // place holder to test run without build
    it.skip(`Day11.run()`, async () => {
        Day11.run();
    });


    describe(`After each monkey inspects an item but before it tests your worry level, 
    your relief that the monkey's inspection didn't damage the item causes 
    your worry level to be divided by three and rounded down to the nearest integer.`, async () => {

        it(`reduce worry 7 equals 2`, async () => {
            const worryLevel: number = 7;
            const expected: number = 2;
        
            const result = Day11.reduceWorryLevel(worryLevel);
            assert.equal(result, expected);
        });

        it(`reduce worry -7 equals -2`, async () => {
            const worryLevel: number = -7;
            const expected: number = -2;
        
            const result = Day11.reduceWorryLevel(worryLevel);
            assert.equal(result, expected);
        });
    });
});
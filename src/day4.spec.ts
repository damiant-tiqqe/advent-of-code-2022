import * as Day4 from './day4';
import { assert } from 'chai';

describe(`Advent of Code 2022 - Day 4`, async () => {
    it(`should get an array of numbers [2,3,4] from start 2 and end 4 numbers `, async () => {
        const startNum: number = 2;
        const endNum: number = 4;
        const expected = [ 2,3,4 ];

        const result: number[] = Day4.getNumberArray(startNum, endNum);

        assert.deepEqual(result, expected);
    });

    it(`should idenify array [2,3,4] is fully contained in array [1,2,3,4,5]`, async () => {
        const array1 = [ 2,3,4 ];
        const array2 = [ 1,2,3,4,5 ];

        const result: boolean = Day4.isRedundantArrays(array1, array2);
        assert.isTrue(result);
    });

    it(`should NOT idenify array [2,3,4] to be fully contained in array [3,4,5]`, async () => {
        const array1 = [ 2,3,4 ];
        const array2 = [ 3,4,5 ];

        const result: boolean = Day4.isRedundantArrays(array1, array2);
        assert.isFalse(result);
    });

    it(`should NOT idenify array [2,3,4] to be fully contained in array [7,8,9]`, async () => {
        const array1 = [ 2,3,4 ];
        const array2 = [ 7,8,9 ];

        const result: boolean = Day4.isRedundantArrays(array1, array2);
        assert.isFalse(result);
    });

    it(`should convert input line to array data`, async () => {
        const rawData = '2-4,6-8';
        const expected = { array1: [2,3,4], array2: [6,7,8]};

        const result = Day4.convertRawDataLine(rawData);

        assert.deepEqual(result, expected);
    });
});
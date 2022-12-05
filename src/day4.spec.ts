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

    it(`should NOT idenify array [2,3,4] to overlap array [7,8,9]`, async () => {
        const array1 = [ 2,3,4 ];
        const array2 = [ 7,8,9 ];

        const result: boolean = Day4.isPartialOverlap(array1, array2);
        assert.isFalse(result);
    });

    it(`should idenify array [2,3,4] to overlap array [4,5,6]`, async () => {
        const array1 = [ 2,3,4 ];
        const array2 = [ 4,5,6 ];

        const result: boolean = Day4.isPartialOverlap(array1, array2);
        assert.isTrue(result);
    });

    it(`should parse part 2 sample data correctly`, async () => {
        const sampleData = ['2-4,6-8','2-3,4-5','5-7,7-9','2-8,3-7','6-6,4-6','2-6,4-8'];
        const expectedOverlap = [false,false,true,true,true,true];

        const sectionData = Day4.convertSectionData(sampleData);

        //assert.isTrue(sectionData[0].overlap)

        assert.deepEqual(sectionData.map(x => x.overlap), expectedOverlap);
    });

});
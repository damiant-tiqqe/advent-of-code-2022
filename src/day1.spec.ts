import * as Day1 from './day1';
import { assert } from 'chai'
import { readDataFile } from './util';

describe(`Advent of Code 2022 - Day 1`, async () => {
    const expectedElvesBackpacks = [
        [
            1000,
            2000,
            3000
        ],
        [
            4000
        ],
        [
            5000,
            6000
        ],
        [
            7000,
            8000,
            9000
        ],
        [
            10000
        ]
    ];
    
    const expectedTotals = [
        6000,
        4000,
        11000,
        24000,
        10000
    ];

    const expectedMaxCalories = 24000;
    const elfCarryingMaxCalories = 3;

    it(`should get the total of calories carried by each elf`, async () => {
        const totals = Day1.getTotalCaloriesCarried(expectedElvesBackpacks);
        assert.deepEqual(totals, expectedTotals);

    });

    it(`should get the largest total calories carried`, async () => {
        const largestCarried = Day1.getLargestCarriedCalories(expectedTotals)[0];
        assert.strictEqual(largestCarried, expectedMaxCalories);
    });

    it(`should get the index of the elf carrying the largest calories`, async () => {
        const elfIndex = Day1.getIndexOfElfCarrying(expectedTotals, expectedMaxCalories);
        assert.strictEqual(elfIndex, elfCarryingMaxCalories);
    });

    it(`should read the data from a file`, async () => {
        // const s = require('../data/day1')
        const data = readDataFile('data/day1/data-test.txt'); // data\day1\data-test.txt // ../data/day1/data-test.txt
        const backpacks = Day1.convertRawDataToElfArray(data);
        
        assert.deepEqual(backpacks, expectedElvesBackpacks);

    });

    it(`should get the top 3 elves in order of calories carried`, async () => {
        Day1.getLargestCarriedCalories(expectedTotals, 3);
    });
});
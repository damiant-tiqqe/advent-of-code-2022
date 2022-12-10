import { assert } from 'chai';
import * as Day6 from './day6';

describe(`Advent of Code - Day 6`, async () => { 

    it(`should find marker at position 7`, async () => {
        // here is the test

        const input: string = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
        const expected: number = 7;
    
        const result: number = Day6.getNonRepeatingPattern(input);
        assert.equal(result, expected);
    });

    it(`should find marker at position 5`, async () => {
        const input: string = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
        const expected: number = 5;
    
        const result: number = Day6.getNonRepeatingPattern(input);
        assert.equal(result, expected);
    });

    it(`should find marker at position 6`, async () => {
        const input: string = 'nppdvjthqldpwncqszvftbrmjlhg';
        const expected = 6;
    
        const result: number = Day6.getNonRepeatingPattern(input);
        assert.equal(result, expected);
    });

    it(`should find marker at position 10`, async () => {
        const input: string = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
        const expected = 10;
    
        const result = Day6.getNonRepeatingPattern(input);
        assert.equal(result, expected);
    });

    it(`should find marker at position 11`, async () => {
        const input: string = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
        const expected = 11;
    
        const result = Day6.getNonRepeatingPattern(input);
        assert.equal(result, expected);
    });


    it(`should find marker at position 19`, async () => {
        const input: string = 'mjqjpqmgbljsphdztnvjfqwrcgsmlb';
        const expected = 19;
    
        const result = Day6.getNonRepeatingPattern(input, 14);
        assert.equal(result, expected);
    });

    it(`should find marker at position 23`, async () => {
        const input: string = 'bvwbjplbgvbhsrlpgdmjqwftvncz';
        const expected = 23;
    
        const result = Day6.getNonRepeatingPattern(input, 14);
        assert.equal(result, expected);
    });

    
    it(`should find marker at position 23`, async () => {
        const input: string = 'nppdvjthqldpwncqszvftbrmjlhg';
        const expected = 23;
    
        const result = Day6.getNonRepeatingPattern(input, 14);
        assert.equal(result, expected);
    });    

    it(`should find marker at position 29`, async () => {
        const input: string = 'nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg';
        const expected = 29;
    
        const result = Day6.getNonRepeatingPattern(input, 14);
        assert.equal(result, expected);
    });

    it(`should find marker at position 26`, async () => {
        const input: string = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';
        const expected = 26;
    
        const result = Day6.getNonRepeatingPattern(input, 14);
        assert.equal(result, expected);
    });

    it(`should not be this filthy: length 4`, async () => {
        assert.equal(Day6.part1(), 1757);
    });

    it(`should not be this filthy: length 14`, async () => {
        assert.equal(Day6.part2(), 2950);
    });
});
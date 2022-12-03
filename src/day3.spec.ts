import { assert } from 'chai';
import * as Day3 from './day3';
import * as Util from './util';

describe(`Advent of Code 2022 - Day 3`, async () => {

    const sampleRucksack: string = 'vJrwpWtwJgWrhcsFMMfFFhFp';

    it(`should run Day3`, async () => {
        Day3.run();
    }); 

    it(`should split a 24 character string in half`, async () => {
        const testString: string = 'vJrwpWtwJgWrhcsFMMfFFhFp'
        const splitString: string[] = Util.splitStringInHalf(testString);

        assert.equal(splitString.length, 2);
        assert.strictEqual(splitString[0], 'vJrwpWtwJgWr');
        assert.strictEqual(splitString[1], 'hcsFMMfFFhFp');
    });
    
    it(`should find char 'p' in both strings`, async () => {
        const string1: string = 'vJrwpWtwJgWr';
        const string2: string = 'hcsFMMfFFhFp';
        const expected: string[] = ['p'];

        const commonChars: string[] = Day3.findCommonChars(string1, string2);

        assert.deepEqual(commonChars, expected);

    });

        
    it(`should find char 'L' twice in both strings, but only report it once`, async () => {
        const string1: string = 'jqHRNqRjqzjGDLGL';
        const string2: string = 'rsFMfFZSrLrFZsSL';
        const expected: string[] = ['L'];

        const commonChars: string[] = Day3.findCommonChars(string1, string2);

        assert.deepEqual(commonChars, expected);

    });
    it(`should convert a string to an array of characters`, async () => {
        const source: string = 'abc';
        const expected: string[] = ['a','b','c'];

        const result: string[] = Util.toCharArray(source);

        assert.deepEqual(result, expected);
    });

    it(`should get priority 1 for 'a'`, async () => {
        const item: string = 'a';
        const expected = 1;
        const priority = Day3.getItemPriority(item);

        assert.equal(priority, expected);
    });

    it(`should get priority 27 for 'A'`, async () => {
        const item: string = 'A';
        const expected = 27;
        const priority = Day3.getItemPriority(item);

        assert.equal(priority, expected);
    });

    it(`should get priority 26 for 'z'`, async () => {
        const item: string = 'z';
        const expected = 26;
        const priority = Day3.getItemPriority(item);

        assert.equal(priority, expected);
    });

    it(`should get priority 52 for 'Z'`, async () => {
        const item: string = 'Z';
        const expected = 52;
        const priority = Day3.getItemPriority(item);

        assert.equal(priority, expected);
    });

    it(`should get priority 16 for sample rucksack '${sampleRucksack}'`, async () => {
        const splitString: string[] = Util.splitStringInHalf(sampleRucksack);
        const commonChars: string[] = Day3.findCommonChars(splitString[0], splitString[1]);
        let priority = 0;
        commonChars.forEach(x => priority += Day3.getItemPriority(x));

        assert.equal(priority, 16);
    });

    it(`should get total priority value of 157 for the sample data`, async () => {
        const dataRaw = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
        const data = dataRaw.split(/\r?\n/);

        const priorities = [];
        for (let i = 0; i < data.length; i++) {
            const rucksack = data[i];
            const splitString: string[] = Util.splitStringInHalf(rucksack);
            const commonChars: string[] = Day3.findCommonChars(splitString[0], splitString[1]);
    
            commonChars.forEach(x => priorities.push(Day3.getItemPriority(x)));
        }
        const totalPriority = Util.sumArray(priorities);
        assert.equal(totalPriority, 157)
    });

    it(`should find 'b' as the common character in the 3 strings`, async () => {

        const data = [
            'abc',
            'zby',
            'hbj'
        ];
        const badge = Day3.findCommonCharsAcrossMultiple(data);
        const expected = ['b'];
        assert.deepEqual(badge, expected)

    });

    it(`should find 'r' as the common character in the 3 strings`, async () => {
        const dataRaw = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg`;

        const data = dataRaw.split(/\r?\n/);
        const badge = Day3.findCommonCharsAcrossMultiple(data);
        const expected = ['r'];

        assert.deepEqual(badge, expected)

    });

    it(`should find 'b' and 'q' as the common characters in the 2 groups of 3 strings`, async () => {

        const data = [
            'abc',
            'zby',
            'hbj',
            'eqr',
            'uqo',
            'gqf'
        ];

        const groupBadges = Day3.getBadgesForRucksackGroups(data, 3);
        const expected = ['b', 'q'];

        assert.deepEqual(groupBadges, expected)

    });

    it(`should get a total priority sum of 70 for the 2 groups of rucksacks`, async () => {
        const dataRaw = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
        const data = dataRaw.split(/\r?\n/);

        const groupBadges = Day3.getBadgesForRucksackGroups(data, 3);
        const expectedBadges = ['r', 'Z'];
        assert.deepEqual(groupBadges, expectedBadges);

        const groupPriorities = groupBadges.map(x => Day3.getItemPriority(x));
        const expectedPriorities = [ 18, 52 ]
        assert.deepEqual(groupPriorities, expectedPriorities);

        const totalPriority = Util.sumArray(groupPriorities);
        assert.equal(totalPriority, 70);

    });
});
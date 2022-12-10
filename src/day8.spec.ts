import { assert } from 'chai';
import { it } from 'mocha';
import * as Day8 from './day8';
import * as Util from './util';

describe(`Advent of Code 2022 - Day 8`, async () => {
    it(`should convert a string of numbers to a number array`, async () => {
        const input: string = '30373';
        const expected: number[] = [3,0,3,7,3];
    
        const result = Util.convertToNumberArray(input.split(''));
        assert.deepEqual(result, expected);
    });

    it(`should convert number array to array of Trees`, async () => {
        const input: number[] = [3,0,3,7,3];
        const expected: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 0, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
            { row: 0, col: 3, id: 3, height: 7, score: 0 }, 
            { row: 0, col: 4, id: 4, height: 3, score: 0 }, 
        ];
    
        const result = Day8.convertRowToTrees(input, 0);
        assert.deepEqual(result, expected);
    });

    it(`should NOT identify a tree as visible in the middle`, async () => {
        const width: number = 3;
        const height: number= 3;
        const input: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 3, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 3, height: 3, score: 0 }, 
            { row: 1, col: 1, id: 4, height: 0, score: 0 }, 
            { row: 1, col: 2, id: 5, height: 3, score: 0 }, 
            { row: 2, col: 0, id: 6, height: 3, score: 0 }, 
            { row: 2, col: 1, id: 7, height: 3, score: 0 }, 
            { row: 2, col: 2, id: 8, height: 3, score: 0 }, 
        ];
        const expected: boolean[] = [true,true,true,true,false,true,true,true,true,];

        const result: boolean[] = Day8.getVisibleMap(input, width, height);
        assert.deepEqual(result, expected);
    });

    it(`should identify a tree as visible in the middle`, async () => {
        const width: number = 3;
        const height: number= 3;
        const input: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 3, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 3, height: 3, score: 0 }, 
            { row: 1, col: 1, id: 4, height: 7, score: 0 }, 
            { row: 1, col: 2, id: 5, height: 3, score: 0 }, 
            { row: 2, col: 0, id: 6, height: 3, score: 0 }, 
            { row: 2, col: 1, id: 7, height: 3, score: 0 }, 
            { row: 2, col: 2, id: 8, height: 3, score: 0 }, 
        ];
        const expected: boolean[] = [true,true,true,true,true,true,true,true,true,];

        const result: boolean[] = Day8.getVisibleMap(input, width, height);
        assert.deepEqual(result, expected);
    });

    it(`should identify a tree on the edge of the forest (top left)`, async () => {
        const input: Day8.Tree = { row: 0, col: 0, id: 0, height: 3, score: 0 };
        const expected = true;
    
        const result = Day8.isOnEdge(input, 3, 3);
        assert.equal(result, expected);
    });

    it(`should identify a tree on the edge of the forest (top middle)`, async () => {
        const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 3, score: 0 };
        const expected = true;
    
        const result = Day8.isOnEdge(input, 3, 3);
        assert.equal(result, expected);
    });

    it(`should identify a tree on the edge of the forest (top right)`, async () => {
        const input: Day8.Tree = { row: 0, col: 2, id: 0, height: 3, score: 0 };
        const expected = true;
    
        const result = Day8.isOnEdge(input, 3, 3);
        assert.equal(result, expected);
    });

    it(`should NOT identify a tree on the edge of the forest (middle center)`, async () => {
        const input: Day8.Tree = { row: 1, col: 1, id: 4, height: 3, score: 0 };
        const expected = false;
    
        const result = Day8.isOnEdge(input, 3, 3);
        assert.equal(result, expected);
    });

    it(`should be visible on the row`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 4, score: 0}, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
        ];
        const expected = true;
    
        const result = Day8.isVisibleOnRow(array[1], array);
        assert.equal(result, expected);       
    });

    
    it(`should NOT be visible on the row`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 2, score: 0}, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
        ];
        const expected = false;
    
        const result = Day8.isVisibleOnRow(array[1], array);
        assert.equal(result, expected);       
    });

    it(`should be visible on the column`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 1, height: 4, score: 0 }, 
            { row: 2, col: 0, id: 2, height: 3, score: 0 }, 
        ];
        const expected = true;
    
        const result = Day8.isVisibleOnCol(array[1], array);
        assert.equal(result, expected);       
    });

    
    it(`should NOT be visible on the column`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 1, height: 2, score: 0 }, 
            { row: 2, col: 0, id: 2, height: 3, score: 0 }, 
        ];
        const expected = false;
    
        const result = Day8.isVisibleOnCol(array[1], array);
        assert.equal(result, expected);       
    });

    
    it(`should get a viewing distance of 3 in the up direction with 2 higher trees, stopping at the first not the highest`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 7, score: 0 }, 
            { row: 1, col: 0, id: 1, height: 5, score: 0 }, 
            { row: 2, col: 0, id: 2, height: 3, score: 0 }, 
            { row: 3, col: 0, id: 2, height: 3 , score: 0}, 
            { row: 4, col: 0, id: 2, height: 5, score: 0 }, 
        ];
        const expected = 3;
    
        const result = Day8.viewingDistance_UP(array[4], array);
        assert.equal(result, expected);      
    }); 

    it(`should get a viewing distance of 3 in the up direction with only 1 higher tree`, async () => {
                //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
                const array: Day8.Tree[] = [
                    { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
                    { row: 1, col: 0, id: 1, height: 5, score: 0 }, 
                    { row: 2, col: 0, id: 2, height: 3, score: 0 }, 
                    { row: 3, col: 0, id: 2, height: 3, score: 0 }, 
                    { row: 4, col: 0, id: 2, height: 5, score: 0 }, 
                ];
                const expected = 3;
            
                const result = Day8.viewingDistance_UP(array[4], array);
                assert.equal(result, expected);      
    });

    it(`should get a viewing distance of 1 in the up direction when theres no higher trees before the edge`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 1, height: 5, score: 0 }, 
            { row: 2, col: 0, id: 2, height: 3, score: 0 }, 
            { row: 3, col: 0, id: 2, height: 3, score: 0 }, 
            { row: 4, col: 0, id: 2, height: 5, score: 0 }, 
        ];
        const expected = 1;
    
        const result = Day8.viewingDistance_UP(array[1], array);
        assert.equal(result, expected);      
    });

    it(`should get a viewing distance of 1 in the down direction when theres no higher trees before the edge`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 1, height: 5, score: 0 }, 
            { row: 2, col: 0, id: 2, height: 3, score: 0 }, 
            { row: 3, col: 0, id: 2, height: 5, score: 0 }, 
            { row: 4, col: 0, id: 2, height: 3, score: 0 }, 
        ];
        const expected = 1;
    
        const result = Day8.viewingDistance_DOWN(array[3], array);
        assert.equal(result, expected);      
    });

    it(`should get a viewing distance of 2 in the down direction with only 1 higher tree`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 1, height: 5, score: 0 }, 
            { row: 2, col: 0, id: 2, height: 3, score: 0 }, 
            { row: 3, col: 0, id: 2, height: 5, score: 0 }, 
            { row: 4, col: 0, id: 2, height: 3, score: 0 }, 
        ];
        const expected = 2;
    
        const result = Day8.viewingDistance_DOWN(array[1], array);
        assert.equal(result, expected);      
    });

    it(`should get a viewing distance of 2 in the down direction with 2 higher trees, stopping at the first not the highest`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 1, height: 5, score: 0 }, 
            { row: 2, col: 0, id: 2, height: 3, score: 0 }, 
            { row: 3, col: 0, id: 2, height: 5, score: 0 }, 
            { row: 4, col: 0, id: 2, height: 7, score: 0 }, 
        ];
        const expected = 2;
    
        const result = Day8.viewingDistance_DOWN(array[1], array);
        assert.equal(result, expected);      
    });


    it(`should get a viewing distance of 1 in the left as the tree next to it is the same size`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 5, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 5, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 5, score: 0 }, 
            { row: 0, col: 3, id: 3, height: 5, score: 0 }, 
            { row: 0, col: 4, id: 4, height: 5, score: 0 }, 
        ];
        const expected = 1;
    
        const result = Day8.viewingDistance_LEFT(array[2], array);
        assert.equal(result, expected);      
    }); 

    it(`should get a viewing distance of 3 in the left direction with 2 higher trees, stopping at the first not the highest`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 7, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 5, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
            { row: 0, col: 3, id: 3, height: 3, score: 0 }, 
            { row: 0, col: 4, id: 4, height: 5, score: 0 }, 
        ];
        const expected = 3;
    
        const result = Day8.viewingDistance_LEFT(array[4], array);
        assert.equal(result, expected);      
    }); 

    it(`should get a viewing distance of 3 in the left direction with only 1 higher tree`, async () => {
                //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
                const array: Day8.Tree[] = [
                    { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
                    { row: 0, col: 1, id: 1, height: 5, score: 0 }, 
                    { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
                    { row: 0, col: 3, id: 3, height: 3, score: 0 }, 
                    { row: 0, col: 4, id: 4, height: 5, score: 0 }, 
                        ];
                const expected = 3;
            
                const result = Day8.viewingDistance_LEFT(array[4], array);
                assert.equal(result, expected);      
    });

    it(`should get a viewing distance of 1 in the left direction when theres no higher trees before the edge`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 5, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
            { row: 0, col: 3, id: 3, height: 3, score: 0 }, 
            { row: 0, col: 4, id: 4, height: 5, score: 0 }, 
        ];
        const expected = 1;
    
        const result = Day8.viewingDistance_LEFT(array[1], array);
        assert.equal(result, expected);      
    });


    it(`should get a viewing distance of 3 in the right direction with 2 higher trees, stopping at the first not the highest`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 5, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 3, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
            { row: 0, col: 3, id: 3, height: 5, score: 0 }, 
            { row: 0, col: 4, id: 4, height: 7, score: 0 }, 
        ];
        const expected = 3;
    
        const result = Day8.viewingDistance_RIGHT(array[0], array);
        assert.equal(result, expected);      
    }); 

    it(`should get a viewing distance of 3 in the right direction with only 1 higher tree`, async () => {
                //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
                const array: Day8.Tree[] = [
                    { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
                    { row: 0, col: 1, id: 1, height: 5, score: 0 }, 
                    { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
                    { row: 0, col: 3, id: 3, height: 3, score: 0 }, 
                    { row: 0, col: 4, id: 4, height: 5, score: 0 }, 
                        ];
                const expected = 3;
            
                const result = Day8.viewingDistance_RIGHT(array[1], array);
                assert.equal(result, expected);      
    });

    it(`should get a viewing distance of 1 in the right direction when theres no higher trees before the edge`, async () => {
        //const input: Day8.Tree = { row: 0, col: 1, id: 1, height: 4 };
        const array: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 5, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
            { row: 0, col: 3, id: 3, height: 5, score: 0 }, 
            { row: 0, col: 4, id: 4, height: 3, score: 0 }, 
        ];
        const expected = 1;
    
        const result = Day8.viewingDistance_RIGHT(array[3], array);
        assert.equal(result, expected);      
    });

    it(`should get scenic scores in 3x3 grid `, async () => {
        const width: number = 3;
        const height: number= 3;
        const trees: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 3, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 3, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 3, score: 0 }, 
            { row: 1, col: 0, id: 3, height: 3, score: 0 }, 
            { row: 1, col: 1, id: 4, height: 7, score: 0 }, 
            { row: 1, col: 2, id: 5, height: 3, score: 0 }, 
            { row: 2, col: 0, id: 6, height: 3, score: 0 }, 
            { row: 2, col: 1, id: 7, height: 3, score: 0 }, 
            { row: 2, col: 2, id: 8, height: 3, score: 0 }, 
        ];
        const expected: number[] = [ 0,0,0,0,1,0,0,0,0];
        //isOnEdge(x, width, height)
        const result: Day8.Tree[] = Day8.getScenicScores(trees, width, height);
        assert.deepEqual(result.map(x => x.score), expected);      

    });

    it(`should get scenic scores in 5x5 grid `, async () => {
        const trees: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 1, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 1, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 1, score: 0 }, 
            { row: 0, col: 3, id: 3, height: 1, score: 0 }, 
            { row: 0, col: 4, id: 4, height: 1, score: 0 }, 

            { row: 1, col: 0, id: 5, height: 1, score: 0 }, 
            { row: 1, col: 1, id: 6, height: 3, score: 0 }, 
            { row: 1, col: 2, id: 7, height: 3, score: 0 }, 
            { row: 1, col: 3, id: 8, height: 3, score: 0 }, 
            { row: 1, col: 4, id: 9, height: 1, score: 0 }, 

            { row: 2, col: 0, id: 10, height: 1, score: 0 }, 
            { row: 2, col: 1, id: 11, height: 3, score: 0 }, 
            { row: 2, col: 2, id: 12, height: 7, score: 0 }, 
            { row: 2, col: 3, id: 13, height: 3, score: 0 }, 
            { row: 2, col: 4, id: 14, height: 1, score: 0 }, 

            { row: 3, col: 0, id: 15, height: 1, score: 0 }, 
            { row: 3, col: 1, id: 16, height: 3, score: 0 }, 
            { row: 3, col: 2, id: 17, height: 3, score: 0 }, 
            { row: 3, col: 3, id: 18, height: 3, score: 0 }, 
            { row: 3, col: 4, id: 19, height: 1, score: 0 }, 

            { row: 4, col: 0, id: 20, height: 1, score: 0 }, 
            { row: 4, col: 1, id: 21, height: 1, score: 0 }, 
            { row: 4, col: 2, id: 22, height: 1, score: 0 }, 
            { row: 4, col: 3, id: 23, height: 1, score: 0 }, 
            { row: 4, col: 4, id: 24, height: 1, score: 0 }, 
        ];


        assert.equal(Day8.getScenicScore(trees[0], trees, 5, 5), 0);   
        assert.equal(Day8.getScenicScore(trees[1], trees, 5, 5), 0);   
        assert.equal(Day8.getScenicScore(trees[2], trees, 5, 5), 0);   
        assert.equal(Day8.getScenicScore(trees[3], trees, 5, 5), 0);   
        assert.equal(Day8.getScenicScore(trees[4], trees, 5, 5), 0);   

        assert.equal(Day8.getScenicScore(trees[5], trees, 5, 5), 0);      
        assert.equal(Day8.getScenicScore(trees[6], trees, 5, 5), 1);      
        assert.equal(Day8.getScenicScore(trees[7], trees, 5, 5), 1);      
        assert.equal(Day8.getScenicScore(trees[8], trees, 5, 5), 1);      
        assert.equal(Day8.getScenicScore(trees[9], trees, 5, 5), 0);      

        assert.equal(Day8.getScenicScore(trees[10], trees, 5, 5), 0);      
        assert.equal(Day8.getScenicScore(trees[11], trees, 5, 5), 1);      
        assert.equal(Day8.getScenicScore(trees[12], trees, 5, 5), 16);      
        assert.equal(Day8.getScenicScore(trees[13], trees, 5, 5), 1);      
        assert.equal(Day8.getScenicScore(trees[14], trees, 5, 5), 0);      

        assert.equal(Day8.getScenicScore(trees[15], trees, 5, 5), 0);      
        assert.equal(Day8.getScenicScore(trees[16], trees, 5, 5), 1);      
        assert.equal(Day8.getScenicScore(trees[17], trees, 5, 5), 1);      
        assert.equal(Day8.getScenicScore(trees[18], trees, 5, 5), 1);      
        assert.equal(Day8.getScenicScore(trees[19], trees, 5, 5), 0);      

        assert.equal(Day8.getScenicScore(trees[20], trees, 5, 5), 0);   
        assert.equal(Day8.getScenicScore(trees[21], trees, 5, 5), 0);   
        assert.equal(Day8.getScenicScore(trees[22], trees, 5, 5), 0);   
        assert.equal(Day8.getScenicScore(trees[23], trees, 5, 5), 0);   
        assert.equal(Day8.getScenicScore(trees[24], trees, 5, 5), 0);   

    });

    it(`should get highest score of 16`, async () => {
        const trees: Day8.Tree[] = [
            { row: 0, col: 0, id: 0, height: 1, score: 0 }, 
            { row: 0, col: 1, id: 1, height: 1, score: 0 }, 
            { row: 0, col: 2, id: 2, height: 1, score: 0 }, 
            { row: 0, col: 3, id: 3, height: 1, score: 0 }, 
            { row: 0, col: 4, id: 4, height: 1, score: 0 }, 

            { row: 1, col: 0, id: 5, height: 1, score: 0 }, 
            { row: 1, col: 1, id: 6, height: 3, score: 0 }, 
            { row: 1, col: 2, id: 7, height: 3, score: 0 }, 
            { row: 1, col: 3, id: 8, height: 3, score: 0 }, 
            { row: 1, col: 4, id: 9, height: 1, score: 0 }, 

            { row: 2, col: 0, id: 10, height: 1, score: 0 }, 
            { row: 2, col: 1, id: 11, height: 3, score: 0 }, 
            { row: 2, col: 2, id: 12, height: 7, score: 0 }, 
            { row: 2, col: 3, id: 13, height: 3, score: 0 }, 
            { row: 2, col: 4, id: 14, height: 1, score: 0 }, 

            { row: 3, col: 0, id: 15, height: 1, score: 0 }, 
            { row: 3, col: 1, id: 16, height: 3, score: 0 }, 
            { row: 3, col: 2, id: 17, height: 3, score: 0 }, 
            { row: 3, col: 3, id: 18, height: 3, score: 0 }, 
            { row: 3, col: 4, id: 19, height: 1, score: 0 }, 

            { row: 4, col: 0, id: 20, height: 1, score: 0 }, 
            { row: 4, col: 1, id: 21, height: 1, score: 0 }, 
            { row: 4, col: 2, id: 22, height: 1, score: 0 }, 
            { row: 4, col: 3, id: 23, height: 1, score: 0 }, 
            { row: 4, col: 4, id: 24, height: 1, score: 0 }, 
        ];

        const scores = Day8.getScenicScores(trees, 5, 5);
        const highestScore: number = Math.max(...scores.map(x => x.score));


        assert.equal(highestScore, 16);   


    });
});
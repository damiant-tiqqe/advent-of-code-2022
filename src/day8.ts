import * as Util from './util';
import {cloneDeep} from 'lodash';

export const run = () => {
    console.log(`----------- Day 8 -----------`);
    const dataRaw = Util.readDataFile('data/day8/input.txt');

    const trees: Tree[] = []; 

    for (let i = 0; i < dataRaw.length; i++) {
        const element = dataRaw[i];
        if (!element || !element.length) {
            continue;
        }
        const numArray = Util.convertToNumberArray(element.split(''));
        const rowTrees = convertRowToTrees(numArray, i);
        trees.push(...rowTrees);
    }

    const width: number = Math.max(...trees.map(tree => tree.col)) + 1;
    const height: number = Math.max(...trees.map(tree => tree.row)) + 1;
    
    const visibleMap = getVisibleMap(trees, width, height);

    console.log(`Part 1: Total number of visible trees: ${visibleMap.filter(x => x).length}`);

    const scenicScores = getScenicScores(trees, width, height);
    const highestScore: number = Math.max(...scenicScores.map(x => x.score));

    // for (let i = 0; i < trees.length; i++) {
    //     const element = trees[i];
        
    // }

    console.log(`Part 2: Highest scenic score for any tree: ${highestScore}`);

}

export interface Tree {
    row: number;
    col: number;
    id: number;
    height: number;
    score: number;
}

export function convertRowToTrees(input: number[], row: number): Tree[] {
    if (!input || !input.length) {
        throw new Error('Invalid input.');
    }

    const trees: Tree[] = [];
    for (let i = 0; i < input.length; i++) {
        const height = input[i];
        const id = (input.length * row) + i;
        trees.push({ row, col: i, id, height, score: 0 } as Tree);
    }

    return trees;
}

export function getVisibleMap(input: Tree[], width: number, height: number): boolean[] {
    return input.map(x =>  isOnEdge(x, width, height) || isVisibleOnRow(x, input) || isVisibleOnCol(x, input));
}

export const isOnEdge = (tree:Tree, width: number, height: number): boolean => {

    return (tree.col === 0 || tree.col === height - 1 || tree.row === 0 || tree.row === width - 1);
}

export const isVisibleOnRow = (tree:Tree, input: Tree[]): boolean => {
    const isVisibleOnLeft = !input.some(x => x.row === tree.row && x.col < tree.col && x.height >= tree.height);
    const isVisibleOnRight = !input.some(x => x.row === tree.row && x.col > tree.col && x.height >= tree.height);

    return isVisibleOnLeft || isVisibleOnRight;
}

export const isVisibleOnCol = (tree:Tree, input: Tree[]): boolean => {
    const isVisibleAbove = !input.some(x => x.row < tree.row && x.col === tree.col && x.height >= tree.height);
    const isVisibleBelow = !input.some(x => x.row > tree.row && x.col === tree.col && x.height >= tree.height);

    return isVisibleAbove || isVisibleBelow;

}

export function viewingDistance_UP(tree: Tree, array: Tree[]) {
    
    const a = array.filter(x => x.col === tree.col && x.row < tree.row);
    const b = a.filter(x => x.height >= tree.height);
    b.sort((a,b) => { return b.row - a.row});
    const c = b[0];
    return c ? (tree.row - c.row) : tree.row;
}

export function viewingDistance_DOWN(tree: Tree, array: Tree[]) {
    const height: number = Math.max(...array.map(tree => tree.row)) + 1;
    const a = array.filter(x => x.col === tree.col && x.row > tree.row);
    const b = a.filter(x => x.height >= tree.height);
    b.sort((a,b) => { return a.row - b.row});
    const c = b[0];
    return c ? (c.row - tree.row) : (height - tree.row) - 1;
}

export function viewingDistance_LEFT(tree: Tree, array: Tree[]) {
    
    const a = array.filter(x => x.row === tree.row && x.col < tree.col);
    const b = a.filter(x => x.height >= tree.height);
    b.sort((a,b) => { return b.col - a.col});
    const c = b[0];
    return c ? (tree.col - c.col) : tree.col;
}

export function viewingDistance_RIGHT(tree: Tree, array: Tree[]) {
    const width: number = Math.max(...array.map(tree => tree.col)) + 1;
    const a = array.filter(x => x.row === tree.row && x.col > tree.col);
    const b = a.filter(x => x.height >= tree.height);
    b.sort((a,b) => { return a.col - b.col});
    const c = b[0];
    return c ? (c.col - tree.col) : (width - tree.col) -1;
}
export function getScenicScores(trees: Tree[], width: number, height: number): Tree[] {
    const newTrees = cloneDeep(trees);
    //return trees.map(tree => getScenicScore(tree, trees, width, height));
    newTrees.forEach(tree => tree.score = getScenicScore(tree, trees, width, height));
    return newTrees;
}

export const getScenicScore = (tree: Tree, trees: Tree[], width: number, height: number) => {
    return isOnEdge(tree, width, height) ? 0 : 
    viewingDistance_UP(tree, trees) *
    viewingDistance_DOWN(tree, trees) *
    viewingDistance_LEFT(tree, trees) *
    viewingDistance_RIGHT(tree, trees)
}
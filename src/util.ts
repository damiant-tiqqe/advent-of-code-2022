import {readFileSync} from 'fs';
export enum SORTORDER {
    ASC,
    DESC
} 

export const sortArray = (arrayToSort: number[], sortOrder: SORTORDER = SORTORDER.ASC): number[] => {
    switch (sortOrder) {
        case SORTORDER.ASC:
            const ascArray = [...arrayToSort];
            ascArray.sort(sortArrayAsc);
            return ascArray;
        case SORTORDER.DESC:
            const descArray = [...arrayToSort];
            descArray.sort(sortArrayDesc);
            return descArray;
        default:
            throw new Error(`Unknow sort order`);
    }
}

export const sortArrayAsc = (a,b) => {
    return a - b;
}


export const sortArrayDesc = (a,b) => {
    return b - a;
}

export const readDataFile = (filename: string): string[] => {
    const contents = readFileSync(filename, 'utf-8');
    const arr = contents.split(/\r?\n/); 
    return arr;
}

export function splitStringInHalf(testString: string): string[] {
    const halfPoint: number = testString.length / 2;
    const splitString: string[] = [
        testString.substring(0, halfPoint),
        testString.substring(halfPoint, testString.length)
    ];
    return splitString;
}
export function toCharArray(source: string): string[] {
    return new Array(...source);
}

export const sumArray = (arrayToSum: number[]) => {
    return arrayToSum.reduce((partialSum, a) => partialSum + a, 0);
}

export const getUniqueStrings = (input: string[]): string[] => {
    return [... new Set(input)];
}

export const peek = (arr: any[]) : any | undefined => {
    if (arr && arr.length) {
        return arr[arr.length - 1];
    }
    return undefined;
}

export function convertToNumberArray(input: string[]): number[] {
    if (!input || !input.length) {
        return undefined;
    }

    const numbers = input.map(x => parseInt(x));
    return numbers;
}
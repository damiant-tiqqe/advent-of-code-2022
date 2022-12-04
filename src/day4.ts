import { readDataFile } from "./util";

export interface SectionPairData {
    raw: string;
    arrays: SectionData;
    contained: boolean;
}
export interface SectionData {
    array1: number[];
    array2: number[];
}

export const run = () => {
    console.log(`----------- Day 4 -----------`);
    const data = readDataFile('data/day4/data.txt');

    const parsedData: SectionPairData[] = [];
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        if (!element || element.length === 0) {
            continue;
        }
        const sectionData: SectionData = convertRawDataLine(element);
        const areContained = isRedundantArrays(sectionData.array1, sectionData.array2);

        parsedData.push({ raw: element, arrays: sectionData, contained: areContained} as SectionPairData)
  
    }

    console.log(`Part 1: Total contained arrays: ${parsedData.filter(x => x.contained).length}`);

    
}

export function getNumberArray(startNum: number, endNum: number): number[] {
    const result = Array.from({length: endNum - startNum + 1}, (_, i) => startNum + i)
    return result;
}

export function isRedundantArrays(array1: number[], array2: number[]): boolean {
    const intersect1 = array1.filter(x => array2.includes(x));
    const isContained1 = array1.every(x=> intersect1.includes(x));
    const intersect2 = array2.filter(x => array1.includes(x));
    const isContained2 = array2.every(x=> intersect2.includes(x));
   
    return isContained1 || isContained2;
}

export function convertRawDataLine(rawData: string): SectionData {
    const split = rawData.split(',');
    const arrays: number[][] = []
    for (let i = 0; i < split.length; i++) {
        const element = split[i];
        const rawNumbers = element.split('-');
        const start: number = parseInt(rawNumbers[0]);
        const end: number = parseInt(rawNumbers[1]);

        arrays.push(getNumberArray(start, end));
    }

    return { array1: arrays[0], array2: arrays[1] } as SectionData;
}


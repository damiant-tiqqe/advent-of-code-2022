import * as Util from './util';
import {cloneDeep} from 'lodash';

const regexLayout: RegExp = /\[\w\]\s?|\s{4}|\s{3}$/gm;
const regexName: RegExp = /\[(?<name>\w)\]/;
//const regexStructureEnd: RegExp = / 1   2   3   4   5   6   7   8   9 /;

export interface CargoData {
    structureRaw: string[][];
    structure: string[][];
    instructionsRaw: string[];
    instructions: Instruction[];
}

export enum ReadState {
    structure,
    layoutheader, 
    spacer,
    instructions
}

export enum MoveMode {
    single,
    multiple
}

export const run = () => {
    console.log(`----------- Day 5 -----------`);
    const dataRaw = Util.readDataFile('data/day5/input.txt');

    const data = parseRawData(dataRaw);

    data.structure = createStructureFromContainerArray(data.structureRaw);

    data.instructions = createInstructionsFromInstructionArray(data.instructionsRaw);

    // process instructions;
    let structure = cloneDeep(data.structure);
    for (let i = 0; i < data.instructions.length; i++) {
        const instruction = data.instructions[i];

        structure = executeInstruction(structure, instruction);
    }

    let topCrates: string[] = [];
    for (let i = 0; i < structure.length; i++) {
        //const element = structure[i];
;
        if (structure[i] && structure[i].length) {
            topCrates.push(structure[i][structure[i].length - 1]);
        }
    }
    
    console.log(`Part 1: Top crates in the stacks: ${topCrates.join('')}`);

    console.log(`Part 2: UNKNOWN: ${''}`);

}

export const parseRawData = (dataRaw: string[]): CargoData => {
    let state = ReadState.structure;
    const data: CargoData = { instructionsRaw: [], instructions: [], structure: [], structureRaw: [] };

    for (let i = 0; i < dataRaw.length; i++) {
        const element = dataRaw[i];
        switch(state as ReadState) { 
            case ReadState.structure:
                // check data is still valid
                if (element.match(regexLayout)) {
                    // process layout
                    //const stackCount: number = getStackCountFromLayoutString(element);
                    const layoutArray: string[] = layoutLineToArray(element);
                    data.structureRaw.push(layoutArray);
                    //console.log(layoutArray);
                }
                else { //if (element.match(regexStructureEnd)) {
                    state = ReadState.instructions;
                }
                break;
            // case ReadState.layoutheader:
            //     state = ReadState.spacer;
            //     break;
            // case ReadState.spacer:
            //     state = ReadState.instructions;
            //     break;
            case ReadState.instructions:
                const regexInstruction: RegExp = /move (?<move>\d+) from (?<from>\d+) to (?<to>\d+)/gm;
                if (element.match(regexInstruction)) {
                    data.instructionsRaw.push(element);
                }
                break;
        }
    }

    return data;
}

export const layoutLineToArray = (layout: string) => {
    const containerArray: string[] = [];

    let arr;
    while ((arr = regexLayout.exec(layout)) !== null) {
        //console.log(`Found ${arr[0]}, indexed at ${regexLayout.lastIndex}.`);
        let [, name] = regexName.exec(arr[0]) || [];
        //console.log(name);
        containerArray.push(name);
    }      

    //console.log(containerArray);
    return containerArray;
}

export function getStackCountFromLayoutString(layout: string): number {
    return (layout.length + 1) / 4;
}


export function convertInstructionString(instruction: string): Instruction {
    const regexInstruction: RegExp = /move (?<move>\d+) from (?<from>\d+) to (?<to>\d+)/gm;
    let [, move, from, to] = regexInstruction.exec(instruction) || [];

    return { move: parseInt(move), from: parseInt(from), to: parseInt(to) } as Instruction;
}

export interface Instruction {
    move: number;
    from: number;
    to: number;
}

/**
 * Basically just pivot the arrays...
 * @param containerArray 
 * @returns 
 */
export function createStructureFromContainerArray(containerArray: any[]) {

    if (!containerArray || containerArray.length === 0) {
        return undefined;
    }
    
    const stackCount: number = containerArray[0].length;
    const maxStackSize: number = containerArray.length;

    const stacks: string[][] = [];

    // initialise the stacks
    for (let i = 0; i < stackCount; i++) {
        stacks[i] = [];
    }

    for (let i = maxStackSize - 1; i >=0; i--) {
        const element = containerArray[i];

        //pivot the data
        for (let j = 0; j < stackCount; j++) {
            const value = element[j];
            if (!value) {
                continue;
            }
            stacks[j].push(value);
        }
    }

    return stacks;
}
export function executeInstruction(structure: string[][], instruction: Instruction, moveMode: MoveMode = MoveMode.single) {
    // lets make it immutable
    //const newStructure = [...structure];
    //const newStructure = Object.assign(Object.create(Object.getPrototypeOf(structure)), structure);
    const newStructure = cloneDeep(structure);

    const fromIndex = instruction.from - 1;
    const toIndex = instruction.to - 1;
    for (let i = 0; i < instruction.move; i++) {
        const value = newStructure[fromIndex].pop();
        if (!value) {
            //throw new Error('something went wrong. no crate to move...');
            console.log(`cannot move crate from '${instruction.from}' to '${instruction.to}' as the stack is empty`);
            continue;
        }
        
        newStructure[toIndex].push(value);          
    }
    
    return newStructure;
}

function createInstructionsFromInstructionArray(instructionsRaw: string[]): Instruction[] {
    const instructions: Instruction[] = [];

    for (let i = 0; i < instructionsRaw.length; i++) {
        const element = instructionsRaw[i];
        const instruction = convertInstructionString(element);
        instructions.push(instruction);

    }

    return instructions;
}


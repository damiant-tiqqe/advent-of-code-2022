import * as Util from './util';
import {cloneDeep} from 'lodash';

const regexLayout: RegExp = /\[\w\]\s?|\s{4}|\s{3}$/gm;
const regexName: RegExp = /\[(?<name>\w)\]/;

export interface CargoData {
    structureRaw: string[][];
    structure: string[][];
    instructionsRaw: string[];
    instructions: Instruction[];
}

export enum ReadState {
    structure,
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

        if (structure[i] && structure[i].length) {
            topCrates.push(structure[i][structure[i].length - 1]);
        }
    }
    
    console.log(`Part 1: Top crates in the stacks: ${topCrates.join('')}`);


    // process instructions;
    let structure2 = cloneDeep(data.structure);
    for (let i = 0; i < data.instructions.length; i++) {
        const instruction = data.instructions[i];

        structure2 = executeInstruction(structure2, instruction, MoveMode.multiple);
    }

    let topCrates2: string[] = [];
    for (let i = 0; i < structure2.length; i++) {

        if (structure2[i] && structure2[i].length) {
            topCrates2.push(structure2[i][structure2[i].length - 1]);
        }
    }
    console.log(`Part 2: Top crates in the stacks: ${topCrates2.join('')}`);

}

/**
 * Convert string array of cargo data rows into cleaned arrays of cargo item rows
 * @param dataRaw string array with the raw cargo data rows in string format
 * @returns multidimension string array with the cargo stacks in individual arrays
 */
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
                    const layoutArray: string[] = layoutLineToArray(element);
                    data.structureRaw.push(layoutArray);
                }
                else {
                    state = ReadState.instructions;
                }
                break;
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

/**
 * Convert string representation of a row from the stacks into "item" array for that row
 * @param layout string representation of the cargo stacks row in format '[B] [C] [D]'
 * @returns string array of the row items, cleaned eg [ 'B', 'C', 'D' ]
 */
export const layoutLineToArray = (layout: string) => {
    const containerArray: string[] = [];

    let arr;
    while ((arr = regexLayout.exec(layout)) !== null) {
        let [, name] = regexName.exec(arr[0]) || [];
        containerArray.push(name);
    }      

    return containerArray;
}

export function getStackCountFromLayoutString(layout: string): number {
    return (layout.length + 1) / 4;
}

/**
 * Convert instruction text into Instruction object
 * @param instruction raw instruction text
 * @returns Instruction object
 */
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
export function executeInstruction(structure: string[][], instruction: Instruction, moveMode: MoveMode = MoveMode.single): string[][] {
    // lets make it immutable
    const newStructure = cloneDeep(structure);

    switch(moveMode as MoveMode) {
        case MoveMode.single:
            return moveInstructionSingle(instruction, newStructure);
        case MoveMode.multiple:
            return moveInstructionMultiple(instruction, newStructure);
        default:
            throw new Error(`unknown move mode ${moveMode}`);
    }
}

function moveInstructionSingle(instruction: Instruction, structure: string[][]): string[][] {
    const fromIndex = instruction.from - 1;
    const toIndex = instruction.to - 1;
    for (let i = 0; i < instruction.move; i++) {
        const value = structure[fromIndex].pop();
        if (!value) {
            console.log(`cannot move crate from '${instruction.from}' to '${instruction.to}' as the stack is empty`);
            continue;
        }

        structure[toIndex].push(value);
    }
    return structure;
}

function moveInstructionMultiple(instruction: Instruction, structure: string[][]): string[][] {
    const fromIndex = instruction.from - 1;
    const toIndex = instruction.to - 1;
    const itemsToMove = structure[fromIndex].splice(-1 * instruction.move, instruction.move);
    structure[toIndex].push(...itemsToMove);
    return structure;
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


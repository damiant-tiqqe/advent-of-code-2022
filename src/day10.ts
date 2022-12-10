import * as Util from './util';



export const run = ():void => {
    // day 10
    console.log(`----------- Day 10 -----------`);
    const dataRaw = Util.readDataFile('data/day10/input.txt');

    const cyclesToRead: number[] = [
        20,
        60,
        100,
        140, 
        180,
        220
    ];
    const stateHistory: CPU[] = part1(dataRaw);
    


    const keyStates = stateHistory.filter(x => cyclesToRead.includes(x.cycle));
    const totalSignalStrength = Util.sumArray(keyStates.map(x => x.registerStart * x.cycle));

    console.log(`Part 1: Total signal strenth: ${totalSignalStrength}`);

    const crtDisplay: string[] = convertRegisterHistoryToCrtDisplay(stateHistory);

    console.log(`Part 2:`);
    displayCrt(crtDisplay);

};

// export interface InstructionCycles {
//     [key: string]: number
// }

export interface CPU {
    registerStart: number;
    registerEnd?: number;
    cycle: number;
    currentInst?: string | undefined;
}

export interface Instruction {
    instruction: string;
    cycles: number;
    value: number | undefined;
}

export function part1(dataRaw: string[]): CPU[] {

    const instructions = convertRawDataToInstructions(dataRaw);
    const stateHistory: CPU[] = executeAllInstructions(instructions);
    return stateHistory;
}

export const convertRawDataToInstructions = (dataRaw: string[]): Instruction[] => {
    const instructions: Instruction[] = [];
    
    for (let i = 0; i < dataRaw.length; i++) {
        const instructionRaw = dataRaw[i];
        if (!instructionRaw || instructionRaw.length === 0) {
            continue;
        }
        const instruction = getInstructionFromCommand(instructionRaw);
        instructions.push(instruction);
    }
    return instructions;

}

export function executeAllInstructions(instructions: Instruction[]) {
    const stateHistory: CPU[] = [];
    let currentCpu: CPU = { registerStart: 1, cycle: 0, registerEnd: 1 };
    for (let i = 0; i < instructions.length; i++) {
        const instruction = instructions[i];
        const [result, states] = executeInstruction(instruction, currentCpu);
        currentCpu = result;
        stateHistory.push(...states);
    }
    return stateHistory;
}

export function getInstructionFromCommand(input: string): Instruction {
    if (!input || input.length === 0){
        return undefined;
    }
    const instructionCycles = [
         { instruction: 'noop', cycles: 1 },
         { instruction: 'addx', cycles: 2 }
    ];
    const split = input.split(' ');
    const instruction = split[0]
    const value = split.length > 1 ? parseInt(split[1]) : undefined;
    const cycles = instructionCycles.find(x => x.instruction === split[0]).cycles;
    return { instruction, cycles, value } as Instruction;
}


export function executeInstruction(instruction: Instruction, cpu: CPU): [CPU, CPU[]] {

    let newCpu: CPU;
    const registerStart = cpu.registerEnd ?? cpu.registerStart;
    let registerEnd = registerStart;
    const cpuStates: CPU[] = [];
    for (let i = 0; i < instruction.cycles; i++) {
        // start
            const cycle = cpu.cycle + i + 1;
        // during
        
        //end
            // execute the instruction, update the register, if in the last cycle of the instruction
        if ( i === instruction.cycles - 1) {
            //newCpu.registerEnd = getRegisterValue(instruction, newCpu);
            //registerEnd = getRegisterValue(instruction, newCpu); 
            registerEnd = registerStart + (instruction.value ?? 0); 
        }
        // create the new cpuState
        newCpu = { cycle, registerStart, registerEnd };
        cpuStates.push(newCpu);
    }

    return [newCpu, cpuStates];
}

export function isSpriteVisible(element: CPU, cycleCount: number, rowLength: number): boolean {
    const rowPosition = cycleCount % rowLength;
    return rowPosition >= element.registerStart - 1 && rowPosition <= element.registerStart + 1;
}

export const displayCrt = (crtDisplay: string[]): void => {
    for (let i = 0; i < crtDisplay.length; i++) {
        const row = crtDisplay[i];
        console.log(`${row}`);
    }
}

export const convertRegisterHistoryToCrtDisplay = (stateHistory: CPU[]): string[] => {
    const crtDisplay: string[] = [];
    const rowLength: number = 40;
    let currentRow: string[] = []
    for (let cycleIndex = 0; cycleIndex < stateHistory.length; cycleIndex++) {
        if (cycleIndex % rowLength === 0) {
            if (cycleIndex > 0) {
                crtDisplay.push(currentRow.join(''));
            }
            currentRow = [];
        }
        const element = stateHistory[cycleIndex];        
        const isVisible: boolean = isSpriteVisible(element, cycleIndex, rowLength);
        currentRow.push(isVisible ? '#' : '.');
    }
    crtDisplay.push(currentRow.join(''));

    return crtDisplay;
}
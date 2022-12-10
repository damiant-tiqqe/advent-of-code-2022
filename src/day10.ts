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


    console.log(`Part 2: Total n: ${1}`);

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
    const stateHistory: CPU[] = [];
    let currentCpu: CPU = { registerStart: 1, cycle: 0, registerEnd: 1 };
    for (let i = 0; i < dataRaw.length; i++) {
        const instructionRaw = dataRaw[i];
        if (!instructionRaw || instructionRaw.length === 0) {
            continue;
        }
        const instruction = getInstructionFromCommand(instructionRaw);
        
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
    if (!cpu.registerEnd) {
        cpu.registerEnd = cpu.registerStart;
    }
    let newCpu: CPU;
    const cpuStates: CPU[] = [];
    for (let i = 0; i < instruction.cycles; i++) {
        // start
            //const cmd = instruction.instruction;
            newCpu = { cycle: cpu.cycle + i + 1, registerStart: cpu.registerEnd, registerEnd: cpu.registerEnd } as CPU;
        // during
        // check for display/recording of register value based on cycle
            
        //end
        // execute the instruction, update the register, if in the last cycle of the instruction
        if ( i === instruction.cycles - 1) {
            newCpu.registerEnd = getRegisterValue(instruction, newCpu);
        }
        else {
            newCpu.registerEnd = newCpu.registerStart;
        }
        
        cpuStates.push(newCpu);
    }

    return [newCpu, cpuStates];
}

export function getRegisterValue(instruction: Instruction, newCpu: CPU): number {
    switch(instruction.instruction) {
        case 'noop':
            return newCpu.registerStart;
        case 'addx':
            return newCpu.registerStart + instruction.value;
        default:
            return newCpu.registerStart;
    }
}
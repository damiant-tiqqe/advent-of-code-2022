import * as Day10 from './day10';
import { assert } from 'chai';
import {cloneDeep} from 'lodash';
import * as Util from './util';

describe(`Advent of Code 2022 - Day 10`, async () => {
    
    it(`should get instruction from 'noop' command`, async () => {
        const input: string = 'noop';
        const expected: Day10.Instruction = { instruction: 'noop', cycles: 1, value: undefined};
    
        const result: Day10.Instruction = Day10.getInstructionFromCommand(input);
        assert.deepEqual(result, expected);
    });
    
    it(`should do nothing for 1 cycle for instruction 'noop'`, async () => {
        const instruction: Day10.Instruction = { instruction: 'noop', cycles: 1, value: undefined};
        const cpu: Day10.CPU = { registerStart: 0, cycle: 0};
        const expected: Day10.CPU = { registerStart: 0, cycle: 1, registerEnd: 0};
        //const expectedCycleCount = 1;

        const [result] = Day10.executeInstruction(instruction, cpu)
        assert.deepEqual(result, expected);
    });

    it(`should add 5 to the register after 2 cycles for instruction 'addx 5'`, async () => {
        const instruction: Day10.Instruction = { instruction: 'addx', cycles: 2, value: 5};
        const cpu: Day10.CPU = { registerStart: 0, cycle: 0};
        const expected: Day10.CPU = { registerStart: 0, cycle: 2, registerEnd: 5};
        //const expectedCycleCount = 1;

        const [result] = Day10.executeInstruction(instruction, cpu)
        assert.deepEqual(result, expected);
    });

    it(`should get the register value of 5 at cycle 3 for 5x instructions 'addx 5'`, async () => {
        const cpu: Day10.CPU = { registerStart: 0, cycle: 0};
        const instructions: Day10.Instruction[] = [
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
        ];

        const cycleToCheck: number = 3;
        const expected: Day10.CPU = { registerStart: 5, cycle: 3, registerEnd: 5};
        
        const stateHistory: Day10.CPU[] = [];
        let currentCpu: Day10.CPU = cloneDeep(cpu);
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            const [result, states] = Day10.executeInstruction(instruction, currentCpu)
            currentCpu = result;
            stateHistory.push(...states);
        }
        const stateAtCycle = stateHistory.find(x => x.cycle === cycleToCheck);
        assert.deepEqual(stateAtCycle, expected);
    });

    it(`should get the register value of 15 at cycle 7 for 5x instructions 'addx 5'`, async () => {
        const cpu: Day10.CPU = { registerStart: 0, cycle: 0};
        const instructions: Day10.Instruction[] = [
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
        ];

        const cycleToCheck: number = 7;
        const expected: Day10.CPU = { registerStart: 15, cycle: 7, registerEnd: 15};
        
        const stateHistory: Day10.CPU[] = [];
        let currentCpu: Day10.CPU = cloneDeep(cpu);
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            const [result, states] = Day10.executeInstruction(instruction, currentCpu)
            currentCpu = result;
            stateHistory.push(...states);
        }
        const stateAtCycle = stateHistory.find(x => x.cycle === cycleToCheck);
        assert.deepEqual(stateAtCycle, expected);
    });

    it(`should get the register value of 20 at cycle 8 for 5x instructions 'addx 5'`, async () => {
        const cpu: Day10.CPU = { registerStart: 0, cycle: 0};
        const instructions: Day10.Instruction[] = [
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
            { instruction: 'addx', cycles: 2, value: 5},
        ];

        const cycleToCheck: number = 8;
        const expected: Day10.CPU = { registerStart: 15, cycle: 8, registerEnd: 20};
        
        const stateHistory: Day10.CPU[] = [];
        let currentCpu: Day10.CPU = cloneDeep(cpu);
        for (let i = 0; i < instructions.length; i++) {
            const instruction = instructions[i];
            const [result, states] = Day10.executeInstruction(instruction, currentCpu)
            currentCpu = result;
            stateHistory.push(...states);
        }
        const stateAtCycle = stateHistory.find(x => x.cycle === cycleToCheck);
        assert.deepEqual(stateAtCycle, expected);
    });

    it.skip(`should run the day`, async () => {
        Day10.run();
    });

    it.skip(`should `, async () => {
        const sample = [
            'addx 15',
'addx -11',
'addx 6',
'addx -3',
'addx 5',
'addx -1',
'addx -8',
'addx 13',
'addx 4',
'noop',
'addx -1',
'addx 5',
'addx -1',
'addx 5',
'addx -1',
'addx 5',
'addx -1',
'addx 5',
'addx -1',
'addx -35',
'addx 1',
'addx 24',
'addx -19',
'addx 1',
'addx 16',
'addx -11',
'noop',
'noop',
'addx 21',
'addx -15',
'noop',
'noop',
'addx -3',
'addx 9',
'addx 1',
'addx -3',
'addx 8',
'addx 1',
'addx 5',
'noop',
'noop',
'noop',
'noop',
'noop',
'addx -36',
'noop',
'addx 1',
'addx 7',
'noop',
'noop',
'noop',
'addx 2',
'addx 6',
'noop',
'noop',
'noop',
'noop',
'noop',
'addx 1',
'noop',
'noop',
'addx 7',
'addx 1',
'noop',
'addx -13',
'addx 13',
'addx 7',
'noop',
'addx 1',
'addx -33',
'noop',
'noop',
'noop',
'addx 2',
'noop',
'noop',
'noop',
'addx 8',
'noop',
'addx -1',
'addx 2',
'addx 1',
'noop',
'addx 17',
'addx -9',
'addx 1',
'addx 1',
'addx -3',
'addx 11',
'noop',
'noop',
'addx 1',
'noop',
'addx 1',
'noop',
'noop',
'addx -13',
'addx -19',
'addx 1',
'addx 3',
'addx 26',
'addx -30',
'addx 12',
'addx -1',
'addx 3',
'addx 1',
'noop',
'noop',
'noop',
'addx -9',
'addx 18',
'addx 1',
'addx 2',
'noop',
'noop',
'addx 9',
'noop',
'noop',
'noop',
'addx -1',
'addx 2',
'addx -37',
'addx 1',
'addx 3',
'noop',
'addx 15',
'addx -21',
'addx 22',
'addx -6',
'addx 1',
'noop',
'addx 2',
'addx 1',
'noop',
'addx -10',
'noop',
'noop',
'addx 20',
'addx 1',
'addx 2',
'addx 2',
'addx -6',
'addx -11',
'noop',
'noop',
'noop'
        ];
        const cyclesToRead: number[] = [
            20,
            60,
            100,
            140, 
            180,
            220
        ];
        const stateHistory: Day10.CPU[] = Day10.part1(sample);
        const keyStates = stateHistory.filter(x => cyclesToRead.includes(x.cycle));
        const totalSignalStrength = Util.sumArray(keyStates.map(x => x.registerStart * x.cycle));
        assert.equal(totalSignalStrength, 13140);
    });
});
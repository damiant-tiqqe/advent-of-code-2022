import * as Util from './util';
import {cloneDeep} from 'lodash';


export const run = ():void => {
    console.log(`----------- Day 9 -----------`);
    const dataRaw = Util.readDataFile('data/day9/input.txt');

    const tailHistory: Position[] = part1(dataRaw);
    const uniquePositions = [... new Set(tailHistory.filter(x => x))];
    console.log(`Part 1: Total number of tail positions visited: ${uniquePositions.length}`);

    const tailHistory2 = part2(dataRaw);
    const uniquePositions2 = [... new Set(tailHistory2.filter(x => x))];


    console.log(`Part 1: Total number of tail positions visited: ${uniquePositions2.length}`);

};

export interface Position {
    x: number;
    y: number;
}


function part1(dataRaw: string[]) {
    let headPosition: Position = { x: 0, y: 0 };
    let tailPosition: Position = { x: 0, y: 0 };
    const tailHistory: Position[] = [tailPosition];

    for (let i = 0; i < dataRaw.length; i++) {
        const element = dataRaw[i];
        if (!element) {
            continue;
        }
        const instructions: Position[] = convertInstructionToMove(element);

        for (let j = 0; j < instructions.length; j++) {
            const instruction = instructions[j];

            // move the head
            ({ headPosition, tailPosition } = executeInstruction(headPosition, instruction, tailPosition, tailHistory));

        }
    }
    return tailHistory;
}


export function part2(dataRaw: string[], diagnostics: boolean = false) {
    const noMove: Position = {x: 0, y:0};
    const headIndex = 0;
    //let headPosition: Position = { x: 0, y: 0 };
    let knotPositions: Position[] = [
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
        { x: 0, y: 0 },
    ];
    const tailHistory: Position[] = [knotPositions[9]];

    for (let cmdIndex = 0; cmdIndex < dataRaw.length; cmdIndex++) {
        const element = dataRaw[cmdIndex];
        if (!element) {
            continue;
        }
        const instructions: Position[] = convertInstructionToMove(element);

        for (let cmdStepIndex = 0; cmdStepIndex < instructions.length; cmdStepIndex++) {
            const instruction = instructions[cmdStepIndex];
            
            knotPositions[headIndex] = move(knotPositions[headIndex], instruction);
    
            if (diagnostics) {
                console.log(element)
                displayPositions2(knotPositions[headIndex], knotPositions, 'Head Move');
            }

            for (let tailIndex = 1; tailIndex < knotPositions.length; tailIndex++) {
                //const tailPosition = knotPositions[k];
                const tailMove = getMove(knotPositions[tailIndex], knotPositions[tailIndex-1]);
                if (tailMove.x !== noMove.x || tailMove.y !== noMove.y) {
                    // move the tail to follow the head
                    const newTailPosition = move(knotPositions[tailIndex], tailMove);
                    //console.log(`tail: ${tailPosition.x}:${tailPosition.y} -> ${newTailPosition.x}:${newTailPosition.y}`);
            
                    if (tailIndex === knotPositions.length - 1 && !tailHistory.find(x => x.x === newTailPosition.x && x.y === newTailPosition.y)) {
                        tailHistory.push(newTailPosition);
                    }

                    knotPositions[tailIndex] = newTailPosition;

                    if (diagnostics) {
                        displayPositions2(knotPositions[0], knotPositions.slice(1), 'Tail Move');
                    }
                }    
            }
        }
    }
    return tailHistory;
}

export function executeInstruction(headPosition: Position, instruction: Position, tailPosition: Position, tailHistory: Position[], diagnostics: boolean = false) {
    const noMove: Position = {x: 0, y:0};

    
    const newHeadPosition = move(headPosition, instruction);

    if (diagnostics) {
        displayPositions(newHeadPosition, tailPosition, 'Head Move');
    }
    //console.log(`head: ${headPosition.x}:${headPosition.y} -> ${newHeadPosition.x}:${newHeadPosition.y}`);
    let newTailPosition: Position = cloneDeep(tailPosition);
    // get a tail move instruction to follow the head
    const tailMove = getMove(tailPosition, newHeadPosition);
    if (tailMove.x !== noMove.x || tailMove.y !== noMove.y) {
        // move the tail to follow the head
        newTailPosition = move(tailPosition, tailMove);
        //console.log(`tail: ${tailPosition.x}:${tailPosition.y} -> ${newTailPosition.x}:${newTailPosition.y}`);

        if (!tailHistory.find(x => x.x === newTailPosition.x && x.y === newTailPosition.y)) {
            tailHistory.push(newTailPosition);
        }
    }

    if (diagnostics) {
        displayPositions(newHeadPosition, newTailPosition, 'Tail Move');
    }

    return { headPosition: newHeadPosition, tailPosition: newTailPosition };
}

function displayPositions(headPosition: Position, tailPosition: Position, header: string = '') {
    console.log(`----------${header}----------`);
    let count = 10;
    const minX: number = -5;
    const minY: number = -5;
    const maxX: number = 5;
    const maxY: number = 5;
    for (let row = maxY; row >= minY; row--) {
        let line: string = '';
        for (let col = minX; col < maxX; col++) {
            if (headPosition.x === col && headPosition.y === row) {
                if (tailPosition.x === col && tailPosition.y === row) {
                    line += 'B';
                }
                else {
                    line += 'H';
                }
            }
            else if (tailPosition.x === col && tailPosition.y === row) {
                line += 'T';
            }
            else {
                line += '.';
            }
        }
        console.log(`${count}: ${line}`);
        count++;
    }
}

function displayPositions2(headPosition: Position, tailPositions: Position[], header: string = '') {
    console.log(`----------${header}----------`);
    let count = 10;
    const minX: number = -10;
    const minY: number = -10;
    const maxX: number = 10;
    const maxY: number = 10;
    for (let row = maxY; row >= minY; row--) {
        let line: string = '';
        for (let col = minX; col < maxX; col++) {
            const tailPosition = tailPositions.find(tailPosition => tailPosition.x === col && tailPosition.y === row);
            if (headPosition.x === col && headPosition.y === row) {

                if (tailPosition) {
                    line += 'B';
                }
                else {
                    line += 'H';
                }
            }
            else if (tailPosition) {
                line += `${tailPositions.indexOf(tailPosition)}`;
            }
            else {
                line += '.';
            }
        }
        console.log(`${count}: ${line}`);
        count++;
    }
}

export function moveRight(currentPos: Position, distance: number = 1): Position {
    // return {x: currentPos.x + distance, y: currentPos.y} as Position;
    return move(currentPos, {x: distance, y: 0} as Position);
}
export function moveLeft(currentPos: Position, distance: number = 1): Position {
    // return {x: currentPos.x - distance, y: currentPos.y} as Position;
    return move(currentPos, {x: -distance, y: 0} as Position);
}

export function moveUp(currentPos: Position, distance: number = 1): Position {
    // return {x: currentPos.x, y: currentPos.y + distance} as Position;
    return move(currentPos, {x: 0, y: distance} as Position);
}

export function moveDown(currentPos: Position, distance: number = 1): Position {
    // return {x: currentPos.x, y: currentPos.y - distance} as Position;
    return move(currentPos, {x: 0, y: -distance} as Position);
}

export function move(currentPos: Position, move: Position): Position {
    return {x: currentPos.x + move.x, y: currentPos.y + move.y} as Position;
}

export function getHorizontalMove(currentPos: Position, targetPos: Position): number {
    return targetPos.x - currentPos.x;
}

export function getOffset(currentPos: Position, targetPos: Position): Position {
    return {x: targetPos.x - currentPos.x, y: targetPos.y - currentPos.y} as Position;
}
export function getMove(currentPos: Position, targetPos: Position): Position {
    const offset = getOffset(currentPos, targetPos)
    const normalised: Position = getNormalisedOffset(offset);
    const adjusted: Position = adjustForDiagonals(normalised, offset);
    return {x: adjusted.x, y: adjusted.y} as Position;
}



export function normalise(input: number): number {
    return Math.max(Math.min(input, 1), -1)
}

export function convertInstructionToMove(element: string): Position[] | undefined {
    if (!element || !element.length) {
        return undefined;
    }

    const instructions: Position[] = [];
    const split = element.split(' ');
    const distance = parseInt(split[1]);
    for (let i = 0; i < distance; i++) {
        switch(split[0]) {
            case 'U':
                instructions.push({x: 0, y: 1} as Position);
                break;
            case 'D':
                instructions.push( {x: 0, y: -1} as Position);
                break;
            case 'L':
                instructions.push( {x: -1, y: 0} as Position);
                break;
            case 'R':
                instructions.push( {x: 1, y: 0} as Position);
                break;
            default:
                return undefined;                    
        }       
    }

    return instructions;
}


export function adjustForDiagonals(normalised: Position, offset: Position): Position {
    const x = Math.abs(offset.y) >= 2 && normalised.x == 0 ? offset.x : normalised.x;
    const y = Math.abs(offset.x) >= 2 && normalised.y == 0 ? offset.y : normalised.y;
    return {x,y}
}

export function getNormalisedOffset(offset: Position): Position {
    return {x: normalise(offset.x - Math.sign(offset.x)), y: normalise(offset.y - Math.sign(offset.y)) };
}




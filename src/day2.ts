//import * as Util from './util';

import { readDataFile } from "./util";

export enum Opponent {
    Rock = 'A',
    Paper = 'B',
    Scissors = 'C'
}

export enum Me {
    Rock = 'X',
    Paper = 'Y',
    Scissors = 'Z'
}

export enum StrategyOutcome {
    Lose = 'X',
    Draw = 'Y',
    Win = 'Z'
}

export enum RoundOutcome {
    Lose = 'Lose',
    Draw = 'Draw',
    Win = 'Win'
}

export const Score = [
    {id: 'X', value: 1},
    {id: 'Y', value: 2},
    {id: 'Z', value: 3},
    {id: 'Lose', value: 0},
    {id: 'Draw', value: 3},
    {id: 'Win', value: 6}
]

export const Outcome = [
    {opponent: 'A', response: 'X', result: 'Draw'},
    {opponent: 'A', response: 'Y', result: 'Win'},
    {opponent: 'A', response: 'Z', result: 'Lose'},
    {opponent: 'B', response: 'X', result: 'Lose'},
    {opponent: 'B', response: 'Y', result: 'Draw'},
    {opponent: 'B', response: 'Z', result: 'Win'},
    {opponent: 'C', response: 'X', result: 'Win'},
    {opponent: 'C', response: 'Y', result: 'Lose'},
    {opponent: 'C', response: 'Z', result: 'Draw'},
]

export const DesiredOutcome = [
    { strategy: 'X', outcome: 'Lose' },
    { strategy: 'Y', outcome: 'Draw' },
    { strategy: 'Z', outcome: 'Win' }
]

export const run = () => {
    const data = readDataFile('data/day2/data.txt');
    const strategy = convertRawDataToLiteralStrategy(data);
    const result = playStrategy(strategy);

    console.log(`Part 1: Total score playing literal strategy: ${result}`);

    const strategy2 = convertRawDataToDesiredOutcomeStrategy(data);
    const result2 = playStrategy(strategy2);


    console.log(`Part 2: Total score playing desired ourcome strategy ${result2}`);
   
}

export const convertRawDataToLiteralStrategy = (data: string[]): any[] => {
    const strategies = [];
    for(let i = 0; i < data.length; i++) {
        if (!data[i] || !data[i].length) {
            continue;
        }
        const split = data[i].split(' ');
        if (!split || split.length !== 2) {

            throw new Error(`Invalid data format: '${data[i]}'`);
        }
        const strategy = {
            opponent: split[0],
            response: split[1]
        }
        strategies.push(strategy);
    }
    return strategies;
}

export const convertRawDataToDesiredOutcomeStrategy = (data: string[]): any[] => {
    const strategies = [];
    for(let i = 0; i < data.length; i++) {
        if (!data[i] || !data[i].length) {
            continue;
        }
        const split = data[i].split(' ');
        if (!split || split.length !== 2) {

            throw new Error(`Invalid data format: '${data[i]}'`);
        }

        const desiredOutcome = convertStrategyToDesiredOutcome(split[1]);
        const response = getResponseForDesiredOutcome(split[0], desiredOutcome);
        const strategy = {
            opponent: split[0],
            response: response
        }
        strategies.push(strategy);
    }
    return strategies;
}

export const scoreRound = (opponent: string, me: string): number => {
    const result = getRoundResult(opponent, me);
    const score = getScore(me) + getScore(result);
    return score;
}

export const getRoundResult = (opponent: any, me: any) => {
    const result = Outcome.find(x => x.opponent === opponent && x.response == me).result;
    return result;
}

export const getScore = (id: string): number => {
    return Score.find(x => x.id === id).value;
}

export const playStrategy = (strategy: any): number => {
    let score = 0;
    for(let i = 0; i < strategy.length; i++) {
        score += scoreRound(strategy[i].opponent, strategy[i].response);
    }
    return score;
}

export const convertStrategyToDesiredOutcome = (strategy: string): string => {
    const desiredOutcome = DesiredOutcome.find(x => x.strategy == strategy).outcome;
    return desiredOutcome;
}

export const getResponseForDesiredOutcome = (opponent: string, desiredOutcome: string): string => {
    const response = Outcome.find(x => x.opponent === opponent && x.result === desiredOutcome).response;
    return response;
}
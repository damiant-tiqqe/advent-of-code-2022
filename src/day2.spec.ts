//import * as Day2 from '../src/day2';
import { assert } from 'chai'
import { convertRawDataToLiteralStrategy, convertStrategyToDesiredOutcome, getResponseForDesiredOutcome, getRoundResult, Me, Opponent, RoundOutcome, playStrategy, scoreRound, StrategyOutcome } from '../src/day2';
//import { readDataFile } from '../src/util';

describe(`Advent of Code 2022 - Day 2`, async () => {

    const rawData = [
        'A X',
        'B Y',
        'C Z'
    ];
    const expectedSampleStrategy = [
        {
            opponent: 'A', response: 'X'
        },
        {
            opponent: 'B', response: 'Y'
        },
        {
            opponent: 'C', response: 'Z'
        }
    ]

    it(`should get the strategies from the raw data`, async () => {
        
        const strategy = convertRawDataToLiteralStrategy(rawData);

        assert.exists(strategy);
        assert.deepEqual(strategy, expectedSampleStrategy);
    });

    it(`should lose when opponent plays rock and response is scissors`, async () => {
        const result = getRoundResult(Opponent.Rock, Me.Scissors);
        assert.strictEqual(result, 'Lose');
    });

    it(`should win when opponent plays paper and response is scissors`, async () => {
        const result = getRoundResult(Opponent.Paper, Me.Scissors);
        assert.strictEqual(result, 'Win');
    });

    it(`should draw when both play rock`, async () => {
        const result = getRoundResult(Opponent.Rock, Me.Rock);
        assert.strictEqual(result, 'Draw');
    });
    

    it(`should score 3 when opponent plays rock and response is scissors`, async () => {
        const result = scoreRound(Opponent.Rock, Me.Scissors);
        const expectedScore = 3 + 0;
        assert.strictEqual(result, expectedScore);
    });

    it(`should score 9 when opponent plays paper and response is scissors`, async () => {
        const result = scoreRound(Opponent.Paper, Me.Scissors);
        const expectedScore = 3 + 6;
        assert.strictEqual(result, expectedScore);
    });
  
    it(`should score 15 when playing the test scenario`, async () => {

        const result = playStrategy(expectedSampleStrategy);
        const expectedScore = 15;
        assert.strictEqual(result, expectedScore);
    });

    it(`should lose when strategy is X`, async () => {
        const result = convertStrategyToDesiredOutcome('X');
        assert.strictEqual(result, 'Lose');
    });

    it(`should respond with rock when opponent plays paper to result in a loss`, async () => {
        const response = getResponseForDesiredOutcome(Opponent.Paper, RoundOutcome.Lose);
        assert.strictEqual(response, Me.Rock);
    });

    it(`should respond with rock when opponent plays scissors to result in a win`, async () => {
        const response = getResponseForDesiredOutcome(Opponent.Scissors, RoundOutcome.Win);
        assert.strictEqual(response, Me.Rock);
    });

    it(`should respond with paper when opponent plays paper to result in a draw`, async () => {
        const response = getResponseForDesiredOutcome(Opponent.Paper, RoundOutcome.Draw);
        assert.strictEqual(response, Me.Paper);
    });
   
    it(`should play the sample strategies and score 12 points`, async () => {
        const expectedScore = 12;
        const gamesToPlay = [
            { opponent: Opponent.Rock, desiredOutcome: StrategyOutcome.Draw },
            { opponent: Opponent.Paper, desiredOutcome: StrategyOutcome.Lose },
            { opponent: Opponent.Scissors, desiredOutcome: StrategyOutcome.Win },
        ];

        let totalScore = 0;
        for(let i = 0; i < gamesToPlay.length; i++) {
            const gameStrategy = gamesToPlay[i];
            const desiredOutcome = convertStrategyToDesiredOutcome(gameStrategy.desiredOutcome)
            const response = getResponseForDesiredOutcome(gameStrategy.opponent, desiredOutcome);
            const gameResult = getRoundResult(gameStrategy.opponent, response);

            // const logOutcome = StrategyOutcome[desiredOutcome as keyof typeof StrategyOutcome];
            // const logOpponent = Opponent[gameStrategy.opponent.toString() as keyof typeof Opponent];
            // const logResponse = Me[response as keyof typeof Me];
            console.log(`${desiredOutcome} to ${gameStrategy.opponent} by playing ${response}`)
            assert.strictEqual(gameResult, desiredOutcome);

            const score = scoreRound(gameStrategy.opponent, response);
            totalScore += score;
        } 
        
        assert.strictEqual(totalScore, expectedScore);
    });
});


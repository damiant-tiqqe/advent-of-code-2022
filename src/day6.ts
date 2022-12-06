import * as Util from './util';

export const run = () => {

    console.log(`----------- Day 6 -----------`);
    const dataRaw = Util.readDataFile('data/day6/input.txt');

    const markerPosition = getNonRepeatingPattern(dataRaw[0]);

    console.log(`Part 1: First start of packet marker location: ${markerPosition}`);

    console.log(`Part 2: UNKNOWN`);

}

export function getNonRepeatingPattern(input: string): number {
    const regex: RegExp = /(\w)(?!\1)(\w)(?!\1|\2)(\w)(?!\1|\2|\3)(\w)(?!\1|\2|\3|\4)/;
    const match = regex.exec(input) || [];

    if (match && match[0].length === 4) {
        return match[0].length + match['index'];
    }

    return -1;
}

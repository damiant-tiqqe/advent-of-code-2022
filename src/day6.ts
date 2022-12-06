import * as Util from './util';

export const run = () => {

    console.log(`----------- Day 6 -----------`);
    const dataRaw = Util.readDataFile('data/day6/input.txt');

    const markerPosition = getNonRepeatingPattern(dataRaw[0]);

    console.log(`Part 1: First start of packet marker location: ${markerPosition}`);

    const markerPosition2 = getNonRepeatingPattern(dataRaw[0], 14);

    console.log(`Part 2: First start of message marker location: ${markerPosition2}`);

}

/**
 * because sometimes it needs to be filthy
 * @returns 
 */
export const part1 = () => {
    const match = (new RegExp(/(\w)(?!\1)(\w)(?!\1|\2)(\w)(?!\1|\2|\3)\w/)).exec(Util.readDataFile('data/day6/input.txt')[0]);
    return match && match[0].length === 4 ? match[0].length + match['index'] : -1;
}

/**
 * because sometimes it needs to be filthy
 * @returns 
 */
export const part2 = () => {
    const match = (new RegExp(/(\w)(?!\1)(\w)(?!\1|\2)(\w)(?!\1|\2|\3)(\w)(?!\1|\2|\3|\4)(\w)(?!\1|\2|\3|\4|\5)(\w)(?!\1|\2|\3|\4|\5|\6)(\w)(?!\1|\2|\3|\4|\5|\6|\7)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12)(\w)(?!\1|\2|\3|\4|\5|\6|\7|\8|\9|\10|\11|\12|\13)\w/)).exec(Util.readDataFile('data/day6/input.txt')[0]);
    return match && match[0].length === 14 ? match[0].length + match['index'] : -1;
}

export function getNonRepeatingPattern(input: string, patternLength: number = 4): number {
    //const regex: RegExp = /(\w)(?!\1)(\w)(?!\1|\2)(\w)(?!\1|\2|\3)\w/;
    const pattern: string = getDynamicRegex(patternLength)
    const regex: RegExp = new RegExp(pattern)
    const match = regex.exec(input) || [];

    if (match && match[0].length === patternLength) {
        return match[0].length + match['index'];
    }

    return -1;
}

export const getDynamicRegex = (length: number): string => {
    const result: string[] = [];
    for (let i = 1; i < length; i++) {
        const sections: string[] = [];
        for (let j = 1; j <= i; j++) {
            sections.push(`\\${j}`)
        }
        result.push(`(\\w)(?!${sections.join('|')})`);      
    }

    return result.join('') + '\\w';
}

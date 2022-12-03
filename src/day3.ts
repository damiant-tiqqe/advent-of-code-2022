import * as Util from './util';

export const run = () => {
    const data = Util.readDataFile('data/day3/data.txt');

    const priorities = [];
    for (let i = 0; i < data.length; i++) {
        const rucksack = data[i];
        const splitString: string[] = Util.splitStringInHalf(rucksack);
        const commonChars: string[] = findCommonChars(splitString[0], splitString[1]);

        commonChars.forEach(x => priorities.push(getItemPriority(x)));
    }

    const totalPriority = Util.sumArray(priorities);

    console.log(`Part 1: Total priorities for all rucksacks: ${totalPriority}`);

    const groupSize: number = 3;
    const groupBadges = getBadgesForRucksackGroups(data.filter(x => x), groupSize);
    const groupPriorities = groupBadges.map(x => getItemPriority(x));
    const totalGroupPriority = Util.sumArray(groupPriorities);

    console.log(`Part 2: Total priorities for all rucksacks groups: ${totalGroupPriority}`);

}

export function findCommonChars(string1: string, string2: string): string[] {
    const stringArray1 = Util.toCharArray(string1);
    const stringArray2 = Util.toCharArray(string2);
    const commonChars: string[] = stringArray1.filter(value => stringArray2.includes(value));
    return Util.getUniqueStrings(commonChars);
}


export function getItemPriority(item: string) {
    if (item.length !== 1) {
        throw new Error('only 1 character string allowed.');
    }

    const ascii = item.charCodeAt(0);
    if (ascii >= 97) {
        return ascii - 96;
    } 
    else {
        return ascii - (65 - 27);
    }
}

export function findCommonCharsAcrossMultiple(data: string[]): string[] {

    if (!data || data.length < 2) {
        throw new Error(`need at least 2 array elements to compare`);
    }

    const commonCharsArray = [];

    for (let i = 0; i < data.length -1; i++) {
        commonCharsArray.push(findCommonChars(data[i], data[i + 1]))
    }
    // last compare for accuracy
    commonCharsArray.push(findCommonChars(data[data.length -1], data[0]));
    
    // filter out any not in all arrays
    let finalCommonChars = commonCharsArray[0];
    for (let i = 1; i < commonCharsArray.length; i++) {
        finalCommonChars = finalCommonChars.filter(value => commonCharsArray[i].includes(value))
    }

    const result = Util.getUniqueStrings(finalCommonChars);
    return result;
}

export const getBadgesForRucksackGroups = (data: string[], groupSize: number = 3): string[] => {
    const groupBadges = [];

    for (let i = 0; i < data.length; i+= groupSize) {
        const elements = data.slice(i, i+groupSize);
        const badge = findCommonCharsAcrossMultiple(elements);
        if (!badge || badge.length !== 1) {
            throw new Error(`should only return 1 matching character`);
        }
        groupBadges.push(badge[0]);
    }

    return groupBadges;
}
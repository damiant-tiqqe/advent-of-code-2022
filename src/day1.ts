import { readDataFile, sortArray, SORTORDER, sumArray } from './util';



export const run = () => {
    console.log(`----------- Day 1 -----------`);

    const data = readDataFile('data/day1/data.txt');
    const backpacks = convertRawDataToElfArray(data);
    const backpackTotals = getTotalCaloriesCarried(backpacks);
//    console.log('backpack totals: ', backpackTotals)
    const maxCarriedCalories = getLargestCarriedCalories(backpackTotals, 3);
//    console.log('max calories carried: ', maxCarriedCalories);
    const elfIndexCarryingMaxCalories = getIndexOfElfCarrying(backpackTotals, maxCarriedCalories[0]);

    console.log(`Part 1: Elf carrying the most calories is: ${elfIndexCarryingMaxCalories + 1} carrying ${maxCarriedCalories[0]}`);

    const totalCarriedByTop3 = sumArray(maxCarriedCalories);
    console.log(`Part 2: Top 3 elves are carrying ${totalCarriedByTop3}`);
   
}



export const convertRawDataToElfArray = (rawData: string[]) => {

    const elfArray = [];
    let currentArray = [];
    for(let i = 0; i < rawData.length; i++) {
        const currentValue = rawData[i];

        if(currentValue.length === 0) {
            // end of backpack
            elfArray.push(currentArray);
            currentArray = [];
        }
        else {
            const num = parseInt(currentValue);
            currentArray.push(num);
        }
    }

    if (currentArray && currentArray.length) {
            // end of backpack list
            elfArray.push(currentArray);
            currentArray = [];        
    }

    return elfArray;
}

export const getTotalCaloriesCarried = (elvesBackpacks: number[][]) => {
    const totals = [];

    for(let i = 0; i < elvesBackpacks.length; i++) {
        totals[i] = sumArray(elvesBackpacks[i]);
    }
    return totals;
}


export const getLargestCarriedCalories = (totalCaloriesCarried: number[], take: number = 1) => {
    const sorted = sortArray(totalCaloriesCarried, SORTORDER.DESC);
//    console.log(sorted);
    const largest = sorted.slice(0, take);
    return largest
}


export const getIndexOfElfCarrying = (elvesBackpacksTotals: number[], caloryCount: number) => {
    //const caloriesCarried = getTotalCaloriesCarried(elvesBackpacks);
    const index = elvesBackpacksTotals.indexOf(caloryCount);
    return index;
}

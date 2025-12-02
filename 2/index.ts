import loadInput from "../utils/loadInput";

const fileInput = loadInput(__dirname, "input.txt")[0].split(",");

function findDuplicates(input: string) {
    let size = 1;
    while (size <= input.length / 2) {
        // Check if length is divisible by pattern size
        if (input.length % size === 0) {
            const pattern = input.slice(0, size);
            let repeated = "";
            for (let i = 0; i < input.length / size; i++) {
                repeated += pattern;
            }
            if (repeated === input) {
                return true;
            }
        }
        size++;
    }
    return false;
}

function generateIds(startString: string, endString: string): string[] {
    const start = parseInt(startString);
    const end = parseInt(endString);
    if (start > end) {
        return [];
    }
    const ids: string[] = []
    
    for (let i = start; i <= end; i++) {
        ids.push(i.toString());
    }

    return ids;
}
function part1(input: string[]): number {
    let numberSum = 0;

    input.forEach((line) => {
        const [start, end] = line.split("-");
        const ids = generateIds(start, end);
        let index = 0;
        do {        
            let id = ids[index];
            const firstHalf = id.slice(0, id.length / 2);
            const secondHalf = id.slice(id.length / 2);
            if(firstHalf === secondHalf) {
                numberSum += parseInt(id);
            }
            index++;
        } while (index < ids.length);
    });

    return numberSum;
}
function part2(input: string[]): number {
    let numberSum = 0;
    let duplicates: string[] = [];
    input.forEach((line) => {
        const [start, end] = line.split("-");
        const ids = generateIds(start, end);
        let index = 0;
        do {        
            let id = ids[index];
            const duplicatedNumber = findDuplicates(id);
            if(duplicatedNumber) {
                // console.log("Found duplicate in ", id, ":", duplicatedNumber);
                numberSum += parseInt(id);
                duplicates.push(id);
            }
            index++;
        } while (index < ids.length);
    });

    console.log("Duplicates found:", duplicates);

    return numberSum;
}

// console.log(part1(fileInput));
const p2res = part2(fileInput);
console.log(p2res);
console.log(p2res == 4174379265)
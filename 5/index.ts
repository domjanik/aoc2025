import loadInput from "../utils/loadInput";

const fileInput = loadInput(__dirname, "input.txt");
type Ranges = {
    freshList: Range[];
    ingredientList: string[];
}
type Range = {
    start: number;
    end: number;
}
function prepareInput(input: string[]): Ranges {
    const freshList: Range[] = [];
    const ingredientList: string[] = [];
    let freshEnded = false;
    for (let i = 0; i < input.length; i++) {
        let line = input[i];
        if(line === "") {
            freshEnded = true;
            continue;
        }
        if(!freshEnded) {
            if(line.includes("-")) {
                const [start, end] = line.split("-");
                const range = {
                    start: parseInt(start),
                    end: parseInt(end)
                };
                freshList.push(range);
            } 
        } else {
            ingredientList.push(line);
        }
    }
    return {
        freshList,
        ingredientList
    };
}

function part1(input: Ranges) {
    let freshCounter = 0;
    input.ingredientList.forEach(ingredient => {
        let found = false;
        input.freshList.forEach(range => {
            const ingNumber = parseInt(ingredient);
            if(!found && ingNumber >= range.start && ingNumber <= range.end) {
                freshCounter++;
                found = true;
            }
            if(found) {
                return;
            }
        });
    });
    return freshCounter;
}
function part2(input: Ranges) {
    let freshIngredients: Range[] = [];

    input.freshList.sort((a, b) => a.start - b.start).forEach(range => {
        if(freshIngredients.length === 0) {
            freshIngredients.push(range);
        } else {
            let merged = false;
            for(let i = 0; i < freshIngredients.length; i++) {
                const existingRange = freshIngredients[i];
                if((range.start <= existingRange.end && range.start >= existingRange.start) || 
                    (range.end >= existingRange.start && existingRange.end >= range.start)) {
                        if(range.start < existingRange.start) {
                            existingRange.start = range.start;
                        }
                        if(range.end > existingRange.end) {
                            existingRange.end = range.end;
                        }
                        merged = true;
                        break;
                }
            }    
            if(!merged) {
                freshIngredients.push(range);
            }            
        }

    });
    
    return freshIngredients.reduce((acc, range) => {
        return acc + (range.end - range.start + 1);
    }, 0);
}

console.log(part1(prepareInput(fileInput)));
console.log(part2(prepareInput(fileInput)));
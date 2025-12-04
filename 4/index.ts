import loadInput from "../utils/loadInput";

const fileInput = loadInput(__dirname, "input.txt").map(line => line.split(''));

function part1(input: string[][]) {
    let canBeAccessed = 0;
    input.forEach((line, index) => {
        for (let i = 0; i < line.length; i++) {
            const char = line[i];
            if (char === '@') {
                // check all directions
                const top = index > 0 ? input[index - 1][i] : null;
                const topRight = index > 0 && i < line.length - 1 ? input[index - 1][i + 1] : null;
                const topLeft = index > 0 && i > 0 ? input[index - 1][i - 1] : null;
                const bottom = index < input.length - 1 ? input[index + 1][i] : null;
                const bottomRight = index < input.length - 1 && i < line.length - 1 ? input[index + 1][i + 1] : null;
                const bottomLeft = index < input.length - 1 && i > 0 ? input[index + 1][i - 1] : null;
                const left = i > 0 ? line[i - 1] : null;
                const right = i < line.length - 1 ? line[i + 1] : null;
                const neighbors = [top, topRight, topLeft, bottom, bottomRight, bottomLeft, left, right];
                const atSigns = neighbors.filter(n => n === '@').length;
                if (atSigns < 4) {
                    canBeAccessed++;
                }
            }
        }
    });
    return canBeAccessed;
}

function part2(input: string[][]) {
  let canBeAccessed = 0;
    let lastRemoved = 0;
    do {
        let toRemove: {x: number, y: number}[]= []
        
        input.forEach((line, index) => {
            for (let i = 0; i < line.length; i++) {
                const char = line[i];
                if (char === '@') {
                    // check all directions
                    const top = index > 0 ? input[index - 1][i] : null;
                    const topRight = index > 0 && i < line.length - 1 ? input[index - 1][i + 1] : null;
                    const topLeft = index > 0 && i > 0 ? input[index - 1][i - 1] : null;
                    const bottom = index < input.length - 1 ? input[index + 1][i] : null;
                    const bottomRight = index < input.length - 1 && i < line.length - 1 ? input[index + 1][i + 1] : null;
                    const bottomLeft = index < input.length - 1 && i > 0 ? input[index + 1][i - 1] : null;
                    const left = i > 0 ? line[i - 1] : null;
                    const right = i < line.length - 1 ? line[i + 1] : null;
                    const neighbors = [top, topRight, topLeft, bottom, bottomRight, bottomLeft, left, right];
                    const atSigns = neighbors.filter(n => n === '@').length;
                    if (atSigns < 4) {
                        canBeAccessed++;
                        toRemove.push({x: i, y: index} );
                    }
                }
            }
        });
        toRemove.forEach(pos => {
            input[pos.y][pos.x] = '.';
        });
        lastRemoved = toRemove.length;
    } while (lastRemoved > 0);
    return canBeAccessed;
}

console.log(part1(fileInput));
console.log(part2(fileInput));
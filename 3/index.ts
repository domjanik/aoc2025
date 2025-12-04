import loadInput from "../utils/loadInput";

const fileInput = loadInput(__dirname, "input.txt");

function part1(input: string[]) {
    let joltageSum = 0;
    input.forEach((line, index) => {
        const battery: number[] = line.split("").map(Number);
        let first = 0;
        let second = 0;
        let highestIndex = 0;
        battery.forEach((voltage, searchIndex) => {
            if(voltage > first && searchIndex < battery.length - 1) {
                first = voltage;
                highestIndex = searchIndex;
            } 
        });
        battery.splice(highestIndex + 1).forEach((voltage, searchIndex) => {
            if(voltage > second) {
                second = voltage;
            } 
        });
        const resp = first.toString() + second.toString();
        joltageSum += Number(resp);
    });

    return joltageSum;
}

function part2(input: string[]) {
    let joltageSum = 0;
    input.forEach((line) => {
        const battery: number[] = line.split("").map(Number);
        let jolts = '';
        
        for (let start = 0, end = line.length - 11; jolts.length < 12; ) {
            const max = Math.max(...battery.slice(start, end));
            const maxIndex = battery.slice(start, end).indexOf(max);
            jolts += line.substring(start + maxIndex, start + maxIndex + 1);

            start += maxIndex + 1;
            if (end < line.length) {
                end++
            }
        }
        joltageSum += parseInt(jolts);
    });

    return joltageSum;
}

console.log(part1(fileInput));
console.log(part2(fileInput));
import loadInput from "../utils/loadInput";

const fileInput = loadInput(__dirname, "testInput.txt").reduce((acc, line) => {
    const splittedLine = line.split(" ").filter(word => word.length > 0);
    for(let i = 0; i < splittedLine.length; i++) {
        const num = splittedLine[i];
        if(!acc[i]) {
            acc[i] = [];
        }
        acc[i].push(num);
    }
    return acc;
}, [] as string[][]);

const fileInputPart2 = loadInput(__dirname, "input.txt");

function part1(input: string[][]): number {
    let problems = [];
    for(let i = 0; i < input.length; i++) {
        const column = input[i].reverse();
        const problem = column.splice(0, 1)[0];
        problems.push({numbers: column.map(num => parseInt(num)), operator: problem});
    }
    return calcProblems(problems);
}

function part2(input: string[]): number {
    const lines = input.filter(line => line.trim().length > 0);
    const maxLength = Math.max(...lines.map(line => line.length));
    const operatorRowIndex = lines.length - 1;
    const problems: {numbers: number[], operator: string}[] = [];
    let currentProblem: number[] = [];
    let currentOperator = '';
    
    for(let col = maxLength - 1; col >= 0; col--) {
        let numberStr = '';
        let operator = '';
        let isSpace = true;
        
        for(let row = 0; row < lines.length; row++) {
            const char = lines[row][col] || ' ';
            
            if(row === operatorRowIndex) {
                if(char.trim()) {
                    operator = char.trim();
                    isSpace = false;
                }
            } else if(char.trim()) {
                numberStr += char;
                isSpace = false;
            }
        }
        
        if(isSpace) {
            if(currentProblem.length > 0) {
                problems.push({numbers: currentProblem, operator: currentOperator});
                currentProblem = [];
                currentOperator = '';
            }
        } else {
            if(numberStr) {
                currentProblem.push(parseInt(numberStr));
            }
            if(operator && !currentOperator) {
                currentOperator = operator;
            }
        }
    }    
    if(currentProblem.length > 0) {
        problems.push({numbers: currentProblem, operator: currentOperator});
    }
    return calcProblems(problems);   
}

function calcProblems(problems: {numbers: number[], operator: string}[]): number {
    let overallSum = 0;
    
    for(const problem of problems) {
        let result = 0;
        if(problem.operator === "+") {
            result = problem.numbers.reduce((acc, num) => acc + num, 0);
        } else if(problem.operator === "*") {
            result = problem.numbers.reduce((acc, num) => acc * num, 1);
        }
        overallSum += result;
    }
    
    return overallSum;
}

console.log(part1(fileInput));
console.log(part2(fileInputPart2));
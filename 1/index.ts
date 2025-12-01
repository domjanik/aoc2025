import loadInput from "../utils/loadInput";

interface Move {
  direction: string;
  move: number;
}

const fileInput = loadInput(__dirname, "input.txt").map((line: string) => {
    const move = line.slice(0, 1);
    const distance = line.slice(1);
    return { direction: move, move: Number(distance) };
  });

function calcTargetPosition(currentPosition: number, move: Move): { newPosition: number; additionalClicks: number } {
  let newPosition = currentPosition;
  let additionalClicks = 0;
  for (let i = 0; i < move.move; i++) {
    if (move.direction === "R") {
      newPosition++;
      if (newPosition > 99) {
        newPosition = 0;
      }
    } else if (move.direction === "L") {
      newPosition--;
      if (newPosition < 0) {
        newPosition = 99;
      }
    }
    if (newPosition === 0) {
      additionalClicks++;
    }
  }
  return { newPosition, additionalClicks };
}

function part1(input: Move[]): number {
  let counter = 0;
  input.reduce((acc: number, curr: Move) => {
    const { newPosition } = calcTargetPosition(acc, curr);
    if (newPosition === 0) {
      counter++;
    }
    return newPosition;
  }, 50);
  return counter;
}
function part2(input: Move[]): number {
  let counter = 0;
  input.reduce((acc: number, curr: Move) => {
    const { newPosition, additionalClicks } = calcTargetPosition(acc, curr);
    counter += additionalClicks;
    return newPosition;
  }, 50);
  return counter;
}

console.log("Part 1", part1(fileInput));
console.log("Part 2", part2(fileInput));

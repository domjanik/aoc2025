import * as fs from "fs";
import * as path from "path";

export default function loadInput(__dirname: any, fileName: string): string[] {
    return fs
    .readFileSync(path.join(__dirname, fileName), "utf8")
    .split("\n")
}
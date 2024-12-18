import { readFile } from "~/utils";
import type { Run } from "~/utils/types";

const run: Run = async () => {
  const path = "day02/input.txt";
  const lines = await readFile(path);

  const safetyChecker = (levels: number[]) => {
    let direction = Math.sign(levels[0] - levels[1]);
    if (direction === 0) return false;

    for (let i = 0; i < levels.length - 1; ++i) {
      const newDirection = Math.sign(levels[i] - levels[i + 1]);
      const diff = Math.abs(levels[i] - levels[i + 1]);
      if (newDirection !== direction || diff < 1 || diff > 3) {
        return false;
      }
    }
    return true;
  };

  let count1 = 0;
  let count2 = 0;
  for (let i = 0; i < lines.length; ++i) {
    const line = lines[i];
    const levels = line.split(" ").map((level) => +level);

    if (safetyChecker(levels)) {
      ++count1;
      ++count2;
      continue;
    }

    for (let j = 0; j < levels.length; ++j) {
      const tempLevels = [...levels];
      tempLevels.splice(j, 1);
      if (safetyChecker(tempLevels)) {
        ++count2;
        break;
      }
    }
  }

  return [count1, count2];
};

export default run;

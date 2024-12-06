import { parseArgs } from "util";
import {
  allDays,
  lastDay,
  numberToDay,
  runDay,
  timerStart,
  timerStop,
} from "~/utils";
import type { Day } from "~/utils/types";
import { generateReport } from "~/utils/benchmark";

const { values } = parseArgs({
  args: Bun.argv,
  options: {
    day: {
      type: "string",
      short: "d",
    },
    all: {
      type: "boolean",
      short: "a",
    },
    benchmark: {
      type: "boolean",
      short: "b",
    },
  },
  strict: true,
  allowPositionals: true,
});

const run = async (day: Day) => {
  console.group(day);
  console.log("running...");
  const start = timerStart("done");
  const [part1, part2] = await runDay(day);
  console.log("part 1", part1);
  console.log("part 2", part2);
  timerStop(start);
  console.groupEnd();
};

const report = async (day: Day) => {
  console.group(day);
  console.log("generate report...");
  await generateReport(day);
  console.log("done");
  console.groupEnd();
};

if (values.all) {
  // Run all the days
  const days = await allDays();

  for (let i = 0; i < days.length; ++i) {
    const day = days[i];
    if (values.benchmark) {
      await report(day);
    } else {
      await run(day);
    }
  }
} else if (values.day) {
  // Run a specific day
  const day = numberToDay(+values.day);
  if (values.benchmark) {
    await report(day);
  } else {
    await run(day);
  }
} else {
  // Run last day
  const day = await lastDay();
  if (values.benchmark) {
    await report(day);
  } else {
    await run(day);
  }
}

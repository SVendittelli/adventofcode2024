import { readdir } from "node:fs/promises";
import type { Day } from "./types";

/**
 * Read all the lines of a given file.
 * @param {string} path The path to the file to read
 * @returns {Promise<string[]>} An array of each of the lines of the file as a string
 */
export const readFile = async (path: string): Promise<string[]> => {
  const file = Bun.file(path);

  const input = await file.text();
  const lines = input.trim().split("\n");
  return lines;
};

export const numberToDay = (num: number): Day => {
  const padded = `${num}`.padStart(2, "0");
  return `day${padded}` as Day;
};
export const dayToNumber = (day: Day) => +day.slice(3);

export const allDays = async (): Promise<Day[]> => {
  const directories = await readdir("./", {
    withFileTypes: true,
  });

  return directories
    .filter((dir) => dir.isDirectory())
    .map((dir) => dir.name)
    .filter((dir): dir is Day => /day[0-9]+/.test(dir))
    .toSorted();
};

export const lastDay = async (): Promise<Day> => {
  const days = await allDays();
  return days.at(-1) ?? "day01";
};
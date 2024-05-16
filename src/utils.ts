import dayjs from "dayjs";
import type { Loading } from "./store/features/productsSlice";

export const repeat = (n: number) => Array.from(Array(n).keys());

export function getMultiSelected(
  target: EventTarget & HTMLSelectElement
): string[] {
  return Array.from(target.options).reduce<string[]>((acc, option) => {
    if (option.selected) {
      acc.push(option.value);
    }
    return acc;
  }, []);
}
const SEC = 1000;
const MIN = 60 * SEC;
const HOUR = 60 * MIN;
const DAY = 24 * HOUR;

export function timestampToDays(ms: number) {
  return ms / DAY;
}

export function generateId(max: number) {
  return Math.floor(Math.random() * max);
}

export function combineLoadingStates(
  state1: Loading,
  state2: Loading
): Loading {
  if (state1 === "loading" || state2 === "loading") {
    return "loading";
  }
  if (state1 === "failed" || state2 === "failed") {
    return "failed";
  }
  return "succeeded";
}

export function defaultExpDate(dateFormat: string = shortDateFormat) {
  const now = dayjs();
  const exp = now.add(MIN_EXP_DAY_PERIOD, "day");
  return exp.format(dateFormat);
}
export const MIN_EXP_DAY_PERIOD = 30;

export const shortDateFormat = "MM/DD/YYYY";
export const longDateFormat = "MM/DD/YYYY hh:mm a";

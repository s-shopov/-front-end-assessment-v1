export const repeat = (n: number) => Array.from(Array(n).keys());

// export function getMultiSelected(target) {
//   return Array.from(target.options).reduce((acc, { selected, value }) => {
//     if (selected) {
//       acc.push(value);
//     }
//     return acc;
//   }, []);
// }

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

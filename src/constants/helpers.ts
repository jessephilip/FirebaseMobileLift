export function getRandomInt (max: number, min?: number): number {
  if (min === null || min === undefined) {
    max = Math.floor(max);
    return Math.floor(Math.random() * max);
  }

  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

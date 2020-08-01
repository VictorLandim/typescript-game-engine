/** Random float: min and max inclusive. */
export const randomf = (min: number, max: number): number => Math.random() * (max - min) + min

/** Random int: min and max inclusive. */
export const random = (min: number, max: number): number => Math.round(randomf(min, max))
const inspect = (obj: any, key = 'inspect'): void => window[key] = obj

export const Debug = {
  inspect
}
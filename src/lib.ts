export function isParameter(text: string) {
  return text.slice(0, 1) === ":";
}

export function trimColon(text: string) {
  return isParameter(text) ? text.slice(1) : text;
}

export function removeNullish<T extends Record<any, any>>(obj: T): unknown {
  const result: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const element = obj[key];
      if (element !== null && element !== undefined) {
        result[key] = element;
      }
    }
  }

  return result;
}

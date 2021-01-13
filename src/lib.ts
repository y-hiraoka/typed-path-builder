export function isParameter(text: string) {
  return text.slice(0, 1) === ":";
}

export function trimColon(text: string) {
  return isParameter(text) ? text.slice(1) : text;
}

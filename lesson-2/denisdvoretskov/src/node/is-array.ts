function isInArray(arr: any[], ...rest: any[]): boolean {
  if (rest.length === 0) {
    return false;
  }

  return rest.every(item => arr.includes(item));
}

export default isInArray;

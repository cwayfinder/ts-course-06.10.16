function summator(...rest: (string | number)[]): number {
  return rest.reduce((pre: number, cur: number | string) => {
    let current: number = 0;

    if (typeof cur === 'string') {
      current = parseFloat(cur);
    }

    if (typeof cur === 'number') {
      current = cur;
    }

    return pre + current;
  }, 0) as number;
}

export default summator;

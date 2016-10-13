function summator(...args: number[]): number;
function summator(...args: string[]): number;
function summator(...args: (string|number)[]): number {
    let total: number = 0;
    args.forEach((value, index, array) => {
        total += typeof value === 'string' ? parseInt(value) : value;
    });

    return total;
}

console.log(summator(1, 2, 3));

console.log(summator('4', '5', '6'));

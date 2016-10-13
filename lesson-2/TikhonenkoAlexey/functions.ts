//1
function isInArray(arr: Array<any>, ...elements): boolean {
    for (let item of elements) {
        if (arr.indexOf(item) == -1) {
            return false;
        }
    }

    return true;
}

//2
function summator(...elements: Array<number | string>): number {
    let sum = 0;
    for (let item of elements) {
        if (typeof item === "string") {
            item = parseFloat(item);
        }

        sum += item;
    }

    return sum;
}

//3
//Вопрос - как сделать так, чтобы elements был readonly?
function getUnigue(...elements): Array<any> {
    let result = [];
    for(let item in elements) {
        if(result.indexOf(item) == -1) {
            result.push(item);
        }
    }

    return result;
}
function logger(title: string, expressions: any[][], func: Function):void;
function logger(title: string, expressions: any[]):void;
function logger(title: string, expressions:any, func?: any){
    console.log(`\n${ title }:`);
    if(typeof func === "function"){
        expressions.forEach((a) => {
            console.log(`  F(${ JSON.stringify(a).replace(/(^\[)|(]$)/g, "") }) = ${ JSON.stringify(func.apply(null, a)) }`);
        });
    }else{
        expressions.forEach((a, i) => {
            console.log(`  F[${i}] => ${ a }`);
        });
    }
}



/* 1)
    Написать функцию isInArray(), которая начиная со второго принимает переменное количество аргументов.
    Возвращает true, если все аргументы, кроме первого входят в первый.
    Первым всегда должен быть массив.
*/
function isInArray(arr: any[], ...args: any[]): boolean{
    return args.every( (a) => arr.indexOf(a) !== -1);
}

logger("isInArray", [
    [[10, "a", true], 45],
    [[10, "a", true], 10],
    [[10, "a", true], 10, "a"],
    [[10, "a", true], 10, "a", true]
], isInArray);



/* 2)
    Написать функцию summator(), которая сумирует переданые ей аргументы.
    Аргументы могут быть либо строкового либо числового типа. Количество их не ограничено
*/
function summator(...numericalSeries: string[]):number;
function summator(...numericalSeries: number[]):number;
function summator(...numericalSeries: any[]): number{
    if(typeof numericalSeries[0] === "string"){
        return numericalSeries.reduce((total, n) => total + (+n), 0);
    }
    return numericalSeries.reduce((total, n) => total + n);
}

logger("summator", [
    summator(10, 5, 35),
    summator("10", "20", "30")
]);



/* 3)
    Написать функцию getUnique(arr), которая принимает аргументом неограниченое число аргументов,
    и возвращает массив уникальных элементов. Аргумент не должен изменяться.
    Порядок элементов результирующего массива должен совпадать с порядком,
    в котором они встречаются в оригинальной структуре.
*/
let getUnique:Function = function(){
    function removeEl(arr: any[], pointer: number = 0):any[]{
        let el: any = arr[pointer],
            isNaN: boolean = el !== el,
            filteredArr: any[] = arr.slice(0, pointer + 1);

        for(let l = arr.length, i = pointer + 1; i < l; i++){
            let curEl = arr[i];
            if((isNaN && curEl === curEl) || (!isNaN && curEl !== el)){
                filteredArr.push(arr[i]);
            }
        }
        return filteredArr;
    }

    return function(...elems: any[]){
        let uniqueElems: any[]= elems.slice(0),
            pointer: number = 0;

        while (pointer < uniqueElems.length) {
            uniqueElems = removeEl(uniqueElems, pointer++);
        }
        return uniqueElems;
    }
}();

logger("getUnique", [
    getUnique(45, "45", 4, true, null, true, null),
    getUnique(4, "bla", Number.NaN, "bla", Number.NaN)
], );


/* 4)
    Написать функцию котороя будет разворачивать буквы в словах предложения, но только лишь буквы
    цифры и специальные символы должны остаться на месте
    s1tar3t 2 hellow  ->  t1rat3s 2 wolleh
    s1ta$%r3t 2 hel^low  ->  t1ra$%t3s 2 wol^leh
    s1tar3t 2   low5  ->  t1rat3s 2   wol5
*/
function reverseStr(inputStr:string):string{
    let words: string[] = inputStr.split(/^[^a-zA-Z]+|\s+[^a-zA-Z]*|[^a-zA-Z]+$/),
        letterRegex = /[a-zA-Z]/,
        outputStr: string = inputStr,
        lastPos: number = 0;

    for(let word of words){
        let originalPos: number = lastPos = inputStr.indexOf(word, lastPos),
            wordLength: number = word.length,
            leftHand: string = outputStr.substr(0, originalPos),
            rightHand: string = outputStr.substr(originalPos + wordLength),
            letters: string[] = word.split("");

        for(let i = 0, nL = wordLength/2; i < nL; i++){
            let rPos = wordLength - i - 1,
                rLetter = letters[rPos],
                letter = letters[i];

            if(letterRegex.test(letter) && letterRegex.test(rLetter)){
                letters[i] = rLetter;
                letters[rPos] = letter;
            }
        }

        outputStr = leftHand + letters.join("") + rightHand;
    }

    return outputStr;
}

logger("reverseStr", [
    ["s1tar3t 2 hellow"],
    ["s1ta$%r3t 2 hel^low"],
    ["s1tar3t 2   low5"]
], reverseStr);
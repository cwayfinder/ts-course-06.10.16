/**
 * Created by igor on 10/10/16.
 */
// function getAverage(a: number, b: number, c: number): string {
//     let total = a + b + c;
//     let average = total/3;
//     return `This average is ${average}`
// }
//
// console.log(getAverage(1,2,3));


// function getAverage(a: number, b: number, c?: number): string {
//     let total = a;
//     let count = 1;
//     total += b;
//     if (typeof c !== 'undefined') {
//         total += c;
//         count++;
//     }
//     let average = total / count;
//     return `This average is ${average}`
// }
//
//
// getAverage(1,2);


// function getAverage(a: number, b: number, c: number = 0): string {
//     let total = a + b + c;
//     let average = total/3;
//     return `This average is ${average}`
// }


// function getAverage(...a: number[]): string {
//     let total = 0;
//     let count = 0;
//     for (let i = 0; i < a.length; i++) {
//         total += a[i];
//         count++;
//     }
//     let average = total / count;
//     return `This average is ${average}`
// }
// getAverage(1,2,3,4,5,3)

// function isString(a:any): a is string{
//     if(typeof a === 'string'){
//         return true;
//     }
//     return false
// }
// //
// function getAverage(a: string, b: string, c: string): string; // 1-я сигнатура
// function getAverage(a: number, b: number, c: number): string; // 2-я
// function getAverage(a: string | number, b: string | number, c: string | number): string{ // имп.
//     let total = parseInt(a,10) + parseInt(b,10) +parseInt(b,10);
//     if(isString(a)){
//          total += parseInt(a,10)
//     }else {
//         total+= a;
//     }
//     let average = total/3;
//     return `This average is ${average}`
// }
//
// getAverage(1,2,3);
// getAverage('1','2','3');


// class Handler {
// }
//
// class RandomHandler {
// }
//
// class ReversedHandler {
// }
//
// function getHandler(type: 'Random'): RandomHandler;
// function getHandler(type: 'Reversed'): ReversedHandler;
// function getHandler(type: string): Handler;
// function getHandler(type: string): Handler {
//     switch (type) {
//         case 'Random':
//             return new RandomHandler();
//         case 'Reversed':
//             return new ReversedHandler();
//         default :
//             return new Handler();
//     }
// };


// class Point {
//     x: number;
//     y: number;
//
//     constructor(x: number, y: number) {
//         this.x = x;
//         this.y = y;
//     }
//
//     addCoords():number {
//         return this.x + this.y
//     }
// }


// class Foo {
//     public x: number;
//     private y: number;
//     protected z: number;
// }
//
// let foo = new Foo();
//
// class FoolChild extends Foo {
//     constructor() {
//         super();
//     }
// }

// class Singleton {
//     private static instance: Singleton;
//
//     private constructor() {
//
//     }
//
//     public static getInstance(){
//         if (!Singleton.instance) {
//             Singleton.instance = new Singleton();
//         }
//         return Singleton.instance;
//     }
// }

//let e = new Singleton()

//let v = Singleton.getInstance();

// abstract class Base{
//     abstract name:string;
//     abstract getName():string;
// }
//
// interface A{
//     x:number;
// }
// interface B{
//  y:number
// }
//
//
// class Foo extends Base implements A,B{
//     x:number;
//     y:number;
//     name:string;
//     getName(){
//         return this.name;
//     }
// }

// interface StockItem {
//     getPrice(): number;
// }
//
// interface Item {
//     price: number;
// }
//
// class Stock implements StockItem {
//     private _price: number;
//
//     constructor(private _stockItem: Item){}
//
//     public getPrice(): number {
//         return this._price;
//     }
//
//     public get stockItem() {
//         return this._stockItem;
//     }
//
//     public set stockItem(item: Item) {
//         this._stockItem = item;
//     }
// }
//
// let item = new Stock({price:22});
// console.log(item.stockItem)
//
// item.stockItem = {price:33};







// interface B{}
//
// let bar = B;

// let foo = 123;
//
// let bar:typeof foo;

// function a (){}
//
// let b:a;

// class A{}
// let a:A;

// let myVar:number = 123;
//
// let a:number;
//
// a=12;


//let a:number = 2;


// let a:number;
//
// a = 1;
// a =1.006;
// a = 0xf00d;
// a = 0b1010;
// a = 0o744;

//function foo() {}; let bar:typeof foo;

//let a: number = parseInt('2',10)
//
// let a: string;
// let c: number;
// let b: boolean;


// let b:any;
// b =1;
// b='asd'
// b=true;
// b={a:1}

//let b:void = undefined;

// let acc :{name:string,id?:number}
//
// acc = {name:'Igor', id:1}

// const a:{readonly id:number} = {id:1}
// a.id = 2;

// let names: string[];
//
// names = ['Igor','2']

// let tuple:[string,number];
// tuple = [1,2,false]

//let a: new ()=>number;

//let a:{():number}

// a = ()=>{
//     return 1
// }

// class A {
//     a :string;
//     b: number;
// }
//
// let a = new A();
//
// a.a

// interface ListItem{
//     getHead():this;
//     getTail():this;
// }

// function f(this:void){
//     this.a;
// }

// interface UIElement{
//     addClick(onclick:(this:void,e:Event)=>void):void
// }
//
// class Handler {
//     info:string;
//     onClick(this:void,e:Event){
//         //this.info = 'msg'
//     }
// }
// let h = new Handler();
// let uIElement:UIElement;
// uIElement.addClick(h.onClick)


//type g = {x?:g}
//var g:{x:typeof g};

//let a:g = {x:{x:{}}}

// type account = {id:number, name:string};
//
// function a (v:account){}
// let acc: account;
//
// interface Mover {
//     move(): void;
//     getStatus(): {speed: number};
// }
//
// interface Shaker {
//     shake(): void;
//     getStatus(): {frequency: number};
// }
//
// interface MoverShaker extends Mover,Shaker {
//     getStatus(): {speed: number,frequency: number};
// }
//
// let car: MoverShaker = {
//     move: () => {
//     },
//     shake: () => {
//     },
//     getStatus:() => {
//         return {speed: 1,frequency: 2}
//     }
// }

// let base1:IBase={id:1,female:false}
//
// interface IBase{
//     id:number;
// }
//
//
// interface IBase{
//     name?:string;
// }
//
// let base2:IBase={id:1,name:'Vanya',female:false}
//
// interface IBase{
//     female:boolean;
// }

// let animate: 'off' | 'online' | 'busy';
// animate = 'my status'


// interface A<T extends {id:number;name:string}>{
//     a:T;
// }
//
// let b:A<{id:number;name:string,female:true}>

// interface A{
//     a:string;
//     b:number;
// }
// interface B{
//     a:number;
//     b:number;
//     c:number
// }
//
// let x:A|B;
// let a = x.a;
// let b = x.b;
// let c = x.c;
// b =1;

// function n(a){
//     if(a){
//         interface I {
//             x:number;
//         }
//         let v:I;
//         v.x = 2;
//     }else{
//         interface I {
//             x:string;
//         }
//         let v:I;
//         v.x = 'hi';
//     }
// }


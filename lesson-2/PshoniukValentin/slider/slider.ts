/**
 * Created by helmer on 13.10.2016.
 */
declare interface ObjectConstructor {
    assign(...objects: Object[]): Object;
}


type SliderConfig = {
    min?: number,
    max?: number,
    step?: number,
    value?: number
    fillColor?: string,
};


interface ISlider{
    getValue():number;
    setValue(val: number):void;
}


class Slider implements ISlider{
    protected rootEl: HTMLElement;
    protected handleEl: HTMLElement;
    protected params: SliderConfig;
    protected onChangeValue: Function;
    protected activeHandlers: {
        handler: Function,
        type: string
    }[];

    static defaults: SliderConfig = {
        min: 0,
        max: 100,
        step: 1,
        value: 50,
        fillColor: "#16a085"
    };

    static vendorPrefixes: string[] = [
        "-moz-linear-gradient",
        "-webkit-linear-gradient",
        "-o-linear-gradient",
        "-ms-linear-gradient",
        "linear-gradient",
    ];

    public constructor(el, config:SliderConfig = {}, onChangeValue?: Function){
        this.params = Object.assign({}, Slider.defaults, config);
        this.rootEl = el;
        this.handleEl = el.querySelector(".handle");
        this.onChangeValue = onChangeValue;
        this.activeHandlers = [];

        this.handleEl.addEventListener("mousedown", this.startDrag.bind(this), false);
        this.rootEl.addEventListener("click", this.draggable.bind(this), false);

        this.renderState();
        if(typeof this.onChangeValue === "function"){
            this.onChangeValue.call(this, this.getValue());
        }
    }

    public getValue():number{
        return this.params.value;
    }

    public setValue(val: number):void{
        this.params.value = val = Math.max(Math.min(val, this.params.max), this.params.min);
        this.renderState();
        if(typeof this.onChangeValue === "function"){
            this.onChangeValue.call(this, val);
        }
    }

    protected renderState():void{
        let val = this.getValue(),
            fillColor: string = this.params.fillColor,
            valueRange: number = Math.abs(this.params.max - this.params.min),
            percentPos: number = 100 * Math.abs(val - this.params.min)/valueRange,
            handleWidth: number = this.handleEl.offsetWidth,
            fillBg = `(left, ${fillColor} 0%, ${fillColor} ${percentPos}%, rgba(0,0,0,0) ${percentPos}%)`;

        this.handleEl.style.left = `calc(${percentPos}% - ${handleWidth / 2}px)`;
        for(let prefix of Slider.vendorPrefixes){
            this.rootEl.style.backgroundImage = prefix + fillBg;
        }
    }

    protected startDrag():void{
        let draggable: Function;
        let endDrag: Function;

        window.addEventListener("mousemove", draggable = this.draggable.bind(this), false);
        window.addEventListener("mouseup", endDrag = this.endDrag.bind(this), false);

        this.activeHandlers.push({
            handler: draggable,
            type: "mousemove"
        }, {
            handler: endDrag,
            type: "mouseup"
        });
    }

    protected endDrag():void{
        for(let item of this.activeHandlers){
            window.removeEventListener(item.type, <EventListener>item.handler);
        }
    }

    protected draggable(e:MouseEvent):void{
        let sliderWidth: number = this.rootEl.offsetWidth,
            sliderPos: number = this.rootEl.getBoundingClientRect().left,
            mousePos: number =  e.pageX,
            vp: number = Math.abs(this.params.max - this.params.min) / sliderWidth,
            val: number = Math.round(vp * Math.min(Math.max(mousePos - sliderPos, 0), sliderWidth) / this.params.step) + this.params.min;

        this.setValue(val);
    }
}


let sliderEl: HTMLElement = <HTMLElement>document.querySelector(".range");
let presentEl: HTMLElement = <HTMLElement>document.querySelector(".present");
let slider = new Slider(sliderEl, {
    value: 20,
    min: -50
}, (val: number) => {
    presentEl.innerHTML = "" + val;
});
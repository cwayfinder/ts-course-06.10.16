class Slider {
    //Вопрос - можно ли определить тип(алиас), который будет доступен только внутри класса?
    //т.е. определить его как-то также как свойства ниже
    //для метода getCoords это было бы полезно
    private sliderElem: HTMLElement;
    private thumbElem: HTMLElement;

    public constructor(options: {sliderElem: HTMLElement}) {
        this.sliderElem = options.sliderElem;
        this.thumbElem = this.sliderElem.querySelector(".thumb") as HTMLElement;

        this.sliderElem.onmousedown = (event: MouseEvent) => {
            //Почему TS подсвечивает closest и contains? Что с этим делать?
            if (event.target.closest(".thumb") && this.sliderElem.contains(event.target)) {
                this.processMouseDown(event);
            }

        };

    }

    private processMouseDown(event: MouseEvent) {
        let thumbCoords: {top: number, left: number} = this.getCoords(this.thumbElem);
        let shiftX: number = event.pageX - thumbCoords.left;

        let sliderCoords: {top: number, left: number} = this.getCoords(this.sliderElem);

        document.onmousemove = (event) => {
            let newLeft: number = event.pageX - shiftX - sliderCoords.left;

            if (newLeft < 0) {
                newLeft = 0;
            }

            let rightEdge: number = this.sliderElem.offsetWidth - this.thumbElem.offsetWidth;
            if (newLeft > rightEdge) {
                newLeft = rightEdge;
            }

            this.thumbElem.style.left = `${newLeft}px`;
        }

        document.onmouseup = () => {
            //Вопрос в TS используется тип null или обычно как-то по другому делают?
            document.onmousemove = document.onmouseup = null;
        }

        return false;
    }

    private getCoords(elem: HTMLElement): {top: number, left: number} {
        let box = elem.getBoundingClientRect();

        return {
            top: box.top + pageYOffset,
            left: box.left + pageXOffset
        };
    }
}

let slider:Slider = new Slider({
    sliderElem: document.getElementById("slider")
});
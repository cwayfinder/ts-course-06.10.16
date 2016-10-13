const sliderElem: HTMLElement = <HTMLElement>document.getElementById('slider');
const thumbElem: HTMLElement = <HTMLElement>sliderElem.children[0];

thumbElem.addEventListener('mousedown', (e: MouseEvent) => {
    e.preventDefault();

    const shiftX: number = e.pageX - thumbElem.getBoundingClientRect().left + pageXOffset;

    function onMouseMove(e: MouseEvent): void {
        let newLeft: number = e.pageX - shiftX - sliderElem.getBoundingClientRect().left + pageXOffset;
        if (newLeft < 0) {
            newLeft = 0;
        }

        const rightEdge: number = sliderElem.offsetWidth - thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        thumbElem.style.left = newLeft + 'px';
    }

    function onMouseUp(): void {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

thumbElem.addEventListener('dragstart', () => false);

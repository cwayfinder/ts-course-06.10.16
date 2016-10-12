type menuList1 ={title: string,link?: string,items?: menuList}[]
type menuOpt = {element: HTMLElement,menuList: menuList1}
let menuList: menuList1 = [
    {
        title: 'Животные',
        items: [
            {
                title: 'Млекопитающие',
                items: [
                    {title: 'Коровы'},
                    {title: 'Ослы'},
                    {title: 'Собаки'},
                    {title: 'Тигры'}
                ]
            },
            {
                title: 'Другие',
                items: [
                    {title: 'Змеи'},
                    {title: 'Птицы'},
                    {title: 'Ящерицы'},
                ],
            }
        ]
    },
    {
        title: 'Рыбы',
        items: [
            {
                title: 'Аквариумные',
                items: [
                    {title: 'Гуппи'},
                    {title: 'Скалярии'}
                ]
            },
            {
                title: 'Форель',
                items: [
                    {title: 'Морская форель'}
                ]
            }
        ]
    }
];


class Menu1 {
    protected element: HTMLElement;
    protected menuList: menuList1;

    public constructor(opt: menuOpt) {
        this.element = opt.element;
        this.menuList = opt.menuList;
        this.element.innerHTML = this.generateMenu(this.menuList)
        this.element.addEventListener('click', this.clickHandler)
    }

    protected clickHandler(ev: MouseEvent): void {
        let el = <HTMLElement>ev.target;
        let classList= el.classList;
        if(classList.contains('title')){
            let parentLi=<HTMLLIElement>el.parentNode;
            parentLi.classList.toggle('menu-open')
        }
    }

    protected generateMenu(menuList: menuList1): string {
        let z: string = `<ul>`;
        for (let a of menuList) {
            z += `<li><a ${a.items ? 'class=title' : ''} ${a.link ? 'href=' + a.link :
                ''}>${a.title}</a>`
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += `${this.generateMenu(a.items)}</li>`
        }
        return `${z}</ul>`
    }
}

let element = <HTMLElement>document.querySelector('.menu');
let navMenu = new Menu1({element,menuList});

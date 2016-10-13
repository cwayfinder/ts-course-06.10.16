type menuItem = {id: string, title: string, items?: menuList};
type menuList = menuItem[];


class MenuList {
    constructor(readonly elem: HTMLElement, readonly data: menuList) {
        elem.innerHTML = this.generateMenu(data);

        elem.onclick = (event: MouseEvent) => {
            const el = event.target as HTMLAnchorElement;
            if (el.classList.contains("title")) {
                const parentLi = el.parentNode as HTMLLIElement;
                parentLi.classList.toggle("menu-open");
            }
        };
    }

    private generateMenu(list: menuList): string {
        const innerHtml = list.map((item: menuItem) =>
            `<li id="${item.id}">
                <a href="#" class="title">${item.title}</a>
                ${item.items ? this.generateMenu(item.items) : ''}
             </li>`
        ).join('');

        return `<ul>${innerHtml}</ul>`;
    }

    getElem() : HTMLElement {
        return this.elem;
    }

    toggle(id: string): void {
        const el: HTMLElement = this.elem.querySelector(`#${id}`) as HTMLElement;
        el.classList.toggle("menu-open");
    }

    close(id: string): void {
        const el: HTMLElement = this.elem.querySelector(`#${id}`) as HTMLElement;
        el.classList.remove("menu-open");
    }

    open(id: string): void {
        const el: HTMLElement = this.elem.querySelector(`#${id}`) as HTMLElement;
        el.classList.add("menu-open");
    }
}


const data: menuList = [
    {
        id: 'a',
        title: 'Животные',
        items: [
            {
                id: 'aa',
                title: 'Млекопитающие',
                items: [
                    { id: 'aaa', title: 'Коровы' },
                    { id: 'aab', title: 'Ослы' },
                    { id: 'aac', title: 'Собаки' },
                    { id: 'aad', title: 'Тигры' }
                ]
            },
            {
                id: 'ab',
                title: 'Другие',
                items: [
                    { id: 'aba', title: 'Змеи' },
                    { id: 'abb', title: 'Птицы' },
                    { id: 'abc', title: 'Ящерицы' },
                ],
            },
        ]
    },
    {
        id: 'b',
        title: 'Рыбы',
        items: [
            {
                id: 'ba',
                title: 'Аквариумные',
                items: [
                    { id: 'baa', title: 'Гуппи' },
                    { id: 'bab', title: 'Скалярии' }
                ]
            },
            {
                id: 'bb',
                title: 'Форель',
                items: [{ id: 'bba', title: 'Морская форель' }]
            },
        ]
    }
];


const menu = new MenuList(<HTMLElement>document.querySelector(".menu"), data);


const $input: HTMLInputElement = <HTMLInputElement>document.querySelector(`input`);
const selectedId: string = $input.value;

document.querySelector(`#toggleButton`).addEventListener('click', () => menu.toggle(selectedId));
document.querySelector(`#openButton`).addEventListener('click', () => menu.open(selectedId));
document.querySelector(`#closeleButton`).addEventListener('click', () => menu.close(selectedId));

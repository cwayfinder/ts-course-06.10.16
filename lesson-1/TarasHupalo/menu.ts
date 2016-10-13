type menuItem = {title: string, items?: menuList};
type menuList = menuItem[];

const menuList: menuList = [
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
            },
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
                items: [{title: 'Морская форель'}]
            },
        ]
    }
];


function generateMenu(list: menuList): string {
    const innerHtml = list.map((item: menuItem) =>
        `<li>
            <a href="#" class="title">${item.title}</a>
            ${item.items ? generateMenu(item.items) : ''}
         </li>`
    ).join('');

    return `<ul>${innerHtml}</ul>`;
}


let navMenuList: HTMLDivElement = document.querySelector(".menu") as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (event: MouseEvent) => {
    const el = event.target as HTMLAnchorElement;
    if (el.classList.contains("title")) {
        const parentLi = el.parentNode as HTMLLIElement;
        parentLi.classList.toggle("menu-open");
    }
};


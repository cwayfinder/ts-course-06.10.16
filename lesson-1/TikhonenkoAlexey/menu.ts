type menuList = {title: string, items?: menuList}[];

let menuList: menuList = [
    {
        title: "JavaScript",
        items: [
            {title: "React"},
            {title: "Angular"}
        ]
    },
    {
        title: "Dart",
        items: [
            {title: "Angular"},
            {title: "Polymer"}
        ]
    }
];

menuList = [{title: "1", items: [{title: "3"}]}, {title: "2"}];

menuList = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки'},
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы'},
            {title: 'Ящерицы'},
        ],
        },
    ]
    },
    {
        title: 'Рыбы', items: [
        {
            title: 'Аквариумные', items: [
            {title: 'Гуппи'},
            {title: 'Скалярии'}
        ]
        },
        {
            title: 'Форель', items: [
            {title: 'Морская форель'}
        ]
        },
    ]
    }
];


function generateMenu(list: menuList): string {
    let html: string = "<ul>";

    for (let a of list) {
        html += "<li>";
        html += `<a href="#" class="title">${a.title}</a>`;

        if (a.items) {
            html += generateMenu(a.items);
        }

        html += "</li>";
    }


    html += "</ul>";

    return html;
}

let navMenuList: HTMLDivElement = document.querySelector(".menu") as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (event: MouseEvent) => {
    let el = event.target as HTMLAnchorElement;
    let classList = el.classList;
    if (classList.contains("title")) {
        let parentLi = el.parentNode as HTMLLIElement;
        parentLi.classList.toggle("menu-open");
    }
};


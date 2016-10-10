type menuList = {title: string, items?: menuList}[];

let menuList: menuList = [
    {
        title: 'Животные', items: [
        {
            title: 'Млекопитающие', items: [
            {title: 'Коровы'},
            {title: 'Ослы'},
            {title: 'Собаки', items: [
                {title: 'Домашние', items: [
                    {title: 'Породистые'},
                    {title: 'Дворняги'}
                ]},
                {title: 'Дикие'}
            ]},
            {title: 'Тигры'}
        ]
        },
        {
            title: 'Другие', items: [
            {title: 'Змеи'},
            {title: 'Птицы', items: [
                {title: 'Летающие'},
                {title: 'Нелетающие'}
            ]},
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
    let z: string = `<ul>`;
    for (let a of list) {
        if(a.items) {
            z += `<li><a class="title">${a.title}</a>`;
            z += `${generateMenu(a.items)}`;
        } else {
            z += `<li><a>${a.title}</a>`;
        }
        z += `</li>`;
    }
    z += `</ul>`;
    return z;
}

let navMenuList:HTMLDivElement = document.querySelector('.menu') as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuList);
navMenuList.onclick = (ev:MouseEvent) =>{
    let el = ev.target as HTMLAnchorElement;
    let classList = el.classList;
    if(classList.contains('title')){
       let parentLi =el.parentNode as HTMLLIElement;
       parentLi.classList.toggle('menu-open');
    }
};
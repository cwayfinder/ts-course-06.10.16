type menuList = {title: string,items?: menuList}[];

let menuData: menuList = [
    {
        title: "Животные", items: [
        {
            title: "Млекопитающие", items: [
            {title: "Коровы"},
            {title: "Ослы"},
            {title: "Собаки"},
            {title: "Тигры"}
        ]
        },
        {
            title: "Другие", items: [
            {title: "Змеи"},
            {title: "Птицы"},
            {title: "Ящерицы"},
        ],
        },
    ]
    },
    {
        title: "Рыбы", items: [
        {
            title: "Аквариумные", items: [
            {title: "Гуппи"},
            {title: "Скалярии"}
        ]
        },
        {
            title: "Форель", items: [
            {title: "Морская форель"}
        ]
        },
    ]
    }
];


function generateMenu(list: menuList): string {
    let root: string = "<ul>";

    for (let a of list) {
        root += `<li>
            <a ${ a.items ? "class='title'" : ''}>${ a.title }</a>
            ${ a.items ? generateMenu(a.items) : "" }
            </li>
        `;
    }

    root += "</ul>";
    return root;
}


let navMenuList:HTMLDivElement = document.querySelector(".menu") as HTMLDivElement;
navMenuList.innerHTML = generateMenu(menuData);


navMenuList.onclick = (ev:MouseEvent) =>{
    let el = ev.target as HTMLAnchorElement;
    let classList = el.classList;
    if(classList.contains("title")){
       let parentLi =el.parentNode as HTMLLIElement;
       parentLi.classList.toggle("menu-open");
    }
};
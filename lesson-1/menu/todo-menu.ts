type menuList = {title: string,items: string[]}[];

let menuList: menuList = [
    {title: 'JavaScript', items: ['React', 'Angular2', 'Cycle.js']},
    {title: 'Dart', items: ['Angular2', 'Polymer']}
];

function generateMenu(list: menuList): string {
    let z: string = `<ul>`;
    for (let a of list) {
        z += `<li><a class="title">${a.title}</a><ul>`
        for (let item of a.items) {
            z += `<li><a>${item}</a></li>`
        }
        z += `</li></ul>`
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
}
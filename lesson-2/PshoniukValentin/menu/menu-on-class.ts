type menuList ={title: string,link?: string,items?: menuList}[]
type menuOpt = {element: HTMLElement,menuList: menuList}
let menuList: menuList = [
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


interface IMenu{
    getElem(): HTMLElement;
    toggle(label: string): this;
    close(label: string): this;
    open(label: string): this;
}


class Menu implements IMenu{
    protected element: HTMLElement;
    protected menuList: menuList;

    public constructor(opt: menuOpt) {
        this.element = opt.element;
        this.menuList = opt.menuList;
        this.element.innerHTML = this.generateMenu(this.menuList);
        this.element.addEventListener('click', this.clickHandler);
    }

    public getElem(){
        return this.element;
    }

    public toggle(label: string):this{
        if(this.isOpen(label)){
            this.close(label);
        }else{
            this.open(label);
        }
        return this;
    }

    public close(label: string):this{
        let el: HTMLElement = this.getElem(),
            item: HTMLElement = el.querySelector(`[data-label='${label}']`) as HTMLElement;

        if(item){
            while ((item = item.parentElement as HTMLElement) && item !== el){
                if(item.tagName == "LI" && item.classList.contains("parent")){
                    item.classList.remove("menu-open");
                }
            }
        }
        return this;
    }

    public open(label: string):this{
        let el: HTMLElement = this.getElem(),
            item: HTMLElement = el.querySelector(`[data-label='${label}']`) as HTMLElement;

        if(item){
            while ((item = item.parentElement as HTMLElement) && item !== el){
                if(item.tagName == "LI" && item.classList.contains("parent")){
                    item.classList.add("menu-open");
                }
            }
        }
        return this;
    }


    protected isOpen(label): boolean {
        let el: HTMLElement = this.getElem(),
            item: HTMLElement = el.querySelector(`[data-label='${label}']`) as HTMLElement;

        if(item){
            while ((item = item.parentElement as HTMLElement) && item !== el){
                if(item.tagName == "LI" && item.classList.contains("parent") && !item.classList.contains("menu-open")){
                    return false;
                }
            }
        }

        return true;
    }

    protected clickHandler(ev: MouseEvent): void {
        let el = <HTMLElement>ev.target;
        let classList= el.classList;
        if(classList.contains('title')){
            let parentLi=<HTMLLIElement>el.parentNode;
            parentLi.classList.toggle('menu-open')
        }
    }

    protected generateMenu(menuList: menuList): string {
        let z: string = `<ul>`;
        for (let a of menuList) {
            z += `<li <a ${a.items ? 'class=parent' : ''}><a ${a.items ? 'class=title' : ''} 
                    ${a.link ? 'href=' + a.link : ''} data-label='${a.title}'>${a.title}</a>`
            if (!a.items) {
                z += `</li>`;
                continue;
            }
            z += `${this.generateMenu(a.items)}</li>`
        }
        return `${z}</ul>`
    }
}



class ItemsList{
    protected _menuElement:HTMLElement;
    protected _element:HTMLSelectElement;

    public constructor(element:HTMLSelectElement, menuElement: HTMLElement){
        this._menuElement = menuElement;
        this._element = element;
        this.render();
    }

    protected getItems(): string[]{
        let elems: NodeList = this._menuElement.querySelectorAll("[data-label]") as NodeList,
            items: string[]= [];

        for(let i = 0, l = elems.length; i < l; i++){
            let dataLabel = elems[i].attributes.getNamedItem("data-label");
            if(dataLabel){
                items.push(dataLabel.value);
            }
        }

        return items;
    }

    protected render():void{
        let content: string = this.getItems().reverse().join("</option><option>");
        this._element.innerHTML = `<option>${content}</option>`;
    }
}



class Actions{
    protected _itemsListElm: HTMLSelectElement;
    protected _actionElems: NodeList;
    protected _itemsList: ItemsList;
    protected _navMenu: Menu;

    public constructor(rootElement: HTMLElement, navMenu: Menu){
        this._navMenu = navMenu;
        this._itemsListElm = rootElement.querySelector(".items-list") as HTMLSelectElement;
        this._actionElems = rootElement.querySelectorAll("[data-action]") as NodeList;
        this._itemsList = new ItemsList(this._itemsListElm, navMenu.getElem());

        for(let i = 0, l = this._actionElems.length; i < l; i++){
            this._actionElems[i].addEventListener("click", this.clickHandler.bind(this), false);
        }
    }

    protected clickHandler(e: MouseEvent){
        let el: HTMLElement = e.currentTarget as HTMLElement,
            actionAttr: Attr = el.attributes.getNamedItem("data-action"),
            action: string = actionAttr && actionAttr.value;

        if(action){
            this._navMenu[action](this._itemsListElm.value);
        }
    }
}



let element = <HTMLElement>document.querySelector('.menu');
let actionsElm = <HTMLElement>document.querySelector(".actions");
let navMenu = new Menu({element,menuList});
let navActions = new Actions(actionsElm, navMenu);



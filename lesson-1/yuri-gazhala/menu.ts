//// Start: =Menu ////

type menuItems = {
    title: string,
    cssClassList?: string[],
    link?: string,
    items?: menuItems
}[];

type menuOptions = {
    elementHtml: HTMLDivElement, // root element for the menu
    elementCssClass?: string, // the main class
    elementCssClassList?: string[], // additional classes
    menuTitle: string,
    menuTitleCssClass?: string,
    pageMask?: any, // optional object of PageMask constructor
    data: menuItems
};

function Menu(options:menuOptions):void {

    this.options = options;
    this._elem = null; // lazy creation is used, so default value is null

    this.getElement = ():HTMLDivElement => {
        this._render();

        return this._elem;
    };

    this.toggleMenu = ():void => {
        // Lazy creation of menu items.
        // If menu opens at the first time - render menu items
        if (!this._elem.querySelector('ul')) {
            this._renderItems(this.options.data);
        }

        let body:HTMLBodyElement = document.querySelector('body');
        let menuTitle:HTMLBodyElement = this._elem.querySelector('.' + this.options.menuTitleCssClass + ' *'); // content of menu title
        let menuTitleWrapper:HTMLBodyElement = this._elem.querySelector('.' + this.options.menuTitleCssClass);

        this._elem.classList.toggle('open');
        body.classList.toggle('menuEnabled'); // it needs for style of body.menuEnabled class
        menuTitle.classList.toggle('open');
        menuTitleWrapper.classList.toggle('open');

        // Open/close pageMask.
        // Check whether pageMask component exists and if it is in the document
        if (this.options.pageMask && document.querySelector('.'+ this.options.pageMask.elementCssClass)) {
            this.options.pageMask.toggle();
        }
    };

    // This method render the root element of menu.
    // It also sets CSS classes and event handlers for it.
    this._render = ():void => {
        // set the root element for the menu
        this._elem = this.options.elementHtml as HTMLDivElement;

        // add the main CSS class
        this._elem.classList.add(this.options.elementCssClass);

        // add additional CSS classes
        let cssClassList:string[] = this.options.elementCssClassList;

        if (cssClassList && cssClassList.length !== 0) {
            for (let i = 0; i < cssClassList.length; i++) {
                this._elem.classList.add(cssClassList[i]);
            }
        }

        // render menu title element
        let title:HTMLSpanElement = document.createElement('span');
        title.className = this.options.menuTitleCssClass;
        title.innerHTML = this.options.menuTitle;
        this._elem.appendChild(title);


        // add event handlers for mobile devices
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this._elem.addEventListener('touchstart', this._onMenuAction);

            // when menu is opened, close it by clicking outside the menu
            document.addEventListener('touchstart', this._closeMenu);

        } else { // for desktop

            // to prevent selecting text inside a title
            this._elem.addEventListener('mousedown', (e):void => { e.preventDefault() });

            this._elem.addEventListener('click', this._onMenuAction);

            // activate CSS hover
            this._elem.classList.add('desktop');

            document.addEventListener('click', this._closeMenu);
        }
    };

    this._renderItems = (data:menuItems):HTMLElement => {
        // if there are no data, recursive _renderItems() would not work
        if (!data || data.length === 0) {
            return;
        }

        let list:HTMLUListElement = document.createElement('ul');
        type menuItem = {
            title: string,
            cssClassList?: string[],
            link?: string,
            items?: menuItems
        }

        data.forEach( (obj:menuItem) => {
            let li:HTMLLIElement = document.createElement('li');
            let a:HTMLAnchorElement = document.createElement('a');
            let cssClassList:string[] = obj.cssClassList;
            let title:HTMLDivElement; // it needs for subcategory

            if (cssClassList && cssClassList.length !== 0) {
                for (let i = 0; i < cssClassList.length; i++) {
                    li.classList.add(cssClassList[i]);
                }
            }

            if (obj.link) {
                a.setAttribute('href', obj.link);
                a.innerHTML = obj.title;
                li.appendChild(a);
            } else {
                // make subcategory title
                title = document.createElement('div');
                title.innerHTML = obj.title;
                li.appendChild(title);
            }

            let childrenUl:undefined|HTMLElement = this._renderItems(obj.items); // returns undefined or new list

            if (childrenUl) {
                li.appendChild(childrenUl);
            }

            list.appendChild(li);

        });

        return this._elem.appendChild(list);
    };

    // this method determines on which element the event has happened,
    // and calls toggle method on it.
    this._onMenuAction = (event:MouseEvent|TouchEvent):void => {
        let target = event.target as HTMLAnchorElement|HTMLDivElement|HTMLLIElement;

        // open/close the menu by clicking on the menu title
        if (target.closest('.'+ this.options.menuTitleCssClass)) {
            this.toggleMenu();
        }

        // open/close menu items
        if (target.closest('li')) {

            // determine if LI element has children
            if (target.childNodes.length) {

                // The event may happen on "A", "DIV" or "LI" element.
                // In any case we need toggle a "LI" element.
                if (target.nodeName === 'A' || target.nodeName === 'DIV') {
                    target.closest('li').classList.toggle('open');
                } else {
                    // Toogle a "LI" element
                    target.classList.toggle('open');
                }
            }
        }
    };

    this._closeMenu = (event:MouseEvent|TouchEvent):void => {
        if (!this._elem.classList.contains('open')) {

            return;
        }

        let target = event.target as HTMLDivElement;

        // If a user clicks on the invisible menu container
        // or outside the menu - close the menu.
        if (target.classList.contains(this.options.elementCssClass)
            || !target.closest('.' + this.options.elementCssClass)) {

            this.toggleMenu();
        }
    }
}
//// End: =Menu ////

//// Start: =PageMask ////

type pageMaskOptions = {
    elementCssClass: string
}
function PageMask(options:pageMaskOptions) {

    this.options = options;
    this.elementCssClass = null;
    this._elem = null;


    this.getElement = ():HTMLDivElement => {
        this._render();

        return this._elem;
    };

    this.toggle = ():void => {
        if (!this._elem) {
            this._render();
        }

        this._elem.classList.toggle('open');
    };

    this._render =():void => {
        this._elem = document.createElement('div');
        this._elem.className = this.options.elementCssClass;
        this.elementCssClass = this.options.elementCssClass;
    }
}
//// End: =PageMask ////

// Initialize pageMask component and add it to the document
let pageMaskOptions:pageMaskOptions = {elementCssClass: 'pageMask'};
let pageMask = new PageMask(pageMaskOptions);
document.body.insertBefore(pageMask.getElement(), document.querySelector('#menu'));

// Initialize menu component
let menuOptions:menuOptions = {
    elementHtml: document.querySelector('#menu') as HTMLDivElement, // root element for the menu
    elementCssClass: 'menu', // the main class

    menuTitle: '<img src="./images/menu-icon.png" alt="menu">', // or '<p>Some text</p>'
    menuTitleCssClass: 'menu__title',

    pageMask: pageMask, // helper component

    // data for menu tree
    data: [
        {
            title: "Животные",
            cssClassList: ['hasChildren'],
            items: [
                {
                    title: "Млекопитающие",
                    cssClassList: ['hasChildren'],
                    items: [
                        {
                            title: "Коровы",
                            link: "#"
                        },{
                            title: "Ослы",
                            link: "#"
                        },{
                            title: "Собаки",
                            link: "#"
                        },{
                            title: "Собаки",
                            link: "#"
                        },{
                            title: "Тигры",
                            link: "#"
                        }

                    ]
                }
            ]
        },

        {
            title: "Другие",
            cssClassList: ['hasChildren'],
            items: [
                {
                    title: "Змеи",
                    link: "#"
                },{
                    title: "Птицы",
                    link: "#"
                },{
                    title: "Ящерицы",
                    link: "#"
                }
            ]
        },

        {
            title: "Рыбы",
            cssClassList: ['hasChildren'],
            items: [
                {
                    title: "Аквариумные",
                    cssClassList: ['hasChildren'],
                    items: [
                        {
                            title: "Скалярии",
                            link: "#"
                        },{
                            title: "Гупии",
                            link: "#"
                        }
                    ]
                },{
                    title: "Форель",
                    cssClassList: ['hasChildren'],
                    items: [
                        {
                            title: "Морская форель",
                            link: "#"
                        }
                    ]
                }
            ]
        }
    ]
};

let menu = new Menu(menuOptions);
menu.getElement();


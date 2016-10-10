type MenuItem = {title:string, items?:MenuItem[]};

const menuData:MenuItem[] = [
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

class MainMenu {
    container:HTMLMenuElement;
    data:MenuItem[];

    constructor(container:HTMLMenuElement, data:MenuItem[]) {
        this.container = container;
        this.data = data;

        this.container.innerHTML = this.makeMenu(this.data);
        this.handleClick();
    }

    handleClick() {
        let titles:NodeList = this.container.querySelectorAll('.title');

        for (let i = 0, len = titles.length; i < len; i++) {
            titles[i].addEventListener('click', this.toggleList);
        }
    }

    makeMenu(menu) {
      let part:string = ``;

      for (let item of menu) {
        part += `<ul><li><a class="title">${item.title}</a>`;

        if (item.items) {
          part += this.makeMenu(item.items);
          part += `</li>`;
        }

        part += `</ul>`;
      }

      return part;
    }

    toggleList(evnt:MouseEvent) {
        let el = evnt.target as HTMLAnchorElement;

        el.classList.contains('title') && el.classList.toggle('opened');
    }
};

const container:HTMLMenuElement = document.getElementsByTagName('menu')[0];
let menu = new MainMenu(container, menuData);

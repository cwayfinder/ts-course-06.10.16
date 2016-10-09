//// Start: =Menu ////
function Menu(options) {
    var _this = this;
    this.options = options;
    this._elem = null; // lazy creation is used, so default value is null
    this.getElement = function () {
        _this._render();
        return _this._elem;
    };
    this.toggleMenu = function () {
        // Lazy creation of menu items.
        // If menu opens at the first time - render menu items
        if (!_this._elem.querySelector('ul')) {
            _this._renderItems(_this.options.data);
        }
        var body = document.querySelector('body');
        var menuTitle = _this._elem.querySelector('.' + _this.options.menuTitleCssClass + ' *'); // content of menu title
        var menuTitleWrapper = _this._elem.querySelector('.' + _this.options.menuTitleCssClass);
        _this._elem.classList.toggle('open');
        body.classList.toggle('menuEnabled'); // it needs for style of body.menuEnabled class
        menuTitle.classList.toggle('open');
        menuTitleWrapper.classList.toggle('open');
        // Open/close pageMask.
        // Check whether pageMask component exists and if it is in the document
        if (_this.options.pageMask && document.querySelector('.' + _this.options.pageMask.elementCssClass)) {
            _this.options.pageMask.toggle();
        }
    };
    // This method render the root element of menu.
    // It also sets CSS classes and event handlers for it.
    this._render = function () {
        // set the root element for the menu
        _this._elem = _this.options.elementHtml;
        // add the main CSS class
        _this._elem.classList.add(_this.options.elementCssClass);
        // add additional CSS classes
        var cssClassList = _this.options.elementCssClassList;
        if (cssClassList && cssClassList.length !== 0) {
            for (var i = 0; i < cssClassList.length; i++) {
                _this._elem.classList.add(cssClassList[i]);
            }
        }
        // render menu title element
        var title = document.createElement('span');
        title.className = _this.options.menuTitleCssClass;
        title.innerHTML = _this.options.menuTitle;
        _this._elem.appendChild(title);
        // add event handlers for mobile devices
        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            _this._elem.addEventListener('touchstart', _this._onMenuAction);
            // when menu is opened, close it by clicking outside the menu
            document.addEventListener('touchstart', _this._closeMenu);
        }
        else {
            // to prevent selecting text inside a title
            _this._elem.addEventListener('mousedown', function (e) { e.preventDefault(); });
            _this._elem.addEventListener('click', _this._onMenuAction);
            // activate CSS hover
            _this._elem.classList.add('desktop');
            document.addEventListener('click', _this._closeMenu);
        }
    };
    this._renderItems = function (data) {
        // if there are no data, recursive _renderItems() would not work
        if (!data || data.length === 0) {
            return;
        }
        var list = document.createElement('ul');
        data.forEach(function (obj) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            var cssClassList = obj.cssClassList;
            var title; // it needs for subcategory
            if (cssClassList && cssClassList.length !== 0) {
                for (var i = 0; i < cssClassList.length; i++) {
                    li.classList.add(cssClassList[i]);
                }
            }
            if (obj.link) {
                a.setAttribute('href', obj.link);
                a.innerHTML = obj.title;
                li.appendChild(a);
            }
            else {
                // make subcategory title
                title = document.createElement('div');
                title.innerHTML = obj.title;
                li.appendChild(title);
            }
            var childrenUl = _this._renderItems(obj.items); // returns undefined or new list
            if (childrenUl) {
                li.appendChild(childrenUl);
            }
            list.appendChild(li);
        });
        return _this._elem.appendChild(list);
    };
    // this method determines on which element the event has happened,
    // and calls toggle method on it.
    this._onMenuAction = function (event) {
        var target = event.target;
        // open/close the menu by clicking on the menu title
        if (target.closest('.' + _this.options.menuTitleCssClass)) {
            _this.toggleMenu();
        }
        // open/close menu items
        if (target.closest('li')) {
            // determine if LI element has children
            if (target.childNodes.length) {
                // The event may happen on "A", "DIV" or "LI" element.
                // In any case we need toggle a "LI" element.
                if (target.nodeName === 'A' || target.nodeName === 'DIV') {
                    target.closest('li').classList.toggle('open');
                }
                else {
                    // Toogle a "LI" element
                    target.classList.toggle('open');
                }
            }
        }
    };
    this._closeMenu = function (event) {
        if (!_this._elem.classList.contains('open')) {
            return;
        }
        var target = event.target;
        // If a user clicks on the invisible menu container
        // or outside the menu - close the menu.
        if (target.classList.contains(_this.options.elementCssClass)
            || !target.closest('.' + _this.options.elementCssClass)) {
            _this.toggleMenu();
        }
    };
}
function PageMask(options) {
    var _this = this;
    this.options = options;
    this.elementCssClass = null;
    this._elem = null;
    this.getElement = function () {
        _this._render();
        return _this._elem;
    };
    this.toggle = function () {
        if (!_this._elem) {
            _this._render();
        }
        _this._elem.classList.toggle('open');
    };
    this._render = function () {
        _this._elem = document.createElement('div');
        _this._elem.className = _this.options.elementCssClass;
        _this.elementCssClass = _this.options.elementCssClass;
    };
}
//// End: =PageMask ////
// Initialize pageMask component and add it to the document
var pageMaskOptions = { elementCssClass: 'pageMask' };
var pageMask = new PageMask(pageMaskOptions);
document.body.insertBefore(pageMask.getElement(), document.querySelector('#menu'));
// Initialize menu component
var menuOptions = {
    elementHtml: document.querySelector('#menu'),
    elementCssClass: 'menu',
    menuTitle: '<img src="./images/menu-icon.png" alt="menu">',
    menuTitleCssClass: 'menu__title',
    pageMask: pageMask,
    // data for menu tree
    data: [
        {
            title: "��������",
            cssClassList: ['hasChildren'],
            items: [
                {
                    title: "�������������",
                    cssClassList: ['hasChildren'],
                    items: [
                        {
                            title: "������",
                            link: "#"
                        }, {
                            title: "����",
                            link: "#"
                        }, {
                            title: "������",
                            link: "#"
                        }, {
                            title: "������",
                            link: "#"
                        }, {
                            title: "�����",
                            link: "#"
                        }
                    ]
                }
            ]
        },
        {
            title: "������",
            cssClassList: ['hasChildren'],
            items: [
                {
                    title: "����",
                    link: "#"
                }, {
                    title: "�����",
                    link: "#"
                }, {
                    title: "�������",
                    link: "#"
                }
            ]
        },
        {
            title: "����",
            cssClassList: ['hasChildren'],
            items: [
                {
                    title: "�����������",
                    cssClassList: ['hasChildren'],
                    items: [
                        {
                            title: "��������",
                            link: "#"
                        }, {
                            title: "�����",
                            link: "#"
                        }
                    ]
                }, {
                    title: "������",
                    cssClassList: ['hasChildren'],
                    items: [
                        {
                            title: "������� ������",
                            link: "#"
                        }
                    ]
                }
            ]
        }
    ]
};
var menu = new Menu(menuOptions);
menu.getElement();
//# sourceMappingURL=menu.js.map
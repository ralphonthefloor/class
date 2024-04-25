class ViewElement extends HTMLElement {

    constructor(name, container, color, width, height, top, left) {
        super();
        this.name = name;
        this.color = color;
        this.height = height;
        this.width = width;
        this.top = top;
        this.left = left;
        this.element = document.createElement('div');
        this.element.id = this.name;
        this.element.style.backgroundColor = this.color;
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        this.element.style.padding = '0';
        this.element.style.margin = '0';
        this.element.style.border = '5px';
        this.element.style.borderStyle = 'solid';
        this.element.style.boxSizing = 'border-box';
        this.element.style.position = 'absolute';
        this.element.style.top = this.top;
        this.element.style.left = this.left;
        container.append(this.element);
    }

    explain() {
        console.log(this);
    }

    pop() {
        this.content = document.createTextNode(this.name);
        this.element.appendChild(this.content);
    }

    getContentArea() {
        const computedStyle = getComputedStyle(this.element);

        let elementHeight = this.element.clientHeight;  // height with padding
        let elementWidth = this.element.clientWidth;   // width with padding

        elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
        elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);

        console.log('Height of', this.name, elementHeight);
        console.log('Width of', this.name, elementWidth);

        return { height: elementHeight, width: elementWidth }
    }

}

customElements.define('view-element', ViewElement);

const topbar = new ViewElement('topbar', document.body, 'red', '100%', '20%', '0px', '0px');
const sidebar = new ViewElement('sidebar', document.body, 'blue', '20%', '80%', '20%', '80%');
const main = new ViewElement('main', document.body, 'yellow', '80%', '80%', '20%', '0%');

function touches(el1, el2) {
    var rect1 = el1.getBoundingClientRect();
    var rect2 = el2.getBoundingClientRect();

    console.log('main', rect1);
    console.log('topbar', rect2);

    const touches = rect1.right == rect2.left ||
        rect1.top == rect2.bottom ||
        rect1.left == rect2.right ||
        rect1.bottom == rect2.top;

    return touches;
}

topbar.pop();
sidebar.pop();
main.pop();
main.getContentArea();
console.log(touches(document.getElementById('main'), document.getElementById('topbar')));
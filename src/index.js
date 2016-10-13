'use strict';

class PureSlider {
  constructor(props = {}) {

    const defaultOptions = {
      itemSelector: '.item',
      rootElement: 'slider',
      maxItems: 4,
      step: 1,
      goLeftClass: 'left',
      goRightClass: 'right',
      plateClass: 'plate'
    };

    const options = {};
    Object.assign(options, defaultOptions, props);
    this.options = options;
    this.state = {
      offset: 0,
      width: 0,
      maxPage: 0,
      itemsCount: this.getItems().length
    };

    this.createPlate();
    this.setItemsWidth();
    this.setHeight();
    this.initEvents();
  }

  createPlate() {
    const plate = document.createElement('div');
    const { rootElement, itemSelector } = this.options;
    plate.className = 'plate';
    plate.style.position = 'absolute';
    plate.style.top = 0;
    plate.style.left = 0;
    plate.style.width = '10000%';
    let items = this.getItems();
    for (let i = 0; i < items.length; ++i) {
      plate.appendChild(items[i]);
    }
    rootElement.appendChild(plate);
  }

  getPlate() {
    const { rootElement: root, plateClass } = this.options;
    return root.querySelector('.'+plateClass);
  }

  getItems() {
    const { rootElement, itemSelector } = this.options;
    return rootElement.querySelectorAll(itemSelector);
  }

  setHeight() {
    const { rootElement: root } = this.options;
    const items = this.getItems();
    let height = 0;
    for(let i = 0; i < items.length; i++) {
      height = items[i].offsetHeight > height ? items[i].offsetHeight : height;
    }
    root.style.height = `${height}px`;
  }

  setItemsWidth() {
    const { maxItems, rootElement } = this.options;
    const width = rootElement.offsetWidth / maxItems;
    this.state.width = width;
    const items = this.getItems();
    for(let i = 0; i < items.length; i++) {
      items[i].style.width = `${width}px`;
    }
  }

  initEvents() {
    const { rootElement: root, goLeftClass, goRightClass } = this.options;
    const goLeft  = root.querySelector('.' + goLeftClass);
    const goRight = root.querySelector('.' + goRightClass);

    goLeft.addEventListener('click', () => this.goLeft());
    goRight.addEventListener('click', () => this.goRight());
  }

  goLeft() {
    const plate = this.getPlate();
    const { offset, width } = this.state;

    this.state.offset = offset === 0 ? 0 : offset+1;
    plate.style.left = (this.state.offset*width)+'px';
  }

  goRight() {
    const plate = this.getPlate();
    const { offset, itemsCount, width } = this.state;
    const { maxItems } = this.options;

    this.state.offset = offset*-1 < itemsCount - maxItems ? offset-1 : offset;
    plate.style.left = (this.state.offset*width)+'px';
  }

}

export default PureSlider;

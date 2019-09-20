import BaseComponent from './BaseComponent';

class CircleImageTrigger extends BaseComponent {
  constructor(componentName, autoInit){
    super(componentName);
    this.started = false;
  }


  init(component) {
    const element = component.element;

    this.addCustomEvents(element);
  }

  addCustomEvents(element) {
    const firstElement = element.getElementsByClassName('first')[0];
    const secondElement = element.getElementsByClassName('second')[0];
    const thirdElement = element.getElementsByClassName('third')[0];
    const listItems = [secondElement, firstElement, thirdElement];

    window.addEventListener('scroll', (e) => {
      if(!this.started) {
        if(app.scroller.checkVisible(element, 300)) {
          for (let i=0; i<listItems.length; i++) {
            this.started = true;
            setTimeout(() => {
              listItems[i].classList.add('active');
            }, 900 * i);
          }
        }
      }
    });
  }
}

export default CircleImageTrigger;

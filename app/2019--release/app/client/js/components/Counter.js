import BaseComponent from './BaseComponent';
import CountUp from 'countup.js/dist/countUp.js';

class Counter extends BaseComponent {
  constructor(componentName){
    super(componentName);
    this.className = componentName;

    this.startVal = 0;
    this.decimals = 0;
    this.duration = 2;
    this.options = {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      prefix: '',
      suffix: '%',
      decimals: 0,
      duration: 2,
    };
  }

  init(component) {
    const endVal = parseInt(component.element.getAttribute('data-value'));
    component.counter = new CountUp(component.element, this.startVal, endVal, this.decimals, this.duration, this.options);
    component.started = false;
    // component.counter.start();

    window.addEventListener('scroll', (e) => {
      if(!component.started) {
        if(app.scroller.checkVisible(component.element, 300)) {
          component.counter.start();
          component.started = true;
        }
      }
    });

  }
}

export default Counter;

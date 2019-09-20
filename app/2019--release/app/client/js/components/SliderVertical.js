import BaseComponent from './BaseComponent';
import Swiper        from 'swiper';
import { throttle }  from 'lodash';

class SliderFeatured extends BaseComponent {
  constructor(componentName, autoInit = true){
    super(componentName);

    this.options = {
      wrapperClass: 'slides-list',
      slideClass: 'slide',
      slidesPerView: 1,  // Default slides per view
      spaceBetween: 0,
      direction: 'vertical',
      // mousewheelControl: true,
      pagination: {
        el: '.slider__navigation-wrapper',
        clickable: true,
      },
    };

    this.classElement = `.${componentName}`;
    autoInit ? this.autoInit() : '';
  }


  init(component) {}


  autoInit() {
    this.slider = new Swiper(this.classElement, this.options);
  }

  update() {
    this.slider = new Swiper(this.classElement, this.options);
  }

}

export default SliderFeatured;

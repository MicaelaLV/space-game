import BaseComponent from './BaseComponent';
import Swiper        from 'swiper';
import { throttle }  from 'lodash';

class SliderFeatured extends BaseComponent {
  constructor(componentName, autoInit = true){
    super(componentName);

    this.options = {
      wrapperClass: 'slides-list',
      slideClass: 'slide',
      slidesPerView: 'auto',  // Default slides per view
      spaceBetween: 20,
      loop: true,
      loopedSlides: 10,
      autoplay: {
        delay: 2000,
      },
      speed: 1400,
      on: {
        init: function () {
          // console.log('swiper initialized');
        },
      }
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

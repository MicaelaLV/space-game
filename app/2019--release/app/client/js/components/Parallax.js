import BaseComponent from './BaseComponent';
// import Rellax from 'rellax';
import { jarallax, jarallaxElement, jarallaxVideo } from 'jarallax';

class Parallax extends BaseComponent {
  constructor(componentName) {
    super(componentName);

    this.options  = {
      // center: true,
      // horizontal: false,
      // vertical: true,
      // wrapper: '.parallax-wrapper'
    };

    this.className = `.${componentName}`;

    jarallaxElement();
    jarallax(document.querySelectorAll('.jarallax'), { speed: 0.2 });
  }


  init(component) {
    // component.parallax = new Rellax(this.className, this.options);
    // component.parallax = new Rellax(this.className, this.options);
  }
}

export default Parallax;

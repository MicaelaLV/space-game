import 'fullpage.js/vendors/scrolloverflow';
import fullPage       from 'fullpage.js';

class Fullpage {
  constructor() {
    this.elementId = '#fullpage';
    this.options = {
      loopTop: false,
      loopBottom: false,
      css3: true,
      autoScrolling: false,
      fitToSection: false,
      scrollBar: false,
      // fixedElements: '.navbar-wrapper',
      normalScrollElementTouchThreshold: 3,
      touchSensitivity: 3,
      // offsetSections: true,
      responsiveWidth: 768,
      scrollHorizontally: false,
      scrollOverflow: true, // allows scrolling inside longer sections
      scrollOverflowReset: false
    }

    if(!app.device.mobileOrTablet) {
      this.options.afterLoad = function (origin, destination, direction) {
        let loadedSection = this;
        fullpage_api.reBuild();
      };
    }
    this.init();
  }

  init() {
    this.element = new fullPage(this.elementId, this.options);
  }
}

export default Fullpage
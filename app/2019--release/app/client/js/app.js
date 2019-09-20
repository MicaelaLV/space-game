import 'babel-polyfill'; // Webpack needs
import '../scss/application.scss';

// /////////////////// HELPERS ///////////////////////////
// ///////////////////////////////////////////////////////
// import Device           from './helpers/Device';
import States from './helpers/StatesMachine';
import Parser from './helpers/Parser';
// import Scroller         from './helpers/Scroller';
// import HandyFunctions from './helpers/HandyFunctions';

// ////////////////// COMPONENTS ////////////////////////
// ///////////////////////////////////////////////////////
// import ButtonScrollTo         from './components/ButtonScrollTo';
// import CircleImageTrigger     from './components/CircleImageTrigger';
// import Counter                from './components/Counter';
// import Form                   from './components/Form';
// import InputEmail             from './components/InputEmail';
// import InputSelect            from './components/InputSelect';
// import ModalTrigger           from './components/ModalTrigger';
// import Parallax               from './components/Parallax';
// import RandomImage            from './components/RandomImage';
// import SliderFeatured         from './components/SliderFeatured';
// import SliderVertical         from './components/SliderVertical';

// import AccordionTrigger       from './components/AccordionTrigger';
// import Countdown              from './components/Countdown';
// import Dropdown               from './components/Dropdown';
// import Navbar                 from './components/Navbar';
// import RandomQuote            from './components/RandomQuote';
// import Video                  from './components/Video';
// import Custom                    from './components/Custom';
// import CustomMobile              from './components/CustomMobile';

// /////////////////// CONSTRUCTOR ///////////////////////
// ///////////////////////////////////////////////////////
class Project {
  constructor() {
    // this.device     = new Device();
    this.states = new States();
    this.parser = new Parser();
    this.components = {};
  }
}

// //////////////////// PAGE LOAD ////////////////////////
// ///////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
  window.app = new Project();
  // app.scroller = new Scroller();

  // //////////////// ADDING COMPONENTS ////////////////////
  // //////////////////////////////////////////////////////
  // app.components.buttonScrollTo     = new ButtonScrollTo('cmp-btn-scroll-to');
  // app.components.form               = new Form('cmp-form');
  // app.components.circleImageTrigger = new CircleImageTrigger('cmp-circle-image-trigger');
  // app.components.counter            = new Counter('cmp-counter');
  // app.components.inputEmail         = new InputEmail('cmp-input-email');
  // app.components.inputSelect        = new InputSelect('cmp-input-select');
  // app.components.modalTrigger       = new ModalTrigger('cmp-modal-trigger');
  // app.components.randomImage        = new RandomImage('cmp-random-image');
  // app.components.parallax           = new Parallax('cmp-parallax');
  // app.components.sliderFeatured     = new SliderFeatured('cmp-slider-featured');
  // app.components.sliderVertical     = new SliderVertical('cmp-slider-vertical');

  // app.components.accordionTrigger   = new AccordionTrigger('cmp-accordion-trigger');
  // app.components.countdown          = new Countdown('cmp-countdown');
  // app.components.dropdown           = new Dropdown('cmp-dropdown');
  // app.components.navbar             = new Navbar();
  // app.components.randomQuote        = new RandomQuote('cmp-random-quote');
  // app.components.video              = new Video('cmp-video');
  // app.components.custom                = new Custom('cmp-custom');
  // app.components.customMobile          = new CustomMobile('cmp-custom-mobile');

  //           Fade in page content        \\
  // ______________________________________//
  const { body } = document;

  window.setTimeout(() => {
    body.classList.add('loaded');
  }, 200);

  // Disable scrolling.
  document.ontouchmove = function(e) {
    e.preventDefault();
  };
});

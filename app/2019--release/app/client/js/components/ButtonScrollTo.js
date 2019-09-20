import BaseComponent from './BaseComponent';

class ButtonScrollTo extends BaseComponent {
  constructor(componentName, autoInit){
    super(componentName);
  }


  init(component) {
    this.addCustomEvents(component.element);
  }


  addCustomEvents(element) {
    const target = document.getElementById(element.getAttribute('data-target'));

    if(!!target) {
      element.addEventListener('click', (e) => {
        window.scrollTo({top: target.offsetTop, behavior: 'smooth'});
      });
    }
  }
}

export default ButtonScrollTo;

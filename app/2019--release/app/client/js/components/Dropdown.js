import BaseComponent from './BaseComponent';

class Dropdown extends BaseComponent {
  constructor(componentName){
    super(componentName);
    this.className = componentName;
  }

  init(component) {
    this.addCustomEvents(component);
  }

  addCustomEvents(component) {
    const element        = component.element;
    const navbar         = document.getElementsByClassName('navbar')[0];
    const navbarWrapper  = document.getElementsByClassName('navbar-wrapper')[0];
    const dropdown       = document.getElementsByClassName('dropdown-list-wrapper')[0];
    const links          = document.getElementsByClassName(this.className);
    const backLayer      = document.getElementsByClassName('back-layer--menu')[0];
    const dataListTarget = element.nextElementSibling;

    element.addEventListener('mouseover', (e) => {
      if(!!navbarWrapper)   navbarWrapper.classList.add('dropdown-being-shown');
      if(!!dropdown)        dropdown.classList.add('is-visible');
      if(!!backLayer)       backLayer.classList.add('is-active');


      // Close the already opened dropdowns (just content) if any
      // bg is controlled by navbarWrapper

      if(!dataListTarget.classList.contains('being-hovered')) {
        const dropdownLists   = navbarWrapper.getElementsByClassName('dropdown-list-wrapper');
        for (let list of dropdownLists) {
          list.classList.remove('is-visible');
        }

        // Make visible the right one
        dataListTarget.classList.add('is-visible');
        // this.updateActiveOption(element, dataListTarget, dropdownLists);

        // Remove other hovers
        for(let link of links) {
          link.classList.remove('being-hovered');
        }

        // Add hover state to the right one
        element.classList.add('being-hovered');
        this.activateTransition(dataListTarget);
      }
    });
  }


  activateTransition(target) {
    const listItems = target.getElementsByTagName('li');

    for (let [index, list] of Array.from(listItems).entries()) {

      setTimeout(() => {
        list.classList.add('slideInRight');
      }, 300 * index);
    }
  }
}

export default Dropdown;

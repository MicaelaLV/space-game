import BaseComponent from './BaseComponent';

class AccordionTrigger extends BaseComponent {
  constructor(componentName){
    super(componentName);
  }


  init(component) {
    this.addCustomEvents(component);
  }


  addCustomEvents(component) {
    component.element.addEventListener('click', (e) => {
      e.preventDefault();

      // console.log('Element', component.element);
      this.toggleComponent(component, component.element);

    });


    window.addEventListener('resize', _.throttle((e) => {
      if(component.element.classList.contains('opened')) {
        const contents = this.getAccordionContent(component.element);
        this.watchResize(contents);
      }
    }, 500));
  }


  toggleComponent(component, element, collapse = undefined) {
    const keepOpen       = element.getAttribute('data-keep-open') == 'true' ? true : false;
    const customOverflow = element.getAttribute('data-custom-overflow') == 'true' ? true : false;

    // if the component needs a min height when is collapsed
    // {to show a content preview} then set this attr up in the HTML !!!!
    const dataMinHeight = parseInt(element.getAttribute('data-min-height'));

    requestAnimationFrame(() => {
      const contents = this.getAccordionContent(element);
      this.toggleAccordionContent(contents, collapse, keepOpen, dataMinHeight, customOverflow);
      this.toggleSymbol(element, keepOpen);
      this.toggleGradient(element);
      this.toggleTriggerMessage(element);
      this.hideElement(element);
    });

    this.toggleState(element);
  }


  toggleState(element, keepOpen) {
    if(!keepOpen) element.classList.toggle('opened');
    const input = element.getElementsByTagName('input')[0];

    if(!!input) {
      input.checked = input.checked ? false : true;
    }
  }


  getAccordionContent(element) {
    // Trigger Button data-target
    const targetId        = element.getAttribute('data-target');
    const contentWrappers = document.getElementsByClassName('accordion__content-wrapper');
    let contentsTarget    = [];

    for(let content of contentWrappers) {
      // Content wrapper data-accordion-id
      const contentId = content.getAttribute('data-accordion-id');
      // console.log(`targetId ${targetId} == contentId ${contentId}`);
      // Check match
      if(targetId === contentId) contentsTarget.push(content);
    }

    return contentsTarget;
  }


  toggleAccordionContent(targets, collapse, keepOpen, collapsedHeight, customOverflow) {


    if(targets.length > 0) {
      for (let target of targets) {
        if (!!target) {
          if(customOverflow) {
            const sectionWrapper = document.getElementsByClassName('details-content')[0];
            if (!!sectionWrapper) sectionWrapper.classList.toggle('collapsed');
          } else {
            target.classList.toggle('visible');
            // Default logic
            if (target.classList.contains('visible')) {
              target.style.height = target.scrollHeight + 'px';
            } else {
              // change if you want the collapsed height of the target to be set differently than 0
              target.style.height = !!collapsedHeight ? collapsedHeight + 'px': 0;
            }
          }
        }
      }
    }
  }


  lockContent(element, disabled) {
    const contents = this.getAccordionContent(element);
    for (let content of contents) {
      disabled ? content.classList.add('disabled') : content.classList.remove('disabled');
    }
  }


  watchResize(targets) {
    if(targets.length > 0) {
      for (let target of targets) {
        if (!!target) {
          if (target.classList.contains('visible')) {
            const content = target.getElementsByClassName('accordion__content')[0];
            target.style.height = !!content ? content.scrollHeight + 'px' : target.scrollHeight + 'px';
          } else {
            target.style.height = 0;
          }
        }
      }
    }
  }


  toggleSymbol(element) {
    const symbol = element.getElementsByClassName('symbol')[0];
    if(!!symbol) symbol.classList.toggle('expanded');
  }


  toggleGradient(element) {
    const gradientWrapper  = document.getElementsByClassName('gradient-wrapper')[0];
    if(!!gradientWrapper) gradientWrapper.classList.toggle('hide');
  }

  toggleTriggerMessage(element) {
    const buttonTriggerText = element.getElementsByClassName('text--override')[0];


    if(!!buttonTriggerText) {
      const buttonTriggerTextContent = buttonTriggerText.textContent;
      buttonTriggerText.textContent = buttonTriggerTextContent == 'Ver más' ? 'Ver menos' : 'Ver más';
    }
  }


  hideElement(element) {
    const hideElement = document.getElementsByClassName('hide-element')[0];
    // console.log(hideElement);
    if (!!hideElement) hideElement.classList.toggle('hidden');
  }
}

export default AccordionTrigger;

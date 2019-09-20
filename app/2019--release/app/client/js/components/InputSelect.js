import BaseComponent from './BaseComponent';
import Choices from 'choices.js';

class InputSelect extends BaseComponent {
  constructor(componentName, autoInit){
    super(componentName);  // Params passed to BaseComponent

    this.options = {
      placeholder: false,
      placeholderValue: null,
      searchPlaceholderValue: null,
      addItemText: false,
      classNames: {
        containerOuter: 'input--select-wrapper',
        containerInner: 'input--select',
        input         : 'input--select--fake',
        inputCloned   : 'input--select__input--cloned',
        list          : 'input--select__list',
        listItems     : 'input--select__list--multiple',
        listSingle    : 'input--select__list--single',
        listDropdown  : 'input--select__list--dropdown',
        item          : 'input--select__item',
        itemSelectable: 'input--select__item--selectable',
        itemDisabled  : 'input--select__item--disabled',
        itemChoice    : 'input--select__item--choice',
        placeholder   : 'input--select__placeholder',
        group         : 'input--select__group',
        groupHeading  : 'input--select__heading',
        button        : 'input--select__button'
      },
      choices: [
        {value: 'India'},
        {value: 'Singapore'},
        {value: 'Serbia'},
        {value: 'Ukraine'},
        {value: 'Seattle'},
        {value: 'Indonesia'}
      ]
    };

    this.componentName = componentName;
  }


  // <input type='select' class='cmp-input-select input-select--data' data-data-target-id='55'>
  // <input type='select' class='cmp-input-select input-select--data' data-data-id='55'>
  init(component) {
    const selectBlock     = component.element;
    const selectInput     = component.element.getElementsByClassName('input--select--fake')[0];
    const dataId        = component.element.getAttribute('data-id');
    const selectedValue   = component.element.getAttribute('data-selected');

    if(!!dataId) {
      const dependantBlock  = document.querySelector(`.${this.componentName}[data-data-target-id='${dataId}']`);
      const dependantInput  = dependantBlock.getElementsByClassName('input--select--fake')[0];

      // Initial Check/Get data datas
      if(dependantInput.value) {
        const url  = this.getUrl(dependantInput.value);

        this.getOptions(url).then((response) => {
          this.addOptions(component, response, !!selectedValue ? selectedValue : undefined);
          if(!!selectInput) {
            component.selectChoices = new Choices(selectInput, this.options);
            this.addCustomEvents(component.element, selectInput);
          }
          this.addWatcher(component, dependantInput);
        });
      }

    } else {
      if(!!selectInput) {
        if (selectInput.classList.contains('no-search')) {
          this.options.searchEnabled = false;
        }
        component.selectChoices = new Choices(selectInput, this.options);
        this.options.searchEnabled = true;
        this.addCustomEvents(component.element, selectInput);
      }
    }
  }


  getUrl(dataValue) {
    const lang = document.getElementsByTagName('html')[0].getAttribute('lang');
    return `/${lang}/datas/${dataValue}`;
  }


  getOptions(url) {
    return new Promise((resolve, reject) => {
      app.ajax.get(url, (response) => {
        app.parser.parseJSON(response, (parsedResponse) => {
          resolve(parsedResponse);
        });
      });
    });
  }


  addOptions(component, options, selectedValue = undefined) {
    const selectInput = component.element.getElementsByClassName('input--select--fake')[0];
    if(!component.selectChoices) {
      for(let option of options) {

        // TODO: REMOVE existing options in pure vanilla before add new ones
        const value   = option[1];
        const title   = option[0];
        const optionTag     = document.createElement('option');
        optionTag.value     = value;
        optionTag.innerHTML = title;

        if (value == selectedValue) optionTag.setAttribute('selected', true);

        // Appending each option to the select
        selectInput.appendChild(optionTag);
      }
    } else {

      let choices = [];

      for(let [index, option] of options.entries()) {
        const value   = option[1];
        const title   = option[0];

        if(index == 0) {
          choices.push({value: value, label: title, selected: true})
        } else {
          choices.push({value: value, label: title});
        }
      }

      if(choices.length > 1) {
        component.selectChoices.setChoices(choices, 'value', 'label', true);
      }
    }
  }


  removeOptions() {}


  addWatcher(component, dependantInput) {
    const selectInput = component.element.getElementsByClassName('input--select--fake')[0];

    dependantInput.addEventListener('change', () => {
      const url = this.getUrl(dependantInput.value);

      this.getOptions(url).then((response) => {
        this.addOptions(component, response);
      });
    });
  }


  addCustomEvents(element, selectInput) {
    if(!!selectInput) {
      selectInput.addEventListener('showDropdown', () => {
        element.classList.add('is-focused');
      });

      selectInput.addEventListener('hideDropdown', () => {
        element.classList.remove('is-focused');
      });
    }
  }
}


export default InputSelect;

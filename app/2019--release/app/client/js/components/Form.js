import BaseComponent from './BaseComponent';
// import Rails         from 'rails-ujs';

class Form extends BaseComponent {
  constructor(componentName, autoInit){
    super(componentName);
  }


  init(component) {
    this.addCustomEvents(component);
  }


  addCustomEvents(component) {
    if(!component.element.classList.contains('no-watch')) {
      this.watchAllFields(component);
    }
  }


  submitData (input, justWhenChecked = false, removeRemote = false) {
    const formId = input.getAttribute('data-form-id');
    const form   = document.querySelector(`.form[data-id='${formId}']`);

    if(!!form) {
      if(!justWhenChecked || (justWhenChecked && input.checked)) {

        if(removeRemote) {
          form.removeAttribute('data-remote');
        }
        
        // AJAX POST
        // Rails.fire(form, 'submit');
      }
    }
  }

  submitDataOfForm (form, removeRemote = false) {
    if(!!form) {
      if(removeRemote) {
        form.removeAttribute('data-remote');
      }
      // AJAX POST
      // Rails.fire(form, 'submit');
    }
  }


  watchAllFields(component) {
    // const inputs = document.getElementsByTagName('input')
    component.requiredFields = [];
    component.optionalFields = [];
    const inputs    = component.element.querySelectorAll('input:not([type=hidden]):not(.hidden)');
    const textareas = component.element.querySelectorAll('textarea:not([type=hidden]):not(.hidden)');
    const selects   = component.element.querySelectorAll('select:not([type=hidden]):not(.hidden)');

    this.storeField(component, inputs, true);
    this.storeField(component, textareas);
    this.storeField(component, selects);
  }


  storeField(component, fields, checkIfPattern = false) {
    for (let field of fields) {

      const required = field.getAttribute('required') == 'true' ? true : false;

      if(!!required){
        component.requiredFields.push(field);
      } else {
        component.optionalFields.push(field);
      }

      // Initial Field Check
      this.updateFieldState(component, field, required, checkIfPattern, true);

      field.addEventListener('keyup', () => {
        this.updateFieldState(component, field, required);
        this.updateFormState(component);
      });

      field.addEventListener('blur', () => {
        this.updateFieldState(component, field, required);
        this.updateFormState(component);
      });

      field.addEventListener('focus', () => {
        this.updateFieldState(component, field, required);
        this.updateFormState(component);
      });

      field.addEventListener('change', () => {
        this.updateFieldState(component, field, required);
        this.updateFormState(component);
      });
    }

    // Focus the first required element if there is one
    setTimeout(() => {
      const firstRequiredField = component.requiredFields[0];
      if (!!firstRequiredField) firstRequiredField.focus();
    }, 500);

    // Initial form check
    setTimeout(() => {
      this.updateFormState(component);
    }, 1000);

  }

  updateFieldState(component, field, required = false, checkIfPattern = false, initialCheck = false) {
    if(required && field.value.length > 0) {
      field.setAttribute('data-valid', field.checkValidity());

    } else if (required && field.value.length < 1) {
      // TODO MANAGE AUTOCOMPLETE FIELDS ( has value zero by browser bugs)
      field.setAttribute('data-valid', initialCheck ? true : false);

    } else if (!required && field.value.length < 1) {
      field.setAttribute('data-valid', true);


    } else if (!required && field.value.length > 0) {
      field.setAttribute('data-valid', initialCheck ? true : field.checkValidity());

    }
  }


  checkPattern(field) {
    // checkValidity fails for autocompleted inputs
    // so we check it manually
    const pattern = field.getAttribute('pattern');
    const regexp  = !!pattern ? new RegExp(pattern) : null;
    const value   = field.value;
    return (!!regexp && !!value) ? regexp.test(value) : false;
  }


  updateFormState(component) {
    component.valid;
    const requiredFields = this.fieldsAreValid(component.requiredFields);
    const optionalFields = this.fieldsAreValid(component.optionalFields);
    const submitButton   = component.element.querySelector(`button[type='submit']`);

    if (requiredFields && optionalFields) {
      component.element.setAttribute('data-valid', true);
      component.valid = true;
      if(!!submitButton) submitButton.removeAttribute('disabled');
    } else {
      component.element.setAttribute('data-valid', false);
      component.valid = false;
      if(!!submitButton) submitButton.setAttribute('disabled', '');
    }
  }


  fieldsAreValid(fields) {
    if (!!fields) {
      for (let field of fields) {
        if(field.getAttribute('data-valid') != 'true') {
          return false;
        }
      }
      return true;
    }
  }
}

export default Form;

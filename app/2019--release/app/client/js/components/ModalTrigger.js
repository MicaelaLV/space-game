import BaseComponent from './BaseComponent';

class ModalTrigger extends BaseComponent {
  constructor(componentName){
    super(componentName);
  }


  init(component) {
    this.addCustomEvents(component);
  }


  addCustomEvents(component) {
    const element   = component.element;
    const modalName = element.getAttribute('data-modal-target');
    const modals    = document.getElementsByClassName('modal-wrapper');
    let modalTarget;

    for (let modal of modals) {
      if (modalName === modal.getAttribute('data-modal')) {
        modalTarget = modal;
        break;
      }
    }

    if(!!modalTarget, !!element) {

      // Open Modal
      element.addEventListener('click', () => {

        // Before open modal actions
        this.beforeOpenModalActions(element, modalTarget);
        // Open modal
        modalTarget.classList.add('is-active');
        
        // lock scroller
        document.body.classList.add('scroll-locked');
      });

      // Close Modal when button click
      const closeModalButtons = document.getElementsByClassName('close');

      if (!!closeModalButtons) {
        for (let closeModalButton of closeModalButtons) {
          closeModalButton.addEventListener('click', (e) => {
          if(closeModalButton.getAttribute('type') == 'submit') {
              const form = modalTarget.getElementsByClassName('form')[0];
              var input = form.getElementsByClassName('add_to_cart_submit_type')[0];
              input.value = 'button';
              app.components.form.submitDataOfForm(form);
            }
            this.closeModal(modalTarget);
            
            //unlock scroller
            document.body.classList.remove('scroll-locked');
          });
        }
      }

      // Close modal when backlayer is clicked
      const backLayer = modalTarget.getElementsByClassName('back-layer')[0];

      if(!!backLayer) {
        backLayer.addEventListener('click', (e) => {
          this.closeModal(modalTarget);
        });

        backLayer.addEventListener('tap', (e) => {
          this.closeModal(modalTarget);
        });
      }

      // Close modal when user click ESC key
      document.addEventListener('keydown', (e) => {
        if (e.keyCode == 27) {
          this.closeModal(modalTarget);
        }
        return false;
      })

    }
  }


  beforeOpenModalActions(element, modalTarget) {
    // CHECK IF data city is defined if so 
    const iframe = modalTarget.getElementsByTagName('iframe')[0];
    const city = element.getAttribute('data-city');

    if(!!city && !iframe) {
      const modalContentWrapper = modalTarget.getElementsByClassName('content-wrapper')[0];

      function createIframe(modalContentWrapper, city) {

        // Create the html tag as string
        const parser            = new DOMParser;
        const iframeString = `
          <iframe name="resumator-job-frame" id="resumator-job-frame" class="resumator-advanced-widget" src="//lotusflareinc.applytojob.com/apply/jobs/?city=${city}" width="100%" scrolling="yes" height="400" allowtransparency="true" frameborder="0"></iframe>
        `;

        // Parse the string into a real html element
        const iframeElement = app.parser.parseToHTML(iframeString)

        // Append the element into the parent as the last child
        modalContentWrapper.append(iframeElement);
      }
      
      createIframe(modalContentWrapper, city);

    }
  }

  closeModal(modalTarget) {
    if (!modalTarget.classList.contains('is-active')) return;

    modalTarget.classList.remove('is-active');
    
    // unlock scroller
    document.body.classList.remove('scroll-locked');
  }


  openModal(modalTarget) {
    if (modalTarget.classList.contains('is-active')) return;

    modalTarget.classList.add('is-active');
    
    // lock scroller
    document.body.classList.add('scroll-locked');
  }
}


export default ModalTrigger;

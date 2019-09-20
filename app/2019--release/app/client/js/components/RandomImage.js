import BaseComponent from './BaseComponent';


class RandomImage extends BaseComponent {
  constructor(componentName, autoInit){
    super(componentName);
  }


  init(component) {
    this.folder = component.element.getAttribute('data-type') == 'clients' ? 'clients' : 'investors';
    this.addCustomEvents(component.element);
  }


  addCustomEvents(element) {
    const path     = `/app/client/assets/img/${this.folder}/`;
    const length   = this.folder == 'clients' ? 15 : 7;
    const maxLogos = 5;

    const images = [
      {
        path: `${path}logo-1.svg`,
        beingDisplayed: true
      },
      {
        path: `${path}logo-2.svg`,
        beingDisplayed: true
      },
      {
        path: `${path}logo-3.svg`,
        beingDisplayed: true
      },
      {
        path: `${path}logo-4.svg`,
        beingDisplayed: true
      },
      {
        path: `${path}logo-5.svg`,
        beingDisplayed: true
      },
      {
        path: `${path}logo-6.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-7.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-8.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-9.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-10.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-11.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-12.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-13.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-14.svg`,
        beingDisplayed: false
      },
      {
        path: `${path}logo-15.svg`,
        beingDisplayed: false
      }
    ];

    function getRandomArbitrary(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    }

    const logos = element.getElementsByClassName('clients--logo');
    var transition = window.setInterval(animateLogos, 2000);

    function animateLogos() {
      const logo = logos[getRandomArbitrary(0, maxLogos)]
      if(!!logo) {
        logo.classList.add('fade-out');

        setTimeout(() => {
          function newImage() {
            const img = images[getRandomArbitrary(0, length)];
            if(img.beingDisplayed == false) {
              // Changing state of the current one
              const logoName = logo.src.split('/')[logo.src.split('/').length - 1];
              for(let image of images) {
                const imageName = image.path.split('/')[image.path.split('/').length - 1];
                if(imageName == logoName) {
                  image.beingDisplayed = false;
                  break;
                }
              }

              // Adding and displaying the new one
              logo.src = img.path;
              img.beingDisplayed = true;
              logo.classList.remove('fade-out');
            } else {
              newImage();
            }
          }

          newImage();
        }, 400);
      }
    }

  }
}

export default RandomImage;

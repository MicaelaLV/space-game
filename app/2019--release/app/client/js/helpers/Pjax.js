import Barba from 'barba.js';

class Pjax {
  constructor(mobileOrTablet) {
    Barba.Pjax.Dom.wrapperId      = 'pjax-wrapper';
    Barba.Pjax.Dom.containerClass = 'pjax-content';
    this.mobileOrTablet = mobileOrTablet;
    this.counter = 0;
    var self = this;
    this.options = {
      start: function() {
        Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
      },
      fadeOut: function() {
        this.counter++
        var deferred = Barba.Utils.deferred();  // Promise to tell Barba that must to wait until we finish here

        setTimeout(() => {
          this.oldContainer.classList.remove('visible');
          this.oldContainer.classList.add('hidden');
        }, 250);

        window.app.scroller.customScroller ? window.app.scroller.destroyAll() : '';

        setTimeout(() => {
          deferred.resolve();
        }, 550);  // This have to match the opacity transition timing in the _common.scss file + the before timeout

        return deferred.promise;
      },
      fadeIn: function() {
        this.newContainer.classList.add('fade-in');

        this.done();
        window.app.scroller.restart();
        window.app.scroller.scrollToTop();
        self.updateGoogleAnalytics();

        //  Updading Sliders
        app.components.sliderHeader.update();
        app.components.sliderFeatured.update();
        app.components.sliderRecommended.update();
      }
    };
    this.init();
  }


  init() {
    Barba.Pjax.start();
    this.addCustomEvents();
  }


  addCustomEvents(){
    var lastElementClicked;
    var self = this;


    Barba.Dispatcher.on('linkClicked', function(element) {
      var body = document.getElementsByTagName('body')[0];
      var bgcolor = element.getAttribute('data-bgcolor');
      !!bgcolor ? body.style.backgroundColor = bgcolor : '';

      lastElementClicked = element;
    });


    Barba.Dispatcher.on('newPageReady', function(currentStatus, prevStatus, HTMLElementContainer, newPageRawHTML) {
      self.parseWeb(newPageRawHTML);
    });


    // Barba still hasn't a listener for onPopState
    window.onpopstate = () => {
      const body      = document.getElementsByTagName('body')[0];
      const arrowBack = document.getElementsByClassName('navbar-goback-link')[0];
      let color       = arrowBack.getAttribute('data-bgcolor');
      let textColor   = arrowBack.getAttribute('data-txtcolor');
      body.style.backgroundColor = color;
      body.style.color = textColor;
    }

    this.addCustomTransition();
  }


  addCustomTransition() {
    this.customTransition = Barba.BaseTransition.extend(this.options);
    Barba.Pjax.getTransition = () => {
      return this.customTransition;
    }
  }


  parseWeb(rawPage) {
    let parser = new DOMParser();
    this.page = parser.parseFromString(rawPage, 'text/html');
  }


  updateMetaTags() {
    const metaDescription = document.querySelector('meta[name=description]');
    const metaOgTitle     = document.querySelector('meta[property="og:title"]');
    const metaOgUrl       = document.querySelector('meta[property="og:url"]');

    let newMetaDescription = this.page.querySelector('meta[name=description]').getAttribute('content');
    let newMetaOgTitle     = this.page.querySelector('meta[property="og:title"]').getAttribute('content');
    let newMetaOgUrl       = this.page.querySelector('meta[property="og:url"]').getAttribute('content');

    metaDescription.setAttribute('content', newMetaDescription);
    metaOgTitle.setAttribute('content', newMetaOgTitle);
    metaOgUrl.setAttribute('content', newMetaOgUrl);
  }

  updateGoogleAnalytics() {
    // ga('create', 'UA-111338619-1', 'auto');
    // ga('send', 'pageview');
    const title = document.getElementsByTagName('title')[0].textContent;
    // gtag('event', 'page_view', { 'send_to': 'UA-111338619-1' });
    gtag('config', 'UA-111338619-1', {'page_path': window.location.pathname, 'title': title});
  }
}

export default Pjax;

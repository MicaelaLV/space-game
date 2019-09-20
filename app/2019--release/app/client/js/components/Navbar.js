import Headroom from 'headroom.js';

class Navbar {
  constructor() {
    this.element       = document.getElementsByClassName('navbar')[0];
    this.navbarWrapper = document.getElementsByClassName('navbar-wrapper')[0];
    this.menuIcon      = document.getElementById('menu-icon');
    this.menuMobile    = document.getElementsByClassName('mobile-menu-wrapper')[0];
    // this.backLayer     = document.getElementsByClassName('back-layer--menu')[0];
    this.socialWrapper = document.getElementsByClassName('socials-wrapper')[0];

    if (!!this.element) this.logo = this.element.getElementsByClassName('logo-wrapper')[0];

    this.options  = {
      offset : 40,   // vertical offset in px before element is first unpinned
      tolerance: {   // scroll tolerance in px per direction before state changes
        down: 0,
        up  : 0
      },
      classes : {
        initial   : 'navbar--initialized', // when element is initialised
        pinned    : 'navbar--pinned',      // when scrolling up
        unpinned  : 'navbar--unpinned',    // when scrolling down
        top       : 'navbar--top',         // when above offset
        notTop    : 'navbar--not-top',     // when below offset
        bottom    : 'navbar--bottom',      // when at bottom of scoll area
        notBottom : 'navbar--not-bottom'   // when not at bottom of scroll area
      },
      onPin: function() {
        const navbarWrapper = document.getElementsByClassName('navbar-wrapper')[0];
        setTimeout(() => {
          if(window.pageYOffset > 80) navbarWrapper.classList.add('bg-enabled');
        }, 300);
      },
      onUnpin: function() {
        const navbarWrapper = document.getElementsByClassName('navbar-wrapper')[0];
        setTimeout(() => {
          if(window.pageYOffset > 80) navbarWrapper.classList.add('bg-enabled');
        }, 300);
      },
      onTop: function() {
        const navbarWrapper = document.getElementsByClassName('navbar-wrapper')[0];
        navbarWrapper.classList.remove('bg-enabled');
      },
    };
    this.init();
  }


  init() {
    this.headroom = new Headroom(this.element, this.options);
    this.headroom = new Headroom(this.navbarWrapper, this.options);
    this.headroom.init();

    this.addListenerToMenuIcon();
    this.closeSubElementsOnLeave();
  }


  addListenerToMenuIcon() {
    if(!!this.menuIcon) {
      this.menuIcon.addEventListener('click', () => {
        this.toggleMenuState();
      }, false);
    }

    const closeMenu = this.element.getElementsByClassName('btn--close-menu')[0];

    if(!!closeMenu) {
      closeMenu.addEventListener('click', () => {
        this.closeNavbar();
        document.body.classList.remove('scroll-locked');
        console.log('in closing1');
      }, false);
    }

    if(!!this.backLayer) {
      this.backLayer.addEventListener('click', () => {
        this.closeNavbar();
        document.body.classList.remove('scroll-locked');
      }, false);
    }
  }



  closeSubElementsOnLeave(){
    const links          = this.element.getElementsByClassName('main-link');
    const dropdownLists  = this.navbarWrapper.getElementsByClassName('dropdown-list-wrapper');

    // IF USER HOVER SOME LINKS
    for (let link of links) {
      if(!link.classList.contains('dropdown')) {
        link.addEventListener('mouseover', (e) => {
          // closeAll the dropdowns
          for(let dropdown of dropdownLists) {
            const listItems = dropdown.getElementsByTagName('li');
            for(let list of listItems) {
              list.classList.remove('slideInRight');
            }

            dropdown.classList.remove('is-visible');
          }

          this.navbarWrapper.classList.remove('dropdown-being-shown');
          // this.backLayer.classList.remove('is-active');
        });
      }
    }

    // IF USER LEAVE NAVBARWRAPPER
    this.navbarWrapper.addEventListener('mouseleave', (e) => {
      // closeAll the dropdowns
      for(let dropdown of dropdownLists) {
        const listItems = dropdown.getElementsByTagName('li');
        for(let list of listItems) {
          list.classList.remove('slideInRight');
        }

        dropdown.classList.remove('is-visible');
      }

      this.navbarWrapper.classList.remove('dropdown-being-shown');
      // this.backLayer.classList.remove('is-active');

      for (let link of links) {
        link.classList.remove('being-hovered');
      }
    });
  }

  toggleMenuState() {
    this.navbarWrapper.classList.toggle('menu-mobile-being-shown');
    this.menuMobile.classList.toggle('is-active'); 
    this.menuIcon.classList.toggle('is-active');
    setTimeout(() => {
      this.socialWrapper.classList.toggle('hidden');
    }, 400);
    // this.backLayer.classList.toggle('is-active');
    document.body.classList.remove('scroll-locked');
  }

  closeNavbar() {
    this.navbarWrapper.classList.remove('menu-mobile-being-shown');
    this.menuIcon.classList.remove('is-active');
    this.menuMobile.classList.remove('is-active');
    // this.backLayer.classList.remove('is-active');
    document.body.classList.remove('scroll-locked');
  }

  compact(state) {
    if(state) {
      this.element.classList.add('navbar--top')
      this.navbarWrapper.classList.add('navbar--top')

    } else {
      this.element.classList.remove('navbar--top');
      this.navbarWrapper.classList.remove('navbar--top');
    }
  }
}

export default Navbar;

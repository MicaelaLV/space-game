import bowser from 'bowser';

class Device {
  constructor() {
    this.html = document.getElementsByTagName('html')[0];
    this.device;
    this.browser;
    this.os;

    this.init();
  }


  init() {
    this.detectBrowser();
    this.detectDevice();
    this.detectOS();
    console.info(`*******\nBrowser: ${this.browser}\nDevice: ${this.device}\nOS: ${this.os}\n*******`);
  }


  detectBrowser() {
    if      (bowser.chrome)  { this.browser = 'chrome';  }
    else if (bowser.safari)  { this.browser = 'safari';  }
    else if (bowser.firefox) { this.browser = 'firefox'; }
    else if (bowser.silk)    { this.browser = 'silk';    }
    else if (bowser.opera)   { this.browser = 'opera';   }
    else if (bowser.msedge)  { this.browser = 'edge';    }
    else if (bowser.msie)    {
      bowser.version < 11 ? this.browser = 'ie--old' : this.browser = 'ie';
      alert("silversanz.com is optimized to the latest versions of Edge, Chrome, Firefox and Safari. If you're using an older version, please update it.");
    }

    this.html.setAttribute('data-browser', this.browser);
  }


  detectDevice() {
    if      (bowser.mobile && !bowser.msie) { this.device = 'mobile'; }
    else if (bowser.tablet && !bowser.msie) { this.device = 'tablet'; }
    else { this.device = 'desktop'; }

    this.html.setAttribute('data-device', this.device );
  }


  detectOS() {
    switch(this.device) {
      case 'mobile' :
      case 'tablet' :
        this.mobileOrTablet = true;
        if      (bowser.ios)          { this.os = 'ios';          }
        else if (bowser.android)      { this.os = 'android';      }
        else if (bowser.blackberry)   { this.os = 'blackberry';   }
        else if (bowser.windowsphone) { this.os = 'windowsPhone'; }
        break;
      default :
      case 'desktop' :
        this.mobileOrTablet = false;
        if      (bowser.mac)     { this.os = 'mac';     }
        else if (bowser.windows) { this.os = 'windows'; }
        else if (bowser.linux)   { this.os = 'linux';   }
        break;
    }

    this.html.setAttribute('data-os', this.os);
  }
}


export default Device;

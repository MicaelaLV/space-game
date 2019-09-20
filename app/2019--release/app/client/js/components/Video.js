import BaseComponent from './BaseComponent';
import Plyr          from 'plyr';             // https://github.com/sampotts/plyr


class Video extends BaseComponent {
  constructor(componentName, withControls = false) {
    super(componentName);
    this.options = {
      // // debug: true,
      // // controls: [],
      muted: true,
      // // controls: ['large-play', 'play', 'fullscreen', 'airplay', 'current-time', 'pip'],
      // autoplay: true,
      loop: {
        active: true
      }
    };

    if(withControls) {
      this.options.controls = ['large-play', 'play', 'fullscreen', 'airplay', 'current-time', 'pip'];
      this.options.muted    = false;
    }

    this.classElement = `.${componentName}`;
  }


  init(component) {
    component.player = new Plyr(`#${component.id}`, this.options);
    this.addCustomEvents(component);
  }

  addCustomEvents(component) {
    component.element.addEventListener('ready', e => {
      this.autoplayVideo(component);
      this.addListenerToTheSpeaker(component)
    })
  }


  autoplayVideo(video) {
    setTimeout(() => {
      video.player.play();
    }, 300);
  }

  addListenerToTheSpeaker(video) {
    const speaker = document.getElementsByClassName('icon--speaker')[0];
    const mute    = document.getElementsByClassName('mute')[0];
    if(!!speaker) {
      speaker.addEventListener('click', e => {
        video.player.muted = !video.player.muted;
        mute.classList.toggle('hidden');
      });
    }
  }

}

export default Video;

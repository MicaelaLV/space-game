// Idea -> Enhance mouse scroll
export default class Scroller {

  constructor() {
    // Movement variables
    this.direction = 1;
    this.distY = 0;

    // Data control variables
    this.currentPosition = 0;
    this.maxDistY = 700;

    // Animation variable
    this.isRaf = false;
    this.maxTime = 800;
    this.easingFunction = { default: this._easeOutCubic };

    // Dev variables
    this.maxIntervalDeltas = 0;
    this.minInvervalDeltas = 0;
    this.maxDeltaValue = 0;
    this.minDeltaValue = 0;


    switch(app.device.browser) {
      case 'edge':
      case 'ie':
      case 'ie--old':
        this.allowCustomMethod = false;
        break;
      default:
        this.allowCustomMethod = true;
        break;
    }

    if(this.allowCustomMethod) this._init();
  }

  stop () {
    if(this.allowCustomMethod) document.body.removeEventListener('wheel', this._handleWheel);
  }

  addTarget(target) {
    this.target = target;
    this.target.addEventListener('wheel', this._handleWheel, { passive: false });
  }

  removeTarget(target) {
    this.target.removeEventListener('wheel', this._handleWheel, false);
    this.target = null;
  }

  reset () {
    if(this.allowCustomMethod) {
      document.body.addEventListener('wheel', this._handleWheel,  { passive: false });
      this._reset();
    }
  }

  _init() {
    document.body.addEventListener('wheel', this._handleWheel, { passive: false });
  }

  _reset(resetBy) {
    this.distY = 0;
    if (resetBy === 'render') {
      this.isRaf = false;
    }
  }

  _handleWheel = (e) => {
    if (Math.sign(e.deltaY) !== this.direction) {
      this._reset('change direction');
    }

    if (e.deltaY % 1 === 0) {

    } else {
      console.log('wheel');
      e.preventDefault();
      this._updateScroller(e.deltaY);
    }
  }

  _updateScroller(delta) {
    this.direction = Math.sign(delta);
    this.startY = this.target ? this.target.scrollTop : window.scrollY;
    this.distY += this._clampDistY(Math.abs(delta));
    this.timestamp = Date.now();

    this.animationId && cancelAnimationFrame(this.animationId);
    requestAnimationFrame(this._render);

    // if (!this.isRaf) {
    //   this.isRaf = true;
    //   this._render();
    // }
  }

  _clampDistY (value) {
    // we just need to normalize DELTA with the values:
    // const DELTA_MODE = [1.0, 28.0, 500.0];
    return value > 500 ? value / 10 :
      value;
  }

  _render = () => {
    this._calculateNewPosition();

    const target = this.target || window
    target.scrollTo({top: this.currentPosition });

    if (this.intervalTime < this.maxTime / 1000) {
      this.animationId = requestAnimationFrame(this._render);
    } else {
      this._reset('render');
    }
  }

  _calculateNewPosition() {
    this.intervalTime = (Date.now() - this.timestamp) / this.maxTime;
    this.offsetY = this.distY * this.easingFunction.default(Math.min(this.intervalTime, 1)) * this.direction;
    this.currentPosition = this.startY + this.offsetY;
  }

  _easeOutCubic(t) {
    return (t - 1) ** 3 + 1;
  }


    checkVisible(elm, threshold, mode) {
      threshold = threshold || 0;
      mode = mode || 'visible';

      const rect = elm.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      const above = rect.bottom - threshold < 0;
      const below = rect.top - viewHeight + threshold >= 0;

      return mode === 'above' ? above : (mode === 'below' ? below : !above && !below);
    }
}

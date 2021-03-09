// @@include('./libs.js');

const eases = {
    ex: "expo.inOut",
    exI: "expo.in",
    exO: "expo.out",
    p4: "power4.inOut",
    p4I: "power4.in",
    p4O: "power4.out",
    p2: "power2.inOut",
    p2I: "power2.in",
    p2O: "power2.out",
    circ: "circ.inOut",
    circO: "circ.out",
    circI: "circ.in",
}

class showModal {
    constructor(obj) {
        this.$popup = obj.$popup;
        this.$openBtn = obj.$openBtn;
        this.$closeBtn = obj.$closeBtn;
        this.attrParrentNode = obj.attrParrentNode;
        this.status = false;
        this.animationIn = obj.animationIn;
        this.animationOut = obj.animationOut;
        this.onOpenCompleteCallback = obj.onOpenCompleteCallback || function() {};
        this.onCloseCompleteCallback = obj.onCloseCompleteCallback || function() {};
        this.$body = document.querySelector('body');


        this.init()
    }


    get isOpen() {
            return this.status;
        }
        /*  */
    enableButton(btn) {
        // console.log(btn);
        btn.disabled = false;
    }
    disableButton(btn) {
            // console.log(btn);
            btn.disabled = true;
        }
        /*  */
    open() {
        this.onOpenCompleteCallback();
        const onComplete = () => {
            this.enableButton(this.$openBtn);
            this.status = true;
        }
        const onStart = () => this.disableButton(this.$openBtn);

        this.animationIn({ onComplete, onStart }).play();

    };

    close() {
        this.onCloseCompleteCallback();
        const onComplete = () => {
            this.enableButton(this.$openBtn);

            this.status = false;
        }
        const onStart = () => this.disableButton(this.$openBtn);

        this.animationOut({ onComplete, onStart }).play();
    };

    toggle() {
        if (this.status) {
            this.$body.classList.remove('modal-active');
            this.close();
        } else {
            this.$body.classList.add('modal-active');
            this.open();
        }
    }

    listeners() {
        const self = this;
        this.$body.addEventListener('click', function(evt) {
            if (evt.target.closest(self.attrParrentNode) != null && !self.$openBtn.disabled) {
                evt.stopImmediatePropagation();
                self.toggle();
            }
        });
    }


    init() {
        this.listeners();
    }
}




/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
const popupBlockBtnOpen = document.querySelector('[data-menu-btn]');
const popupBlockBtnClose = document.querySelector('[data-menu-close]');
const popupBlock = document.querySelector('[data-call-popup-block]');




const callPopap = new showModal({
    $popup: popupBlock,
    $openBtn: popupBlockBtnOpen,
    $closeBtn: popupBlockBtnClose,
    animationIn: animationPopapIn,
    animationOut: animationPopapOut,
    attrParrentNode: '[data-parrent-node-popup]',
    onOpenCompleteCallback: () => {
        // console.log('efefef');
    }
});





/*
 *  start in
 */
function animationPopapIn(settings) {
    // gsap.set([], {autoAlpha:0});
    const obj = {...settings, paused: true };
    const tl = gsap.timeline(obj);
    tl.fromTo(this.$popup, 1, {scale: 1.2, autoAlpha: 0 }, {scale: 1, autoAlpha: 1, ease: eases.ex, immediateRender: false });
    // tl.fromTo('body', 1, {scale: 1}, {ease: eases.ex, scale: 0.9, immediateRender: false }, '<0.05');



    return tl;
};
/*
 *  end in
 */
/*
 *  start Out
 */
function animationPopapOut(settings) {
    // gsap.set([], {autoAlpha:0});
    const obj = {...settings, paused: true, };
    const tl = gsap.timeline(obj);
    tl.fromTo(this.$popup, 1, {scale: 1, autoAlpha: 1 }, {scale: 1.2, autoAlpha: 0, clearProps: "all", ease: eases.ex, immediateRender: false })
        /*  */


    return tl;
};
/*
 *  end Out
 */
/**********************************/




const menuBtnOpen = document.querySelector('[data-menu-btn]');
const menuBtnClose = document.querySelector('[data-menu-close]');
const menuBlock = document.querySelector('[data-menu-block]');


const cross1 = document.querySelector('.cross__1');
const cross2 = document.querySelector('.cross__2');
const line0 = document.querySelector('.burg__0');
const line1 = document.querySelector('.burg__1');
const line2 = document.querySelector('.burg__2');
const menuTextOpen = document.querySelector('[data-text-open]');
const menuTextClose = document.querySelector('[data-text-close]');

/**********************************/
const ease_menuBtnHover1 = BezierEasing(.42, .8, .39, .97);
const ease_menuBtnCross = BezierEasing(.85, 1.34, .14, 1.26);
const ease_menuBtnText = BezierEasing(.03, .94, .43, 1.07);

gsap.set([cross1, cross2], { autoAlpha: 0, scale: 0, transformOrigin: 'center' });
gsap.set([menuTextClose], { autoAlpha: 0, x: -25 });



const menu = new showModal({
    $popup: menuBlock,
    $closeBtn: menuBtnClose,
    $openBtn: menuBtnOpen,
    animationIn: animationMenuIn,
    animationOut: animationMenuOut,
    attrParrentNode: '[data-parrent-node-menu]'
});

/*
 *  start in
 */
gsap.registerPlugin(CSSRulePlugin);

function animationMenuIn(settings) {
    // gsap.set([], {autoAlpha:0});
    const obj = {...settings, paused: true };
    const tl = gsap.timeline(obj);
    const rule = CSSRulePlugin.getRule(".menu__text-wrap:after");
    const imgWrap = this.$popup.querySelector('.menu__img-wrap');
    const textWrap = this.$popup.querySelector('.menu__text-wrap');
    const imgForAnim = document.querySelector('.menu__img-wrap-for-animation');
    const menuBackgrounds = document.querySelectorAll('[class*=menu__decor]');
    const menuLinks = document.querySelectorAll('.menu__outer-links>li>a');
    const menuInnerLinks = document.querySelectorAll('.menu__inner-links>li>a');
    tl.timeScale(0.75);
    tl.fromTo(this.$popup, 0.5, { autoAlpha: 0, }, { autoAlpha: 1, immediateRender: true }, )
        // tl.fromTo(menuBackgrounds, { x: 150, y: -20, scale: 1.02, autoAlpha: 0 }, { x: 0, y: 0, autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.3 }, '<')
    tl.fromTo(menuBackgrounds, { clipPath: 'polygon(0 0, 0 0, 0 100%, 0% 100%)', }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', stagger: 0.05, clearProps: 'all', duration: 0.3 }, '<')
    tl.fromTo(textWrap, { autoAlpha: 0, x: -200 }, { autoAlpha: 1, x: 0, }, '<+0.5')
    tl.fromTo(imgWrap, { autoAlpha: 0, x: 200 }, { autoAlpha: 1, x: 0, }, '<')
    tl.fromTo(imgForAnim, { autoAlpha: 0, x: 200 }, { autoAlpha: 1, x: 0, }, '<')

    tl.fromTo(rule, {
        cssRule: {
            opacity: 0,
        }
    }, {
        cssRule: {
            opacity: 1,
        }
    }, '<')
    tl.fromTo(menuLinks, { autoAlpha: 0, x: -30 }, { autoAlpha: 1, stagger: 0.1, x: 0 }, '<')
    tl.fromTo(menuInnerLinks, { autoAlpha: 0, x: -30, y: 10 }, { autoAlpha: 1, stagger: 0.075, x: 0, y: 0 }, '<')

    tl.to([line0, line1, line2], 0.5, { autoAlpha: 1, x: 30, stagger: 0.1, ease: ease_menuBtnHover1 }, '<')
        //     /*  */
    tl.to(menuTextOpen, 0.3, { autoAlpha: 0, x: 20, ease: ease_menuBtnText }, '<')
    tl.to(menuTextClose, 0.3, { autoAlpha: 1, x: 0, ease: ease_menuBtnText }, '<')
        //     /*  */
    tl.fromTo([cross1, cross2], 0.6, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, stagger: 0.1, scale: 1, ease: ease_menuBtnCross }, '<')


    return tl;
};
/*
 *  end in
 */
/*
 *  start Out
 */
function animationMenuOut(settings) {
    // gsap.set([], {autoAlpha:0});
    const obj = {...settings, paused: true, };
    const tl = gsap.timeline(obj);
    const textWrap = this.$popup.querySelector('.menu__text-wrap');
    const imgWrap = this.$popup.querySelector('.menu__img-wrap');
    const img = this.$popup.querySelector('.js-menu-img');
    const animationImgWrap = document.querySelector('.menu__img-wrap-for-animation');
    const menuBackgrounds = document.querySelectorAll('[class*=menu__decor]');
    const shift = 200;
    tl.timeScale(0.75);
    var textWrapDecor = CSSRulePlugin.getRule(".menu__text-wrap:after");
    tl.fromTo(animationImgWrap, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: shift, }, '<')
    tl.fromTo(imgWrap, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: shift, }, '<')
    tl.fromTo(textWrap, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: -shift, }, '<')

    tl.fromTo(img, { scale: 1 }, { scale: 1.2 }, '<')
    tl.fromTo(this.$popup, 1, { autoAlpha: 1 }, { autoAlpha: 0, immediateRender: true }, )
    tl.fromTo(menuBackgrounds, { x: '0', autoAlpha: 1 }, { x: 100, autoAlpha: 0, stagger: 0.05, clearProps: 'all', duration: 1 }, '<')

    tl.fromTo(textWrapDecor, {
        cssRule: {
            opacity: 1,
        }
    }, {
        cssRule: {
            opacity: 0,
        }
    }, '<')
    tl.fromTo(this.$popup, 1, { autoAlpha: 1 }, { autoAlpha: 0, }, '<')
        /*  */
    tl.to(menuTextClose, 0.3, { autoAlpha: 0, x: -20, ease: ease_menuBtnText }, '<')
    tl.to(menuTextOpen, 0.3, { autoAlpha: 1, x: 0, ease: ease_menuBtnText }, '<')
        /*  */
    tl.to([line0, line1, line2], 0.5, { autoAlpha: 1, x: 0, stagger: 0.1, ease: ease_menuBtnHover1 }, '<')
    tl.fromTo([cross1, cross2], 0.6, { autoAlpha: 0, scale: 1 }, { autoAlpha: 1, stagger: 0.1, scale: 0, ease: ease_menuBtnCross }, '<')


    return tl;
};
/*
 *  end Out
 */
/**********************************/

/*
 * hover start
 */
/*
 * hover end
 */

const menuBtnHover = (() => {
    var tl = new TimelineLite({ paused: true });

    tl.fromTo(menuTextOpen, 0.3, { x: 0 }, { x: 8, ease: ease_menuBtnHover1 });
    tl.fromTo(line0, 0.3, { x: 0 }, { x: 8, ease: ease_menuBtnHover1 }, '-=0.20');

    return tl;

})();



menuBtnOpen.addEventListener("mouseover", e => {
    if (!menu.isOpen) {
        menuBtnHover.play();
        return
    }

});

menuBtnOpen.addEventListener("mouseout", e => {
    if (!menu.isOpen) {
        menuBtnHover.reverse();
        return
    }
});



class Util {
    /**
     * Throttles a function.
     * @param callback
     * @param wait
     * @param context
     * @returns {Function}
     */
    static throttle(callback, wait = 200, context = this) {
      let last;
      let deferTimer;
  
      return function() {
        let now = +new Date();
        let args = arguments;
  
        if (last && now < last + wait) {
          // preserve by debouncing the last call
          clearTimeout(deferTimer);
          deferTimer = setTimeout(function() {
            last = now;
            callback.apply(context, args);
          }, wait);
        } else {
          last = now;
          callback.apply(context, args);
        }
      };
    }
  
    /**
     * Debounces a function.
     * @param callback
     * @param wait
     * @param context
     * @returns {Function}
     */
    static debounce(callback, wait = 200, context = this) {
      let timeout = null;
      let callbackArgs = null;
  
      const later = () => callback.apply(context, callbackArgs);
  
      return function() {
        callbackArgs = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
      };
    }
  
    static addEventListenerBySelector(className, event, fn) {
      var list = document.querySelectorAll(className);
      for (var i = 0, len = list.length; i < len; i++) {
        list[i].addEventListener(event, fn, false);
      }
    }
  
    static lerp(a, b, n) {
      return (1 - n) * a + n * b;
    }
  
    static map(value, in_min, in_max, out_min, out_max) {
      return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      );
    }
}


/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */

class Demo4 {
    constructor() {
    //   initPageTransitions();
      this.initCursor();
      this.initCanvas();
      this.initHovers();
    }
  
    initCursor() {
      this.clientX = -100;
      this.clientY = -100;
      this.innerCursor = document.querySelector(".circle-cursor--inner");
      this.outerCursorSpeed = 1;
      this.lastX = 0;
      this.lastY = 0;
      this.isStuck = false;
      this.showCursor = false;
      const { paper } = window;
  
      const unveilCursor = e => {
        this.group.position = new paper.Point(e.clientX, e.clientY);
        setTimeout(() => {
          this.outerCursorSpeed = 0.2;
        }, 100);
        this.showCursor = true;
      };
      document.addEventListener("mousemove", unveilCursor);
  
      document.addEventListener("mousemove", e => {
        this.clientX = e.clientX;
        this.clientY = e.clientY;
      });
  
      const render = () => {
        gsap.set(this.innerCursor, {
          x: this.clientX,
          y: this.clientY
        });
        if (this.showCursor) {
          document.removeEventListener("mousemove", unveilCursor);
        }
        requestAnimationFrame(render);
      };
      requestAnimationFrame(render);
    }
  
    initCanvas() {
      const { paper, SimplexNoise } = window;
      const canvas = document.querySelector(".circle-cursor--outer");
      const shapeBounds = {
        width: 75,
        height: 75
      };
      paper.setup(canvas);
  
      const strokeColor = "rgba(190, 190, 190, 0.5)";
      const strokeWidth = 1;
      const segments = 8;
      const radius = 15;
      let isNoisy = false;

      
  
      const polygon = new paper.Path.RegularPolygon(
        new paper.Point(0, 0),
        segments,
        radius
      );
      polygon.strokeColor = strokeColor;
      polygon.strokeWidth = strokeWidth;
      
      polygon.smooth();
      
      this.group = new paper.Group([polygon]);
      this.group.applyMatrix = false;
      
      const noiseObjects = polygon.segments.map(() => new SimplexNoise());
      let bigCoordinates = [];



      
      
      
      
      
      let initialScale = 1.8;
      polygon.scaling = initialScale;
      paper.view.onFrame = event => {
        
        const noiseScale = this.isStuck ? 160 : 60; // speed
        const noiseRange = this.isStuck ? 6 : 0.65;



        // move circle around normally
        this.lastX = Util.lerp(this.lastX, this.clientX, this.outerCursorSpeed);
        this.lastY = Util.lerp(this.lastY, this.clientY, this.outerCursorSpeed);
        this.group.position = new paper.Point(this.lastX, this.lastY);
        // while stuck and when big, do perlin noise
        isNoisy = true;

  
        // first get coordinates of large circle
        if (bigCoordinates.length === 0) {
          polygon.segments.forEach((segment, i) => {
              bigCoordinates[i] = [segment.point.x, segment.point.y];
          });
        }

        // calculate noise value for each point at that frame
        polygon.segments.forEach((segment, i) => {
          const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
          const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);
  
          const distortionX = Util.map(noiseX, -1, 1, -noiseRange, noiseRange);
          const distortionY = Util.map(noiseY, -1, 1, -noiseRange, noiseRange);
  
          const newX = bigCoordinates[i][0] + distortionX;
          const newY = bigCoordinates[i][1] + distortionY;
  
          segment.point.set(newX, newY);
        });


                
        if (this.isStuck) {
          if(initialScale <= 2.3) {
            initialScale = initialScale += 0.1;
            polygon.scaling = initialScale;
          } else {
            polygon.scaling = 2.3;
          }
        } else {
          if(initialScale <= 1.8) {
            polygon.scaling = 1.8;
            initialScale = 1.8;
          } else {
            initialScale = initialScale -= 0.1;
            polygon.scaling = initialScale;
          }
        }        
        polygon.smooth();
      };
    }
  
    initHovers() {  
      const mainNavItemMouseEnter = () => {
        this.isStuck = true;

        
        // this.outerCursorSpeed = 0.8;
        this.fillOuterCursor = true;
        gsap.to(this.innerCursor, 0.2, { scale: 1.2 });
      };
      const mainNavItemMouseLeave = () => {
        this.isStuck = false;

        
        // this.outerCursorSpeed = 0.2;
        this.fillOuterCursor = false;
        gsap.to(this.innerCursor, 0.2, { scale: 1 });
      };
  
      const mainNavItems = [...document.querySelectorAll("a"), ...document.querySelectorAll("button")];
      mainNavItems.forEach(item => {
        item.addEventListener("mouseenter", mainNavItemMouseEnter);
        item.addEventListener("mouseleave", mainNavItemMouseLeave);
      });
    }
  }

  const demo4 = new Demo4();
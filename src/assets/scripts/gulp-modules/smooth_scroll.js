/* beautify preserve:start */
/*eslint-disable */
@@include('../../../../node_modules/bezier-easing/dist/bezier-easing.min.js')
@@include('../libs/locomotive-scroll/dist/locomotive-scroll.min.js')
@@include('../libs/gsap/ScrollTrigger.min.js')
/* beautify preserve:end */;;;;;
/*eslint-enable */
/**Ефект ряби START */
/**
 * Water ripple effect.
 * Original code (Java) by Neil Wallis 
 * link http://www.neilwallis.com/java/water.html
 * 
 * author Sergey Chikuyonok (serge.che@gmail.com)
 * link http://chikuyonok.ru
 */

// const firstBlockEffectImage = document.querySelector('.page-first-block__bg img');
// firstBlockEffectImage.addEventListener('load', function(evt) {


//     if (document.documentElement.clientWidth < 576) return;
//     var canvas = document.getElementById('c'),
//         ctx = canvas.getContext('2d'),
//         width = document.documentElement.clientWidth,
//         height = document.documentElement.clientHeight,
//         half_width = width >> 1,
//         half_height = height >> 1,
//         size = width * (height + 2) * 2,
//         delay = 25,
//         oldind = width,
//         newind = width * (height + 3),
//         riprad = 3,
//         ripplemap = [],
//         last_map = [],
//         ripple,
//         texture,
//         line_width = 20,
//         activeDisturbes = [],
//         step = line_width * 2,
//         count = height / line_width;

//     canvas.width = width;
//     canvas.height = height;

//     /*
//      * Water ripple demo can work with any bitmap image
//      * (see example here: http://media.chikuyonok.ru/ripple/)
//      * But I need to draw simple artwork to bypass 1k limitation
//      */
//     with(ctx) {
//         // let image = new Image();
//         // image.src = document.querySelector('.page-first-block__bg img').getAttribute('src');
//         // console.log(this);
//         drawImage(evt.target, 0, 0, width, height);
//         save();
//         // rotate(-0.785);
//         restore();
//     }

//     texture = ctx.getImageData(0, 0, width, height);
//     ripple = ctx.getImageData(0, 0, width, height);

//     for (var i = 0; i < size; i++) {
//         last_map[i] = ripplemap[i] = 0;
//     }

//     /**
//      * Main loop
//      */
//     function run() {
//         newframe();
//         ctx.putImageData(ripple, 0, 0);
//     }

//     /**
//      * Disturb water at specified point
//      */
//     function disturb(dx, dy, wide = 256, isMouse = false) {
//         if (activeDisturbes.length >= 15 && !isMouse) return;

//         dx <<= 0;
//         dy <<= 0;
//         for (var j = dy - riprad; j < dy + riprad; j++) {
//             for (var k = dx - riprad; k < dx + riprad; k++) {
//                 ripplemap[oldind + (j * width) + k] += wide;

//             }
//         }
//         activeDisturbes.push(dx);
//     }

//     /**
//      * Generates new ripples
//      */
//     function newframe() {
//         var a, b, data, cur_pixel, new_pixel, old_data;

//         var t = oldind;
//         oldind = newind;
//         newind = t;
//         var i = 0;


//         // create local copies of variables to decrease
//         // scope lookup time in Firefox
//         var _width = width,
//             _height = height,
//             _ripplemap = ripplemap,
//             _last_map = last_map,
//             _rd = ripple.data,
//             _td = texture.data,
//             _half_width = half_width,
//             _half_height = half_height;

//         for (var y = 0; y < _height; y++) {
//             for (var x = 0; x < _width; x++) {
//                 var _newind = newind + i,
//                     _mapind = oldind + i;
//                 data = (
//                     _ripplemap[_mapind - _width] +
//                     _ripplemap[_mapind + _width] +
//                     _ripplemap[_mapind - 1] +
//                     _ripplemap[_mapind + 1]) >> 1;

//                 data -= _ripplemap[_newind];
//                 data -= data >> 5;

//                 _ripplemap[_newind] = data;

//                 //where data=0 then still, where data>0 then wave
//                 data = 1024 - data;

//                 old_data = _last_map[i];
//                 _last_map[i] = data;

//                 if (old_data != data) {
//                     //offsets
//                     a = (((x - _half_width) * data / 1024) << 0) + _half_width;
//                     b = (((y - _half_height) * data / 1024) << 0) + _half_height;

//                     //bounds check
//                     if (a >= _width) a = _width - 1;
//                     if (a < 0) a = 0;
//                     if (b >= _height) b = _height - 1;
//                     if (b < 0) b = 0;

//                     new_pixel = (a + (b * _width)) * 4;
//                     cur_pixel = i * 4;

//                     _rd[cur_pixel] = _td[new_pixel];
//                     _rd[cur_pixel + 1] = _td[new_pixel + 1];
//                     _rd[cur_pixel + 2] = _td[new_pixel + 2];
//                 }

//                 ++i;
//             }
//         }
//     }


//     window.canvasFrame = setInterval(run, delay);
//     window.canvasThrottle = setInterval(() => { activeDisturbes.splice(0, 5) }, 1000);

//     // generate random ripples
//     var rnd = Math.random;
//     window.canvasEffectInterval = setInterval(function() {
//         requestAnimationFrame(() => {
//             let randomize = rnd();
//             let randomizeH = rnd();
//             let randDx = randomize * width;
//             let randDy = randomizeH * height;

//             for (var e = randDx; e < randDx + 50; e += 10) {
//                 disturb(e * (3 * Math.cos(e)), e);
//             }
//         })
//     }, 250);

//     const stopIcon = `
//     <svg 
//         data-effect-stop
//         style="
//             width: 30px;
//             height: 30px;
//             position: absolute;
//             right: 0;
//             top: calc(100vh - 50px);
//             z-index: 1000;
//             transform: translate(-50%,-50%);
//             "     
//         xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 30.05 30.05" style="enable-background:new 0 0 30.05 30.05;" xml:space="preserve">
//         <g>
//             <path style="fill:rgba(207, 190, 151, 1);" d="M18.993,10.688h-7.936c-0.19,0-0.346,0.149-0.346,0.342v8.022c0,0.189,0.155,0.344,0.346,0.344   h7.936c0.19,0,0.344-0.154,0.344-0.344V11.03C19.336,10.838,19.183,10.688,18.993,10.688z"/>
//             <path style="fill:rgba(207, 190, 151, 1);" d="M15.026,0C6.729,0,0.001,6.726,0.001,15.025S6.729,30.05,15.026,30.05   c8.298,0,15.023-6.726,15.023-15.025S23.324,0,15.026,0z M15.026,27.54c-6.912,0-12.516-5.604-12.516-12.515   c0-6.914,5.604-12.517,12.516-12.517c6.913,0,12.514,5.603,12.514,12.517C27.54,21.936,21.939,27.54,15.026,27.54z"/>
//         </g>
//     </svg>`;
//     document.body.insertAdjacentHTML('beforeend', stopIcon);
//     /**градинент для канвас */
//     canvas.insertAdjacentHTML('afterend', `
//         <div style="
//         content: '';
//             position: absolute;
//             top: calc(var(--header-height) * -1);
//             left: calc(var(--self-side-padding) * -1);
//             pointer-events:none;
//             width: calc(100% + (var(--self-side-padding) * 2));
//             height: calc(100% + var(--header-height));
//             background: linear-gradient(
//         180deg
//         , rgba(0, 97, 100, 0) 60%, rgba(0, 97, 100, 0.9) 100%), rgba(0, 0, 0, 0.2);"></div>
//     `);
//     /**Остановка ефекта */

//     var dedouncedDisturb = _.throttle(disturb, 1000 / 25);
//     canvas.onmousemove = function( /* Event */ evt) {
//         // disturb(evt.offsetX || evt.layerX, evt.offsetY || evt.layerY, undefined, true);
//         dedouncedDisturb(evt.offsetX || evt.layerX, evt.offsetY || evt.layerY, undefined, true);
//     };

//     document.querySelector('[data-effect-stop]').addEventListener('click', () => window.removeFirstPageEffect());
//     window.removeFirstPageEffect = function() {
//         clearInterval(window.canvasEffectInterval);
//         clearInterval(window.canvasFrame);
//         clearInterval(window.canvasThrottle);
//         document.querySelector('[data-effect-stop]').remove();
//         window.removeFirstPageEffect = () => {};

//     }
// });



/**Ефект ряби END */
const intersectionOptions = {
    threshold: 0.45,
}
const niceBezier = BezierEasing(0, 1, .12, .91);
const niceDuration = 3;

/**********************************/
/*
 * LOCOMOTIVE SCROLL start
 */
/**block2 people transform length */

document.querySelectorAll('.page-part,.page__footer-wrapper').forEach(el => el.setAttribute('data-scroll-section', ''))
const header = document.querySelector('.header');
const locoScroll = new LocomotiveScroll({
    el: document.querySelector('.page__inner'),
    smooth: true,
    smoothMobile: false,
    inertia: 1,
    lerp: 0.2,
    getDirection: true,
    resetNativeScroll: false,
    onUpdate: function(some) {

    }
});
stopScrollAndDetectIt(locoScroll);
window.addEventListener('wheel', firstScrollAnimAndEnableSmooth, { passive: false });
window.addEventListener('load', function(evt) {
    let tl = new gsap.timeline();
    tl.fromTo('.page-first-block__text-wrap>*', { y: 100, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.1 })
});

function firstScrollAnimAndEnableSmooth(evt) {
    evt.preventDefault();
    window.removeEventListener('wheel', firstScrollAnimAndEnableSmooth);
    stopScrollAndDetectIt(locoScroll)
    if (locoScroll.isStopped) {
        firstSecondTransferAnimation(() => {
            startScrollAndDetectIt(locoScroll);
            document.querySelector('.page-first-block').setAttribute('data-scroll-section', '');
            locoScroll.update();

        });

    }
}

function stopScrollAndDetectIt(instance) {
    instance.stop();
    instance.isStopped = true;
}

function startScrollAndDetectIt(instance) {
    instance.start();
    instance.isStopped = false;

}


document.querySelectorAll('.up-arrow').forEach(arrow => {
    document.body.append(arrow)
    arrow.addEventListener('click', function(evt) {
        locoScroll.scrollTo('top')
    });
})

function handleVisibilityOnScroll(elems = [], direction = 'up') {
    elems.forEach(elem => {
        direction === 'down' ?
            elem[0].classList.add(elem[1]) :
            elem[0].classList.remove(elem[1]);
    })
}
locoScroll.on("scroll", (position, limit, speed, direction) => {
    ScrollTrigger.update;
    if (position.scroll.y > document.documentElement.clientWidth) {
        window.canvasEffectInterval && clearInterval(window.canvasEffectInterval);
        window.removeFirstPageEffect && window.removeFirstPageEffect();
    }
    position.scroll.y > 150 ?
        handleVisibilityOnScroll([
            [header, 'not-on-top'],
            [document.querySelector('.up-arrow'), 'headroom--not-top'],
        ], 'down') :
        handleVisibilityOnScroll([
            [header, 'not-on-top'],
            [document.querySelector('.up-arrow'), 'headroom--not-top'],
        ]);
});

ScrollTrigger.scrollerProxy(document.body, {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
        };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.body.style.transform ? "transform" : "fixed"
});
gsap.registerPlugin(ScrollTrigger);

const firstBlock = document.querySelectorAll('.page-first-block');
const niceImages = document.querySelectorAll('[data-nice-entry]');
const doublePartImages = document.querySelectorAll('[data-double-part-block]');
const niceBigImages = document.querySelectorAll('[data-nice-entry-big]');
const pageBlockTitles = document.querySelectorAll('.page-block-title,.block-with-decor2__count,.block-with-decor2__text')
const amplitude = document.documentElement.clientWidth < 576 ? 40 : 80;

pageBlockTitles.forEach((big, index) => {

    gsap.set(big, { autoAlpha: 0 })
    ScrollTrigger.create({
        trigger: big,
        offset: '0.25',
        end: "bottom",
        onEnter: self => {
            if (big.isInvoked === undefined) {
                gsap.fromTo(big, { y: 50, autoAlpha: 0, }, { autoAlpha: 1, y: 0, duration: 0.75, delay: index < 5 ? index / 10 : index / 20, ease: Power3.easeOut, stagger: 0.2 });
                big.isInvoked = true;
            }
        },
    });
});
niceBigImages.forEach((big) => {
    gsap.set(big.querySelector('.block-with-logo-decor img'), { scale: 1.25 })
    ScrollTrigger.create({
        trigger: big,
        end: "bottom",
        onUpdate: self => {
            // gsap.to(big.querySelector('.block-with-logo-decor img'), { y: amplitude / -2 + self.progress * amplitude });

            if (self.progress < 0.5) gsap.to(big.querySelector('.block-with-logo-decor img'), { scale: 1.25 + ((self.progress * 0.25) * -1) });
            // gsap.to(big.querySelector('.block-with-logo-decor .gradient-bg'), { y: amplitude / -2 + self.progress * amplitude });
        },
    });
});

doublePartImages.forEach(paralaxImg => {
    let imgToAnimate = paralaxImg.querySelector('.double-part-block__img-main img') || paralaxImg;
    let imgBgToAnimate = paralaxImg.querySelector('.double-part-block__img-decor-bg img') || paralaxImg;
    let textToAnimate = paralaxImg.querySelectorAll('.double-part-block__text>*') || paralaxImg;
    let height = imgToAnimate.getBoundingClientRect().height;
    let scaleCoef = (height + (amplitude)) / height;
    // gsap.set(imgToAnimate, { scale: scaleCoef })
    gsap.set(imgToAnimate, { scale: scaleCoef })
    gsap.set(imgBgToAnimate, { scale: scaleCoef })
    gsap.set(imgToAnimate, { clipPath: `polygon(0px 0px, 100% 0px, 100% 0%, 0px 0%)`, });
    gsap.set(textToAnimate, { clipPath: `polygon(0px 0px, 100% 0px, 100% 0%, 0px 0%)`, });
    ScrollTrigger.create({
        trigger: paralaxImg,
        end: "bottom",
        onEnter: self => {
            if (!imgToAnimate.cliPathed) {
                gsap.to(imgToAnimate, { clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, ease: niceBezier, duration: 1 });
                imgToAnimate.cliPathed = true;
            }
            if (!textToAnimate.isClipPathed) {

                gsap.to(textToAnimate, { clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, stagger: 0.2, ease: niceBezier, duration: 1 });
                textToAnimate.isClipPathed = true;
            }
        },
        onUpdate: self => {
            gsap.to(imgToAnimate, { y: amplitude / -2 + self.progress * amplitude, duration: 0.25 });
            gsap.to(imgBgToAnimate, { y: (amplitude / -2 + self.progress * amplitude) / -1, duration: 0.25 });
            // gsap.to(textToAnimate, { autoAlpha: Math.abs(self.progress - 0.5 * -1) });
            // gsap.to(imgToAnimate, { y: amplitude / -2 + self.progress * amplitude });
            // gsap.to(imgBgToAnimate, { y: amplitude / -2 + self.progress * amplitude })
        },

    });
})
niceImages.forEach((paralaxImg, index) => {
    let imgToAnimate = paralaxImg.querySelector('img') || paralaxImg;
    let height = imgToAnimate.getBoundingClientRect().height;
    let scaleCoef = (height + (amplitude)) / height;
    gsap.set(imgToAnimate, { scale: scaleCoef })
        // gsap.set(imgToAnimate, { clipPath: `polygon(0px 0px, 100% 0px, 100% 0%, 0px 0%)`, ease: niceBezier, duration: 1 });
    gsap.set(imgToAnimate, { x: 50 });
    ScrollTrigger.create({
        trigger: imgToAnimate,
        /*markers: true, */
        end: "bottom",
        onEnter: self => {
            if (!imgToAnimate.cliPathed) {
                // gsap.to(imgToAnimate, { clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, ease: niceBezier, duration: 1 });
                gsap.to(imgToAnimate, { x: 0, ease: niceBezier, duration: 2 });
                imgToAnimate.cliPathed = true;
            }
        },
        onUpdate: self => gsap.to(imgToAnimate, { y: (amplitude / -2 + self.progress * amplitude) / ((index % 2 === 0) ? -1 : 1) }),
    });
})

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

/*
 * LOCOMOTIVE SCROLL end
 */
/**********************************/


document.querySelector('.screen-icon-scroll').addEventListener('click', function(evt) {
    firstSecondTransferAnimation()
});
const scrollEasing = new BezierEasing(.14, .76, .63, .99);

function firstSecondTransferAnimation(callback = () => {}) {
    let tl = gsap.timeline();
    tl.set(document.querySelectorAll('.page-part:nth-child(2)>*'), { autoAlpha: 0.5, duration: 0.5 });
    tl.to(document.querySelectorAll('.page-first-block__text-wrap>*'), { y: -150, autoAlpha: 0, stagger: 0.1, ease: Power3.easeIn, duration: 0.75 })
    tl.to('canvas, .page-first-block__bg', { scale: 1.08, ease: scrollEasing, duration: 2.3 }, '<0.5');
    // tl.to('', { y: -150, autoAlpha: 0, stagger: 0.1, ease: Power3.easeIn, duration: 0.75 },'<')
    tl.add(() => { locoScroll.scrollTo(document.documentElement.clientHeight) }, '<-0.3');
    tl.fromTo(document.querySelector('.page-part:nth-child(2)>*'), { autoAlpha: 0, y: -100 }, { autoAlpha: 1, y: 0, stagger: 0.35, duration: 1.5, ease: Power4.easeOut }, '<');
    tl.set(document.querySelectorAll('.page-first-block__text-wrap>*'), { y: 0, autoAlpha: 1, });
    tl.add(callback);
    tl = '';

}






// (function() {

//     const TITLE = document.querySelector('.page-title');
//     var textWrapper = document.querySelector('.ml13');
//     TITLE.innerHTML = TITLE.textContent.replace(/(\S)/g, "<span class='letter'>$&</span>");
//     gsap.set('.letter', { display: 'inline-block' })
//     gsap.fromTo('.letter', { y: 50, autoAlpha: 0, }, { y: 0, autoAlpha: 1, stagger: 0.05 })

// })()
/* beautify preserve:start */
/*eslint-disable */
@@include('../../../../node_modules/bezier-easing/dist/bezier-easing.min.js')
@@include('../libs/locomotive-scroll/dist/locomotive-scroll.min.js')
@@include('../libs/gsap/ScrollTrigger.min.js')
/* beautify preserve:end */;;;;;
/*eslint-enable */

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
    gsap.set(imgBgToAnimate, { scale: scaleCoef+0.2 })
    gsap.set(imgToAnimate, { webkitClipPath: `polygon(0px 0px, 100% 0px, 100% 0%, 0px 0%)`, });
    gsap.set(textToAnimate, { webkitClipPath: `polygon(0px 0px, 100% 0px, 100% 0%, 0px 0%)`, });
    ScrollTrigger.create({
        trigger: paralaxImg,
        end: "bottom",
        onEnter: self => {
            if (!imgToAnimate.cliPathed) {
                gsap.to(imgToAnimate, { webkitClipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, ease: niceBezier, duration: 1 });
                imgToAnimate.cliPathed = true;
            }
            if (!textToAnimate.isClipPathed) {
                gsap.to(textToAnimate, { webkitClipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, stagger: 0.2, ease: niceBezier, duration: 1 });
                textToAnimate.isClipPathed = true;
            }
        },
        onUpdate: self => {
            gsap.to(imgToAnimate, { scale: 1 + self.progress / 10, y: amplitude / -2 + self.progress * amplitude, duration: 0.25 });
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
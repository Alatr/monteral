import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { eases } from '../helpers/helpers'
import { inContentContact, hideContentContact } from './contact-transition.js'

global.gsap = gsap;
gsap.registerPlugin(CSSRulePlugin, EaselPlugin);




let _STATE = null;
let _ELEMENTS = null;
/*  */
const title = '[data-home-title]';
const text = '[data-home-text]';
const link = '[data-home-link]';
const awards = '[data-animate-award]';
/*  */
const mainTitle = '[data-home-main-title]';
const mainSubtitle = '[data-home-main-subtitle]';




/*  */
export const hideMainContent = () => {
        gsap.set([title, text, link], { autoAlpha: 0, x: -200 });
        gsap.set([mainTitle, mainSubtitle, awards], { autoAlpha: 0, y: -100 });
        if (_STATE.slider.data.current === _STATE.slider.data.total) {
            hideContentContact();

            gsap.set(_ELEMENTS.videoBlockWrapper, { '--w': 0 });
            gsap.set(_ELEMENTS.scrollIcon, { autoAlpha: 0 });
            gsap.set(_ELEMENTS.contactBlocks, { borderColor: '#007275' });
            gsap.set(_ELEMENTS.contactBlocksAfter, { backgroundColor: '#007275' });
        }
        if (_STATE.slider.data.current !== _STATE.slider.data.total) {
            gsap.set(_ELEMENTS.contactBlocks, { autoAlpha: 0 });
            gsap.set(_ELEMENTS.contactBlocksAfter, { backgroundColor: '#007275' });
        }
    }
    /*  */
    /*  */
export const showCntContent = (inx = 0) => {
        gsap.set([title, text, link], { autoAlpha: 0, x: -200 });
        gsap.set([mainTitle, mainSubtitle, awards], { autoAlpha: 0, y: -100 });
        /*  */
        /*  */
        const settings = { paused: true };
        const tl = gsap.timeline(settings);
        /*  */

        addActiveClassContent(inx);

        tl.call(() => {
            if (inx === _STATE.slider.data.total) {
                return inContentContact(inx).play().timeScale(1);
            }

            return inContent(inx).play();
        });

        return tl;
    }
    /*  */

export const addActiveClassContent = (inx) => {
        [..._ELEMENTS.contentBlock].forEach((el) => el.classList.remove('home-content--active'));
        _ELEMENTS.contentBlock[inx].classList.add('home-content--active');
    }
    /*
     * in start
     */

// createAnimationTool(inContentContact)


/*  */
export const inContent = (inx) => {
    addActiveClassContent(inx);

    // if (inx === _STATE.slider.data.total) return gsap.timeline();

    const titleCnt = [...$(title)][inx];
    const textCnt = [...$(text)][inx];
    const linkCnt = [...$(link)][inx];
    const awardsCnt = [...$(awards)][inx];

    const obj = { paused: true }
    const tl = gsap.timeline(obj);


    tl.fromTo([titleCnt, textCnt, linkCnt], 1, { autoAlpha: 0, x: -200 }, { autoAlpha: 1, x: 0, stagger: 0.1 })
    tl.fromTo([mainTitle, mainSubtitle, awardsCnt], 1, { autoAlpha: 0, y: -100 }, { autoAlpha: 1, y: 0, stagger: 0.1 }, '<')


    return tl;
};
/*
 * in end
 */
/*
 * out start
 */

export const counterOut = () => {
    const obj = { paused: true }
    const tl = gsap.timeline(obj);

    tl.fromTo(_ELEMENTS.counterSl, 0.5, { xPercent: 0 }, {
        xPercent: 120,
        ease: eases.exI,
        onComplete: () => {
            _ELEMENTS.counterCnt.innerHTML = `0${_STATE.slider.data.current + 1}`
            _ELEMENTS.counterTotal.innerHTML = `0${_STATE.slider.data.total + 1}`
        }
    });

    tl.fromTo(_ELEMENTS.counterSlInner, 0.5, { yPercent: 0 }, { yPercent: 120, stagger: 0.1, ease: eases.ex }, '<0.1')
    tl.fromTo(_ELEMENTS.scrollIcon, 0.5, { autoAlpha: 1 }, { autoAlpha: 0, ease: eases.ex }, '<')

    return tl;

}
export const counterIn = () => {
    const obj = { paused: true }
    const tl = gsap.timeline(obj);

    tl.fromTo(_ELEMENTS.counterSl, 0.55, { xPercent: 120 }, { xPercent: 3, ease: eases.exI })
    tl.fromTo(_ELEMENTS.counterSlInner, 0.5, { yPercent: 120 }, { yPercent: 0, stagger: 0.1, ease: eases.smooth_1 }, '<0.3')
    tl.fromTo(_ELEMENTS.scrollIcon, 0.5, { autoAlpha: 0 }, { autoAlpha: 1, ease: eases.ex }, '<')



    return tl;

}


export const outContent = (inx) => {
    const titleCnt = [...$(title)][inx];
    const textCnt = [...$(text)][inx];
    const linkCnt = [...$(link)][inx];
    const awardsCnt = [...$(awards)][inx];
    const settings = { paused: true }
    const tl = gsap.timeline(settings);

    tl.fromTo([titleCnt, textCnt, linkCnt], 1, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: -200, stagger: 0.1 })
    tl.fromTo([mainTitle, mainSubtitle, awardsCnt], 1, { autoAlpha: 1, y: 0 }, { autoAlpha: 0, y: -100, stagger: 0.1 }, '<')



    return tl;
};
/*
 * out end
 */



/*  */
export const mainTransition = (sliderData) => {

    const video = document.querySelector('#home-video');
    const cnxOut = (_STATE.slider.ditection === 1) ? sliderData.prev : sliderData.next;
    const settings = { paused: true }
        /*  */
    video.onended = function() {
        gsap.ticker.remove(update);
        _STATE.video.status = 'videoEndPlay';
        _STATE.page.blockedScroll = false;
    };
    /*  */
    let isResume = true;

    function update() {
        const progress = Math.round((video.currentTime / video.duration) * 100)
        console.log(progress);
        if (progress > 10 && isResume) {
            isResume = false;
            tl.resume();
        }
    };
    /*  */
    video.onplay = function() {
        gsap.ticker.add(update);
    };
    /*  */
    const propPadding = gsap.getProperty(_ELEMENTS.videoBlockWrapper, "x");
    /*  */
    const tl = gsap.timeline(settings);
    tl.call(() => { video.play() });
    tl.add(() => tl.pause(), '<');
    console.log(_ELEMENTS.videoBlockWrapper);
    tl.fromTo(_ELEMENTS.videoBlockWrapper, 1.5, { '--w': 50, '--h': 100 }, { '--w': 110, '--h': 110, x: 0, ease: eases.ex });
    tl.call(() => {
        outContent(cnxOut).play();
    }, null, '<')
    tl.call(() => {
        counterOut().play();
    }, null, '<0.2')
    tl.fromTo(_ELEMENTS.videoBlockWrapper, 1, { '--w': 110, '--h': 110, }, { '--w': 50, '--h': 100, x: propPadding, immediateRender: false, ease: eases.ex });
    tl.call(() => {
        counterIn().play();
    }, null, '<0.15')
    tl.call(() => { inContent(sliderData.current).play(); }, null, '-=0.3')


    return tl;
};
/*
 * main trs end
 */


export const transitionPartPageWithoutVideo = (sliderData) => {
    const overlay = document.querySelector('[data-gsap-overlay-developer]');

    const cnxOut = (_STATE.slider.ditection === 1) ? sliderData.prev : sliderData.next;
    const settings = {
        paused: true,
        onComplete: () => {
            _STATE.page.blockedScroll = false;
        }
    }

    /*  */
    const propPadding = gsap.getProperty(_ELEMENTS.videoBlockWrapper, "x");
    /*  */
    const tl = gsap.timeline(settings);
    tl.fromTo(overlay, 1, { scaleX: 0 }, {
        scaleX: 1,
        ease: eases.ex,
        onComplete: () => {
            _STATE.video.status = 'videoReady';
            _STATE.video.status = 'videoEndPlay';
        }
    });
    tl.call(() => { outContent(cnxOut).play(); }, null, '<')
    tl.call(() => {
        counterOut().play();
    }, null, '<0.2')
    tl.fromTo(overlay, 1, { scaleX: 1, transformOrigin: 'right' }, { scaleX: 0, immediateRender: false, ease: eases.ex });
    tl.fromTo(_ELEMENTS.videoBlockWrapper, 1.5, { x: -250 }, { x: propPadding, immediateRender: false, ease: eases.ex }, '<-0.1');

    tl.call(() => {
        counterIn().play();
    }, null, '<0.15')
    tl.call(() => { inContent(sliderData.current).play(); }, null, '-=1.5')

    return tl;
};
/*  */
export const transitionHidePartPageWithoutVideo = (sliderData) => {
    const overlay = document.querySelector('[data-gsap-overlay-developer]');

    const cnxOut = (_STATE.slider.ditection === 1) ? sliderData.prev : sliderData.next;
    const settings = {
        paused: true,
        onComplete: () => {
            _STATE.page.blockedScroll = false;
        }
    }

    /*  */
    const propPadding = gsap.getProperty(_ELEMENTS.videoBlockWrapper, "x");
    /*  */
    const tl = gsap.timeline(settings);
    tl.fromTo(overlay, 1, { scaleX: 0, }, {
        scaleX: 1,
        ease: eases.ex,
        onComplete: () => {
            _STATE.video.status = 'videoReady';
            _STATE.video.status = 'videoEndPlay';

        }
    });
    tl.call(() => {
        outContent(cnxOut).play();

    }, null, '<')
    tl.fromTo(overlay, 1, { scaleX: 1, transformOrigin: 'left' }, { scaleX: 0, immediateRender: false, ease: eases.ex });
    tl.fromTo(_ELEMENTS.videoBlockWrapper, 1.5, { x: 250 }, { x: propPadding, immediateRender: false, ease: eases.ex }, '<-0.1');
    tl.call(() => {
        counterIn().play();
    }, null, '<0.15')

    tl.call(() => { inContent(sliderData.current).play(); }, null, '-=1.5')

    return tl;
};
/*  */
/*  */
/*  */





export const initMainTransition = (state, elements) => {
    _STATE = state
    _ELEMENTS = elements;
    return
};
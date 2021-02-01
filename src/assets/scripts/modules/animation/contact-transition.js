import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { eases } from '../helpers/helpers'

import { outContent, inContent, addActiveClassContent, counterOut, counterIn } from './main-transition.js'

gsap.registerPlugin(CSSRulePlugin, EaselPlugin);




let _STATE = null;
let _ELEMENTS= null;
/*  */



const multiple = 1.8;

export const hideContentContact = () => {
  gsap.set(_ELEMENTS.contactTitle, {autoAlpha: 0, x: 0, scaleX: 0.9, scaleY: 0.95});
  gsap.set(_ELEMENTS.itemContactContact_1, {autoAlpha: 0, x: 0 * multiple});
  gsap.set(_ELEMENTS.itemContactForm, {autoAlpha: 0, x: 0 });
  gsap.set(_ELEMENTS.itemContactContact_2, {autoAlpha: 0, x: 0 * multiple});
  gsap.set(_ELEMENTS.contactBlocks, {borderColor: '#007275'});
  gsap.set(_ELEMENTS.contactBlocksAfter, {backgroundColor: '#007275'});

}

export const inContentContact = () => {
	addActiveClassContent(7)
	const obj = { paused: true }
	const tl = gsap.timeline(obj);

	tl.fromTo(_ELEMENTS.contactTitle, 0.8, {autoAlpha: 0, x: -70, scaleX: 0.9, scaleY: 0.95}, {autoAlpha: 1, x: 0, ease: eases.smooth_1, scaleX: 1, scaleY: 1});
	tl.fromTo(_ELEMENTS.itemContactContact_1, 0.8, {autoAlpha: 0, x: -120 * multiple}, {autoAlpha: 1, stagger: 0.1, x: 0, ease: eases.smooth_1}, '<-0.35');
	tl.fromTo(_ELEMENTS.itemContactContact_2, 1, {autoAlpha: 0, x: -170 * multiple}, {autoAlpha: 1, stagger: 0.1, x: 0, ease: eases.smooth_1}, '<-0.15');
  tl.fromTo([
    _ELEMENTS.itemContactForm[3],
    _ELEMENTS.itemContactForm[4],
    _ELEMENTS.itemContactForm[5]], 1, {autoAlpha: 0, x: -90 * multiple}, {autoAlpha: 1, stagger: 0.1, x: 0, ease: eases.smooth_1}, '<-0.2');
  tl.fromTo([
    _ELEMENTS.itemContactForm[0],
    _ELEMENTS.itemContactForm[1],
    _ELEMENTS.itemContactForm[2]], 1, {autoAlpha: 0, x: -70}, {autoAlpha: 1, stagger: 0.1, x: 0, ease: eases.smooth_1}, '-=0.9');
  tl.fromTo(_ELEMENTS.contactBlocks, 1, {borderColor: '#007275)'}, {borderColor: '#006164'}, '<+0.3');
  tl.fromTo(_ELEMENTS.contactBlocksAfter, 1, {backgroundColor: '#007275'}, {backgroundColor: '#006164'}, '<');
  
  
  
	return tl;
};
export const outContentContact = () => {
	
	const obj = {
    paused: true,
  }
	const tl = gsap.timeline(obj);

	tl.fromTo(_ELEMENTS.contactTitle, 0.5, {autoAlpha: 1, x: 0, scaleX: 1, scaleY: 1}, {autoAlpha: 0, x: -70, ease: eases.exI, scaleX: 0.9, scaleY: 0.95});
	tl.fromTo(_ELEMENTS.itemContactContact_1, 0.8, {autoAlpha: 1, x: 0 * multiple}, {autoAlpha: 0, stagger: 0.1, x: -120, ease: eases.exI}, '<-0.35');
	tl.fromTo(_ELEMENTS.itemContactContact_2, 1, {autoAlpha: 1, x: 0 * multiple}, {autoAlpha: 0, stagger: 0.1, x: -170, ease: eases.exI}, '<-0.15');
  tl.fromTo([
    _ELEMENTS.itemContactForm[3],
    _ELEMENTS.itemContactForm[4],
    _ELEMENTS.itemContactForm[5]], 1, {autoAlpha: 1, x: 0 * multiple}, {autoAlpha: 0, stagger: 0.1, x: -90, ease: eases.exI}, '<-0.2');
  tl.fromTo([
    _ELEMENTS.itemContactForm[0],
    _ELEMENTS.itemContactForm[1],
    _ELEMENTS.itemContactForm[2]], 1, {autoAlpha: 1, x: 0}, {autoAlpha: 0, stagger: 0.1, x: -70, ease: eases.exI}, '-=0.9');
  tl.fromTo(_ELEMENTS.contactBlocks, 1, {borderColor: '#006164'}, {borderColor: '#007275'}, '<+0.3');
  tl.fromTo(_ELEMENTS.contactBlocksAfter, 1, {backgroundColor: '#006164'}, {backgroundColor: '#007275'}, '<');
  
  
  
	return tl;
};


/*  */
/*  */
/*  */
/*  */
/*  */
export const transitionshowPartPageContact = (sliderData) => {
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
  hideContentContact()
  
	tl.call(()=> { 
    outContent(cnxOut).play();
    gsap.set(_ELEMENTS.contactBlocks, {autoAlpha: 1});
    gsap.set(_ELEMENTS.scrollIcon, {autoAlpha: 0});

  }, null, '<')
  // tl.call(()=> { 
  //   counterOut().play();
  // }, null, '<0.2')
	tl.fromTo(_ELEMENTS.overlayDeveloper, 1,  {scaleX: 0}, {scaleX: 1,transformOrigin: 'left', immediateRender: false, ease: eases.ex});
	tl.fromTo(_ELEMENTS.videoBlockWrapper, 1,  {'--w': 50, '--h': 100,}, {'--w': 0, '--h': 100});
	tl.call(()=> { inContentContact().play(); }, null, '-=1.3')
  // tl.call(()=> { 
  //   counterIn().play();
  // }, null, '<0.15')
	return tl;
};
/*  */
export const transitionHidePartPageContact = (sliderData) => {
  const settings = {
    paused: true,
    onComplete: () => {
		  _STATE.page.blockedScroll = false;
    }
   }

  const tl = gsap.timeline(settings);
  
  tl.call(()=> { outContentContact().play(); }, null, '<')
  tl.call(()=> { 
    counterOut().play();
  }, null, '<0.2')
	// tl.call(()=> { gsap.set(_ELEMENTS.videoBlockWrapper, {autoAlpha: 1}); }, null, '+=0')
  tl.fromTo(_ELEMENTS.overlayDeveloper, 1,  {scaleX: 1}, {scaleX: 0,transformOrigin: 'left', immediateRender: false, ease: eases.ex});
	tl.fromTo(_ELEMENTS.videoBlockWrapper, 0.5,  {'--w': 0, '--h': 100,}, {'--w': 50, '--h': 100});
  tl.call(()=> { inContent(sliderData.current).play(); }, null, '-=1')
    tl.call(()=> { 
    counterIn().play();
  }, null, '<0.15')

	return tl;
};





export const initContactTransition = (state, elements) => {
	_STATE = state
	_ELEMENTS = elements;
	return
};


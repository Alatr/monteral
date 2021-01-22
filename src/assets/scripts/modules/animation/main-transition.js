import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { eases } from '../helpers/helpers'

gsap.registerPlugin(CSSRulePlugin, EaselPlugin);




let _STATE = null;
let _ELEMENTS= null;
/*  */
const title = '[data-home-title]';
const text = '[data-home-text]';
const link = '[data-home-link]';
const awards = '[data-animate-award]';
/*  */
const mainTitle = '[data-home-main-title]';
const mainSubtitle = '[data-home-main-subtitle]';

/*  */
const contactTitle = '[data-contact-main-title]';
const contactItemInfo = '[data-contact-item-info]';
const contactFormItem = '[data-contact-form-item]';

/*  */


/*
* main trs start
*/
export const hideMainContent = () => {
	gsap.set([title, text, link], {autoAlpha: 0, x: -200});
  gsap.set([mainTitle, mainSubtitle, awards], {autoAlpha: 0, y: -100});
  /*  */
  gsap.set([contactTitle, contactItemInfo, contactFormItem], {autoAlpha: 0, y: -100});
}
/*  */
export const showCntContent = (inx = 0) => {
	gsap.set([title, text, link], {autoAlpha: 0, x: -200});
	gsap.set([mainTitle, mainSubtitle, awards], {autoAlpha: 0, y: -100});
	/*  */
	const settings = { paused: true };
	const tl = gsap.timeline(settings);
	/*  */
	
	addActiveClassContent(inx);
  
	tl.call(()=> { 
    if (inx === _STATE.slider.data.total) {
      gsap.set(_ELEMENTS.videoBlockWrapper, {autoAlpha: 0});
      return inContentContact(inx).play();
      
    }
    return inContent(inx).play();
  })

	return tl;
}
/*  */

function addActiveClassContent(inx) {
	[..._ELEMENTS.contentBlock].forEach((el) => el.classList.remove('home-content--active'));
	_ELEMENTS.contentBlock[inx].classList.add('home-content--active');
}
/*
* in start
*/

function inContentContact(inx) {
	
	const obj = { paused: true }
	const tl = gsap.timeline(obj);
	addActiveClassContent(inx);


	tl.fromTo([contactTitle, contactItemInfo, contactFormItem], 1, {autoAlpha: 0, x: -200}, {autoAlpha: 1, x: 0, stagger: 0.1})


	return tl;
};
function outContentContact(inx) {
	
	const obj = { paused: true }
	const tl = gsap.timeline(obj);
	addActiveClassContent(inx);


	tl.fromTo([contactTitle, contactItemInfo, contactFormItem], 1, {autoAlpha: 1, x: 0}, {autoAlpha: 0, x: 200, stagger: 0.1})


	return tl;
};
/*  */
function inContent(inx) {
	const titleCnt = [...$(title)][inx];
	const textCnt = [...$(text)][inx];
	const linkCnt = [...$(link)][inx];
	const awardsCnt = [...$(awards)][inx];
	
	const obj = { paused: true }
	const tl = gsap.timeline(obj);
	addActiveClassContent(inx);


	tl.fromTo([titleCnt, textCnt, linkCnt], 1, {autoAlpha: 0, x: -200}, {autoAlpha: 1, x: 0, stagger: 0.1})
	tl.fromTo([mainTitle, mainSubtitle, awardsCnt], 1, {autoAlpha: 0, y: -100}, {autoAlpha: 1, y: 0, stagger: 0.1}, '<')


	return tl;
};
/*
* in end
*/
/*
* out start
*/
function outContent(inx) {
	const titleCnt = [...$(title)][inx];
	const textCnt = [...$(text)][inx];
	const linkCnt = [...$(link)][inx];
	const awardsCnt = [...$(awards)][inx];
	
	const settings = { 
		paused: true,
		onComplete: ()=>{
			_ELEMENTS.counterCnt.innerHTML = `0${_STATE.slider.data.current + 1}`
			_ELEMENTS.counterTotal.innerHTML = `0${_STATE.slider.data.total + 1}`
		}
	}
	const tl = gsap.timeline(settings);

	tl.fromTo([titleCnt, textCnt, linkCnt], 1, {autoAlpha: 1, x: 0}, {autoAlpha: 0, x: -200, stagger: 0.1})
	tl.fromTo([mainTitle, mainSubtitle, awardsCnt], 1, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -100, stagger: 0.1}, '<')



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
	function update(){
		const progress = Math.round((video.currentTime/video.duration) * 100)
		if(progress === 10){
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
	tl.call(() => {video.play()});
	tl.add(() => tl.pause(), '<');
	tl.fromTo(_ELEMENTS.videoBlockWrapper, 1.5, {'--w': 50, '--h': 100}, {'--w': 110, '--h': 110, x: 0, ease: eases.ex});
	// tl.call(()=> { console.log('234234'); })
	tl.call(()=> { outContent(cnxOut).play(); }, null, '<')
	tl.fromTo(_ELEMENTS.videoBlockWrapper, 1,  {'--w': 110, '--h': 110,}, {'--w': 50, '--h': 100, x: propPadding, immediateRender: false, ease: eases.ex});
	tl.call(()=> { inContent(sliderData.current).play(); }, null, '-=0.3')


	return tl;
};
// createAnimationTool(mainTransition)
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
  tl.fromTo(overlay, 1,  {scaleX: 0}, {scaleX: 1, ease: eases.ex, onComplete: ()=> {
    _STATE.video.status = 'videoReady';
    _STATE.video.status = 'videoEndPlay';
  }});
  tl.call(()=> { outContent(cnxOut).play(); }, null, '<')
	tl.fromTo(overlay, 1,  {scaleX: 1, transformOrigin: 'right'}, {scaleX: 0, immediateRender: false, ease: eases.ex});
	tl.fromTo(_ELEMENTS.videoBlockWrapper, 1.5,  {x: -250}, { x: propPadding, immediateRender: false, ease: eases.ex}, '<-0.1');
  

	tl.call(()=> { inContent(sliderData.current).play(); }, null, '-=0.3')

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
  tl.fromTo(overlay, 1,  {scaleX: 0, }, {scaleX: 1, ease: eases.ex, onComplete: ()=> {
    _STATE.video.status = 'videoReady';
    _STATE.video.status = 'videoEndPlay';
  }});
  tl.call(()=> { outContent(cnxOut).play(); }, null, '<')
	tl.fromTo(overlay, 1,  {scaleX: 1, transformOrigin: 'left'}, {scaleX: 0, immediateRender: false, ease: eases.ex});
	tl.fromTo(_ELEMENTS.videoBlockWrapper, 1.5,  {x: 250}, { x: propPadding, immediateRender: false, ease: eases.ex}, '<-0.1');
  

	tl.call(()=> { inContent(sliderData.current).play(); }, null, '-=0.3')

	return tl;
};
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
export const transitionshowPartPageContact = (sliderData) => {
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
  console.log(cnxOut);
	/*  */
	const tl = gsap.timeline(settings);
	tl.call(()=> { outContent(cnxOut).play(); }, null, '<')
	tl.fromTo(overlay, 1,  {scaleX: 0}, {scaleX: 1,transformOrigin: 'left', immediateRender: false, ease: eases.ex, onComplete: ()=>{
    gsap.set(_ELEMENTS.videoBlockWrapper, {autoAlpha: 0});
  }});
	tl.call(()=> { inContentContact(sliderData.current).play(); }, null, '-=0.3')

	return tl;
};
/*  */
export const transitionHidePartPageContact = (sliderData) => {
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
  const showOverlay = ()=> 
  /*  */
  console.log(cnxOut);
	/*  */
  const tl = gsap.timeline(settings);
  
	tl.call(()=> { outContentContact(cnxOut).play(); }, null, '<')
	tl.call(()=> { gsap.set(_ELEMENTS.videoBlockWrapper, {autoAlpha: 1}); }, null, '+=0.5')
	tl.fromTo(overlay, 1,  {scaleX: 1}, {scaleX: 0,transformOrigin: 'left', immediateRender: false, ease: eases.ex});
	tl.call(()=> { inContent(sliderData.current).play(); }, null, '-=0.3')

	return tl;
};





export const initMainTransition = (state, elements) => {
	_STATE = state
	_ELEMENTS = elements;
	return
};


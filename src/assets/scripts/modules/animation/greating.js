import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { eases } from '../helpers/helpers.js'
import { inContent} from '../animation/main-transition.js'


gsap.registerPlugin(CSSRulePlugin, EaselPlugin);



import {getForwardVideo} from '../video-control';

	let _STATE = null;
	let _ELEMENTS= null;


/*
* greating start
*/
const logo = '.welcome-screen__logo';
const title = '.welcome-screen__title';
const subtitle = '.welcome-screen__subtitle';
const decor = '.welcome-screen__decor';
const videoWrapperBlock = '[data-video-block-wrapper]';
/*  */
function hideElements() {
	gsap.set([logo, title, subtitle, decor], {autoAlpha:0});
}
/*  */
function hideGreatingBlock() {
	gsap.set([logo, title, subtitle, decor], {autoAlpha:0});
	gsap.set(videoWrapperBlock, {'--w': 50, "--h": 100,});
	/*  */
	
}

function yoyoPreloader() {
	const tl = gsap.timeline({ paused: true});
	tl.fromTo(logo, 1.2, {scale: 1}, {scale: 1.3, autoAlpha:0, repeat: -1, yoyo: true, ease: eases.ex, immediateRender: false})
  return tl;
}

function animPreloadFirstVideoIn() {
	const tl = gsap.timeline({ paused: true});
  const preloader = yoyoPreloader();

  tl.fromTo([logo, title, subtitle, decor], 1, {autoAlpha:0, y: 100}, {autoAlpha:1, y: 0, stagger: 0.1, onComplete: async ()=>{
      await getForwardVideo(_STATE.slider.data.current);
      preloader.pause();
      animPreloadFirstVideoOut().play();

  }}, '<1.5');
  tl.call(()=> preloader.play());
	return tl;
}

function animPreloadFirstVideoOut() {
  const tl = gsap.timeline({ paused: true , onComplete: ()=>{
	  gsap.set([logo], {autoAlpha:0});
    _STATE.page.status = 'playGreatingVideo';
  }});
  tl.fromTo([logo, title, subtitle, decor], 1.2, {autoAlpha:1, y: 0}, {autoAlpha:0, y: -50, stagger: 0.1, ease: eases.ex});
	return tl;
}




const animGreatingVideo = (sliderData) => {

  const video = document.querySelector('#home-video');
	const settings = { paused: true }
	/*  */
	video.onended = function() {
    gsap.ticker.remove(update);
		_STATE.video.status = 'videoEndPlay';
		_STATE.page.blockedScroll = false;
	};
	// /*  */
  let isResume = true;
	function update(){
    const progress = Math.round((video.currentTime/video.duration) * 100)
		if(progress > 60 && isResume){
      isResume = false;
      tl.resume();
		}
	};
	// /*  */
	video.onplay = function() {
    gsap.ticker.add(update);
  };
	// /*  */
	const propPadding = gsap.getProperty(_ELEMENTS.videoBlockWrapper, "x");
	// /*  */
	const tl = gsap.timeline(settings);
	tl.call(() => {video.play()});
  tl.add(() => tl.pause(), '<');

	tl.fromTo(_ELEMENTS.videoBlockWrapper, 1, {'--w': 110, '--h': 110,}, {'--w': 50, '--h': 100, x: -30, immediateRender: false, ease: eases.ex});
	tl.fromTo('[data-gsap-greating]', 1, {autoAlpha: 0}, {autoAlpha: 1}, '<');
	tl.call(()=> { inContent(sliderData.current).play(); }, null, '-=0.3')


	return tl;
};


const initAnimation = (state, elements) => {
	_STATE = state
	_ELEMENTS= elements;

};

export {initAnimation, hideElements, animPreloadFirstVideoIn,  hideGreatingBlock, animGreatingVideo}


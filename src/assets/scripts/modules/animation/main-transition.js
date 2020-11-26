import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { EaselPlugin } from "gsap/EaselPlugin";
import { eases } from '../helpers/helpers'

gsap.registerPlugin(CSSRulePlugin, EaselPlugin);




let _STATE = null;
let _ELEMENTS= null;

/*
* main trs start
*/
export const mainTransition = () => {
	const video = document.querySelector('#home-video');

	const obj = {
		paused: true,
		onComplete: () => {},
	}
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
	
	const tl = gsap.timeline(obj);
	tl.call(() => {video.play()});
	tl.add(() => tl.pause(), '<');
	tl.fromTo(_ELEMENTS.videoBlockWrapper, 1.5, {width: '50%', height: '90%'}, {width: '100%', height: '100%', ease: eases.ex});
	tl.fromTo(_ELEMENTS.videoBlockWrapper, 1,  {width: '100%', height: '100%'}, {width: '50%', height: '90%', immediateRender: false, ease: eases.ex});


	return tl;
};
// createAnimationTool(mainTransition)
/*
* main trs end
*/

export const initMainTransition = (state, elements) => {
	_STATE = state
	_ELEMENTS = elements;
	return
};


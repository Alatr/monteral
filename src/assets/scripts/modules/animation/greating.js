import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { EaselPlugin } from "gsap/EaselPlugin";

gsap.registerPlugin(CSSRulePlugin, EaselPlugin);



import {isVideoLoaded, loadVideo} from '../video-control';
// force all gsap animation
// gsap.config({
// 	force3D: true
// });

	let _STATE = null;
	let _ELEMENTS= null;


/*
* greating start
*/
const logo = '.welcome-screen__logo';
const title = '.welcome-screen__title';
const subtitle = '.welcome-screen__subtitle';
const decor = '.welcome-screen__decor';
const video = document.querySelector('#home-video');
const videoWrapperBlock = '[data-video-block-wrapper]';
/*  */
function hideElements() {
	gsap.set([logo, title, subtitle, decor], {autoAlpha:0});
}
/*  */
function hideGreatingBlock() {
	gsap.set([logo, title, subtitle, decor], {autoAlpha:0});
	gsap.set(videoWrapperBlock, {width: '50%', height: '90%'});
	/*  */
	const source = video.querySelector('source');
	
	video.setAttribute('poster', `./assets/images/home/${_STATE.slider.data.next}.jpg`);
	// source.setAttribute('src', `./assets/images/home/video/_${_STATE.slider.data.next}.mp4`);
	
}
/*  */
function greating(setting = {}) {

	const obj = {
		paused: true,
		...setting,
	}
	const tl = gsap.timeline(obj);

	tl.fromTo(logo, 2, {y: 200, scaleX: 15, scaleY: 15}, {autoAlpha: 1, y: 0, scaleX: 1, scaleY: 1})
	tl.fromTo([title, subtitle, decor], 1, {autoAlpha: 0}, {autoAlpha: 1}, '-=0.5')
	
	
	return tl;
};

async function callbackGriatingAnimation(state) {
	await loadVideo();
	console.log(state.video.isLoaded, 'state.video.isLoaded');
	if(state.video.isLoaded) {
		state.video.status = 'videoReady';
		return
	}
	// state.page.status = 'startLoadingVideo';
}

/*  */
function animPreloadFirstVideo() {
	const obj = { paused: true }
	const tl = gsap.timeline(obj);

	tl.fromTo(logo, 0.1, {scale: 1}, {scale: 1.5, repeat: -1, yoyo: true, ease: 'power2'})

	return tl;

}
/*  */
function animPreloadFirstOutThenPlayVideo() {
	const obj = {
		paused: true,
		onComplete: () => {
			_STATE.page.status = 'videoPlay'
			animGreatingVideo().play();


		}
	}
	const tl = gsap.timeline(obj);

	tl.fromTo([logo, title, subtitle, decor], 1, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -200, stagger: 0.1, ease: 'power2.Out'})
	

	return tl;

}

function animGreatingVideo() {
	const video = document.querySelector('#home-video');

	const obj = {
		paused: true,
		onComplete: () => { },
	}
	/*  */
	video.onended = function() {
		gsap.ticker.remove(update);
		_STATE.page.status = 'videoEndPlay';
		_STATE.page.blockedScroll = false;
	};
	/*  */
	function update(){
		const progress = Math.round((video.currentTime/video.duration) * 100)
		if(progress === 60){
			tl.resume();
		}
	};

	video.onplay = function() {
		// tl.pause();
		gsap.ticker.add(update);
	};

	/*  */
	const tl = gsap.timeline(obj);
	console.log(_ELEMENTS.source, '}}}}');
video.load()
	tl.call(() => {video.play()})
	tl.add(() => tl.pause(), '<')
	tl.fromTo(videoWrapperBlock, 1, {width: '100%', height: '100%'}, {width: '50%', height: '90%'})
		
	return tl;

}




/*
* greating end
*/

const initAnimation = (state, elements) => {
	_STATE = state
	_ELEMENTS= elements;

	return greating({
		onComplete: () => callbackGriatingAnimation(state),
	});

};

export {initAnimation, hideElements, animPreloadFirstVideo, animPreloadFirstOutThenPlayVideo, hideGreatingBlock}


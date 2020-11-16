import gsap from 'gsap';
import {isVideoLoaded} from '../loading-video';
	// force all gsap animation
	gsap.config({
		force3D: true
	});

/*
* greating start
*/
const logo = '.welcome-screen__logo';
const title = '.welcome-screen__title';
const subtitle = '.welcome-screen__subtitle';
const decor = '.welcome-screen__decor';

function hideElements() {
	console.log('hideElements');
	gsap.set([logo, title, subtitle, decor], {autoAlpha:0});
}

console.log('greating.js');
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

function callbackGriatingAnimation(state) {
	console.log(isVideoLoaded(state), state, '\\\\\\\\\\\\\\\\\\\\\\\\\\');
	// debugger
	if(isVideoLoaded(state)) {

		state.page.status = 'videoReady';
		return
	}
	state.page.status = 'startLoadingVideo';
}
function animPreloadFirstVideo() {
	const obj = {
		paused: true,
	}
	const tl = gsap.timeline(obj);

	tl.fromTo(logo, 0.1, {scale: 1}, {scale: 1.5, repeat: -1, yoyo: true, ease: 'power2'})

	return tl;

}



/*
* greating end
*/

const initAnimation = (state) => {
		
	return greating({
		onComplete: () => callbackGriatingAnimation(state),
	});

};

export {initAnimation, hideElements, animPreloadFirstVideo}


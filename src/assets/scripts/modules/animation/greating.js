import gsap from 'gsap';
import {isVideoLoaded} from '../loading-video';
	// force all gsap animation
	gsap.config({
		force3D: true
	});

	let _STATE = null;

/*
* greating start
*/
const logo = '.welcome-screen__logo';
const title = '.welcome-screen__title';
const subtitle = '.welcome-screen__subtitle';
const decor = '.welcome-screen__decor';
/*  */
function hideElements() {
	gsap.set([logo, title, subtitle, decor], {autoAlpha:0});
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

function callbackGriatingAnimation(state) {
	if(isVideoLoaded(state)) {
		state.page.status = 'videoReady';
		return
	}
	state.page.status = 'startLoadingVideo';
}

/*  */
function animPreloadFirstVideo() {
	const obj = { paused: true }
	const tl = gsap.timeline(obj);

	tl.fromTo(logo, 0.1, {scale: 1}, {scale: 1.5, repeat: -1, yoyo: true, ease: 'power2'})

	return tl;

}
/*  */
function animPreloadFirstOut() {
	const obj = {
		paused: true,
		onComplete: () => _STATE.page.status = 'videoPlay'
	}
	const tl = gsap.timeline(obj);

	tl.fromTo([logo, title, subtitle, decor], 1, {autoAlpha: 1, y: 0}, {autoAlpha: 0, y: -200, stagger: 0.1, ease: 'power2.Out'})
	

	return tl;

}




/*
* greating end
*/

const initAnimation = (state) => {
	_STATE = state
	return greating({
		onComplete: () => callbackGriatingAnimation(state),
	});

};

export {initAnimation, hideElements, animPreloadFirstVideo, animPreloadFirstOut}


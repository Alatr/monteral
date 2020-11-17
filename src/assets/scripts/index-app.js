import initView from './modules/view-home-sl'
import {isFirstVisit, setCntTimeVisit, isHourPassedFromLastVisit} from './modules/time-visit'
import {initAnimation} from './modules/animation/greating'
import {initSlider, getDirection, next, prev, isBlockedScroll} from './modules/slider-control'
import {startCheckingLoadingVideoEvery500ms} from './modules/loading-video'





	const ex = "expo.inOut";
	const exI = "expo.in";
	const exO = "expo.out";

	const p4 = "power4.inOut";
	const p4I = "power4.in";
	const p4O = "power4.out";

	const p2 = "power2.inOut";
	const p2I = "power2.in";
	const p2O = "power2.out";

	const circ = "circ.inOut";
	const circO = "circ.out";
	const circI = "circ.in";


function app() {
	/*  */
	const state = {
		video: {
			/* 
				* videoPause
				* videoPlayning
				* videoStartPlayning
				* videoEndPlayning
				* videoStartDownload
				* videoEndDownload
				*/
			videoLoaded: false,
			/* 
				* startLoadingVideo
				* videoReady
			 */
			status: 'videoStartDownload'
		},
		animation: {
			/* 
				* animationStop
				* anomationStart
				* anomationInContentStart
				* anomationInContentEnd
				* anomationOutContentStart
				* anomationOutContentEnd
			 */
			status: 'animationStop'
		},
		page: {
			/* 
				* contentStartLoad
				* contentPreparingGreating
				* contentPreparingFirstScreen
				* contentStartAnimationGreating
				* contentStartAnimationFirstScreen
		
			 */
			status: 'contentStartLoad',
			video: {
				videoLoaded: false,
				status: 'videoStartDownload'
			},
			blockedScroll: true,
			
		},
		slider: {
			data : {
				prev: 6,
				current: 0,
				next: 1,
				total: 6,
			}
		},
		errors: []
	}
	/*  */
	const elements = {
		video: document.querySelector('#home-video'),
		source: document.querySelector('#source'),
		body: document.querySelector('body'),
		preLoader: document.querySelector('[data-preloader]'),
	}
	/*  */
	const watched = initView(state, elements);
	/*  */
	const animationGreating = initAnimation(watched);
	const scrollControl = initSlider(watched);


	

	elements.video.onended = function() {
		watched.page.status = 'videoEndPlay';
	};
	/*  */
	document.addEventListener("DOMContentLoaded", function(event) {
		/*  */
		startCheckingLoadingVideoEvery500ms(elements.video, watched);
		/*  */
		if(isFirstVisit() || isHourPassedFromLastVisit()){
			setCntTimeVisit();
			watched.page.status = 'contentPreparingGreating';
			return
		}
		watched.page.status = 'contentPreparingFirstScreen';
	});
	/*  */
	elements.preLoader.addEventListener('animationend', () => {
		// if(isFirstVisit() || isHourPassedFromLastVisit()){
			/* !!!!!!!!!!!!!!!!>>>>>>>>>>>>>>>>>>>> */
		if(isHourPassedFromLastVisit()){
			watched.page.status = 'contentStartAnimationGreating';
			animationGreating.play();
			return
		}
		watched.page.status = 'contentStartAnimationFirstScreen';
	});
	/*  */
	document.addEventListener("wheel", function(event) {
		if(isBlockedScroll()) return false
		/*  */
		const direction = getDirection(event.deltaY);
		(direction === 1) ? next() : prev();
		// console.log(event.wheelDeltaY, event, event.deltaY);
  });
	/*  */
	document.addEventListener("click", function(event) {
		const source = elements.video.querySelector('source')
		// elements.video.setAttribute('src', )
		source.setAttribute('src', './assets/images/home/video/_1.mp4')
		elements.video.load();
		elements.video.play()
		console.log();
  });
	
}

app()
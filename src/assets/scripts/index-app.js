import initView from './modules/view-home-sl'
import {isFirstVisit, setCntTimeVisit, isHourPassedFromLastVisit} from './modules/time-visit'
import {initAnimation} from './modules/animation/greating'
import {initMainTransition} from './modules/animation/main-transition'
import {initSlider, getDirection, next, prev, isBlockedScroll} from './modules/slider-control'
import {isLoad, initVideoControll} from './modules/video-control'





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
				/* 
					* startLoadingVideo
					* videoReady
				 */
			tempBlobURL: null,
			isLoaded: false,
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
		// video: document.querySelector('#home-video'),
		source: document.querySelector('#source'),
		body: document.querySelector('body'),
		preLoader: document.querySelector('[data-preloader]'),
		preLoaderVideo: document.querySelector('[data-video-preloader]'),
		videoWrapper: document.querySelector('[data-video-wrapper]'),
		videoBlockWrapper: document.querySelector('[data-video-block-wrapper]'),
	}
	/*  */
	const watched = initView(state, elements);
	/*  */
	const animationGreating = initAnimation(watched, elements);
	const scrollControl = initSlider(watched);
	const videoControl = initVideoControll(watched, elements);
	const mainTransition = initMainTransition(watched, elements);


	

	// elements.video.onended = function() {
	// 	watched.page.status = 'videoEndPlay';
	// };
	/*  */
	document.addEventListener("DOMContentLoaded", function(event) {

		/*  */
		// startCheckingLoadingVideoEvery500ms(elements.video, watched);
		/*  */
		if(isFirstVisit() || isHourPassedFromLastVisit()){
			setCntTimeVisit();
			watched.page.status = 'contentPreparingGreating';
			return
		}
		watched.page.status = 'contentPreparingFirstScreen';
	});
	/*  */
	elements.preLoaderVideo.addEventListener('animationend', (e) => {
		if(watched.video.isLoaded) {
			watched.video.status = 'videoTransitionPlay';
		}
	});
	/*  */
	elements.preLoader.addEventListener('animationend', () => {
		console.log('if(isFirstVisit() || isHourPassedFromLastVisit()){');
		// if(isFirstVisit() || isHourPassedFromLastVisit()){
			/* !!!!!!!!!!!!!!!!>>>>>>>>>>>>>>>>>>>> */
		if(isHourPassedFromLastVisit()){
			watched.page.status = 'contentStartAnimationGreating';
			animationGreating.play();
			return
		}
		watched.page.status = 'contentStartAnimationFirstScreen';
		watched.page.blockedScroll = false;
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
	// document.addEventListener("click", function(event) {
	// 	const source = elements.video.querySelector('source')
	// 	// elements.video.setAttribute('src', )
	// 	source.setAttribute('src', './assets/images/home/video/_1.mp4')
	// 	elements.video.load();
	// 	elements.video.play()
	// 	console.log();
  // });
	
}

app()
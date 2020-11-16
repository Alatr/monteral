import initView from './modules/view-home-sl'
import {isFirstVisit, setCntTimeVisit, isHourPassedFromLastVisit} from './modules/time-visit'
import {initAnimation} from './modules/animation/greating'
import {startCheckingLoadingVideoEvery500ms} from './modules/loading-video'








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
				* contentPreparing
				* contentReady
		
			 */
			status: 'contentStartLoad'

		},
		slider: {
			prev: 6,
			cnt: 0,
			next: 1,
		},
		errors: []
	}
	/*  */
	const elements = {
		video: document.querySelector('#home-video'),
		body: document.querySelector('body'),
		preLoader: document.querySelector('[data-preloader]'),
	}
	/*  */
	const watched = initView(state, elements);
	/*  */
	const animationGreating = initAnimation(watched);


	

	// elements.video.oncanplaythrough = function() {
	// 	console.log("Can play through video without stopping", this);
	// 	this.play();
	// };
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
	
	document.addEventListener("wheel", function(event) {
  });
	
}

app()
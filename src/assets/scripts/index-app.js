import initView from './modules/view-home-sl'
import {isFirstVisit, setCntTimeVisit, isHourPassedFromLastVisit} from './modules/time-visit'
import {initAnimation} from './modules/animation/greating'
import {initMainTransition} from './modules/animation/main-transition'
import {initContactTransition} from './modules/animation/contact-transition'
import {initSlider, getDirection, next, prev, isBlockedScroll} from './modules/slider-control'
import {initVideoControll} from './modules/video-control'
import {getInxLocation, isRedirect} from './modules/routing'
import {setIndexToCnt} from './modules/slider-control'




function app() {
	/*  */
	const state = {

		video: {
			tempBlobURL: null,
			isLoaded: false,
			status: 'videoStartDownload'
		},
		animation: {
			status: 'animationStop'
		},
		page: {
			status: 'contentStartLoad',
			video: {
				videoLoaded: false,
				status: 'videoStartDownload'
			},
			blockedScroll: true,
			
		},
		slider: {
			ditection: 1,
			data : {
				total: 7,
				prev: 7,
				current: 0,
				next: 1,
			}
		},
		errors: []
	}
	/*  */
	const elements = {
		source: document.querySelector('#source'),
		body: document.querySelector('body'),
		preLoader: document.querySelector('[data-preloader]'),
		preLoaderVideo: document.querySelector('[data-video-preloader]'),
		videoWrapper: document.querySelector('[data-video-wrapper]'),
		videoBlockWrapper: document.querySelector('[data-video-block-wrapper]'),
		contentBlock: document.querySelectorAll('[data-content-home]'),
		
		homeLinks: [...document.querySelectorAll('[data-animate-links]')],
		homeAword: document.querySelector('[data-animate-award]'),
    counterSlInner: document.querySelector('[data-sl-counter-inner]').children,
		counterSl: document.querySelector('[data-sl-counter]'),
		counterCnt: document.querySelector('[data-cnt]'),
		counterTotal: document.querySelector('[data-total]'),
    scrollIcon: document.querySelector('[data-icon-scroll]'),
    /* contact dom page */
    itemContactContact_1: document.querySelectorAll('[data-gsap-contact-item]')[0].children,
    itemContactContact_2: document.querySelectorAll('[data-gsap-contact-item]')[1].children,
    itemContactForm: [...document.querySelector('[data-gsap-form-elem]').children, '[data-gsap-form-title]', '[data-gsap-form-subtitle]'],
    contactTitle: '[data-contact-main-title]',
    contactBlocks: ['[data-gsap-contact-r]', '[data-gsap-contact-l]'],
    contactBlocksAfter: '.contact__l .contact-l--after',
    overlayDeveloper: document.querySelector('[data-gsap-overlay-developer]')
    /*  */
	}
	/*  */
	const watched = initView(state, elements);
	/*  */
	const animationGreating = initAnimation(watched, elements);
	const scrollControl = initSlider(watched);
	const videoControl = initVideoControll(watched, elements);
	const mainTransition = initMainTransition(watched, elements);
	const contactTransition = initContactTransition(watched, elements);



	/*  */
	document.addEventListener("DOMContentLoaded", function(event) {

    if(isRedirect()){
      setIndexToCnt(getInxLocation());
      watched.page.status = 'contentPreparingRedirectScreen';
      return;
    }
		/*  */
		/*  */
		if(isFirstVisit() || isHourPassedFromLastVisit()){
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

	elements.preLoader.addEventListener('animationend', () => {
    if(isRedirect()){
      watched.page.status = 'contentStartAnimationFirstScreen';
		  watched.page.blockedScroll = false;
      return;
    }
    if(isFirstVisit() || isHourPassedFromLastVisit()){
      setCntTimeVisit();
      watched.page.status = 'contentStartAnimationGreating';
      return
    }
		watched.page.status = 'contentStartAnimationFirstScreen';
		watched.page.blockedScroll = false;
	});

	document.addEventListener("wheel", function(event) {
		if(isBlockedScroll()) return false

		const direction = getDirection(event.deltaY);

		(direction === 1) ? next() : prev();
  });
}

if (document.querySelector('body').classList.contains('home-page-desctop')) {
  app();
}

document.addEventListener("DOMContentLoaded", function(event) {
  document.querySelector('[data-preloader]').classList.add('loader-video--hidden');
});

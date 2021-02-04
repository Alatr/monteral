import onChange from 'on-change';
import { gsap } from "gsap";
import { CSSRulePlugin } from "gsap/CSSRulePlugin";
import { EaselPlugin } from "gsap/EaselPlugin";

import {hideElements, animPreloadFirstVideoIn,   hideGreatingBlock, animGreatingVideo} from './animation/greating'
import {transitionHidePartPageWithoutVideo, mainTransition, transitionPartPageWithoutVideo,  hideMainContent, showCntContent} from './animation/main-transition'
import {_PATHS} from './helpers/helpers'
import { transitionshowPartPageContact, transitionHidePartPageContact } from './animation/contact-transition.js'

gsap.registerPlugin(CSSRulePlugin, EaselPlugin);



function renderLoadingScreen(state, elements){
	const cnt = state.slider.data.current;
	const next = state.slider.data.next;
	switch (state.page.status) {
		/*  */
		case 'contentPreparingGreating':
			hideElements();
			hideMainContent();
	    gsap.set(elements.videoBlockWrapper, {'--w': 102, '--h': 107, x: 0, yPercent: -50});
	    gsap.set( '[data-gsap-greating]', {autoAlpha: 0});
			elements.videoBlockWrapper.style.backgroundImage = `url(${_PATHS.getPosterURL(cnt)})`;
			elements.preLoader.classList.add('loader--hidden');
			break;
			/*  */
		case 'contentPreparingFirstScreen':
			hideGreatingBlock();
			hideMainContent();
			
			elements.videoBlockWrapper.style.backgroundImage = `url(${_PATHS.getPosterURL(next)})`;

			elements.preLoader.classList.add('loader--hidden');
			
			break;
		/*  */
		case 'contentPreparingRedirectScreen':
				hideGreatingBlock();
				/*  */
				elements.counterCnt.innerHTML = `0${cnt + 1}`
				elements.counterTotal.innerHTML = `0${state.slider.data.total + 1}`
				/*  */
				elements.videoBlockWrapper.style.backgroundImage = `url(${_PATHS.getPosterURL(next)})`;
				hideMainContent();
				elements.preLoader.classList.add('loader--hidden');
			
			break;
		/*  */
		case 'contentStartAnimationGreating':
			animPreloadFirstVideoIn().play();
			break;
		/*  */
		case 'contentStartAnimationFirstScreen':
			showCntContent(cnt).play()
			break;
		/*  */
    case 'playGreatingVideo':
			animGreatingVideo(state.slider.data).play();
			break;
			/*  */
		case 'showPartPageWithoutVideo':
      transitionPartPageWithoutVideo(state.slider.data).play();
			break;
			/*  */
    case 'showPartPageContact':
      transitionshowPartPageContact(state.slider.data).play();
			elements.videoBlockWrapper.style.backgroundImage = `url(${_PATHS.getPosterURL(state.slider.data.current)})`;
			break;
			/*  */
    case 'hidePartPageContact':
      
      transitionHidePartPageContact(state.slider.data).play();
			elements.videoBlockWrapper.style.backgroundImage = `url(${_PATHS.getPosterURL(state.slider.data.next)})`;
			break;
			/*  */
    case 'hidePartPageWithoutVideo':
      transitionHidePartPageWithoutVideo(state.slider.data).play();
			break;
			/*  */
		default:
			throw new Error(`Uknown state loading screen(${state})`)
	}
}


function renderVideoElements(state, elements){
	const cnt = state.slider.data.current;
	const next = state.slider.data.next;

	switch (state.video.status) {
		case 'readyToCheck':
			elements.videoWrapper.appendChild(createVideoTag(cnt));
			break;
			/*  */
		case 'setNewBlobURL':
				const source = document.querySelector('#source');
				source.setAttribute('src', state.video.tempBlobURL);
				document.querySelector('#home-video').load();
			break;
		/*  */
		case 'firstVideoReady':
			// animPreloadFirstOutThenPlayVideo().play();
			break;
			/*  */
		case 'videoEndPlay':
			elements.videoBlockWrapper.style.backgroundImage = `url(${_PATHS.getPosterURL(next)})`;
			break;
		case 'removePrevVideo':
			elements.preLoaderVideo.classList.remove('loader-video--hidden');
			if(document.querySelector('#home-video') !== null){
				document.querySelector('#home-video').remove();
			}

			break;
			/*  */
		case 'videoReady':
			elements.preLoaderVideo.classList.add('loader-video--hidden');

			break;
			/*  */
		case 'videoTransitionPlay':
			// hideMainContent();
			mainTransition(state.slider.data).play();
			break;
			/*  */
		default:
			throw new Error(`Uknown state loading screen(${state})`)
			break;
  }
}

const createVideoTag = (inx) => {
	let video = document.createElement('video');
	video.setAttribute('class', 'video-view--cover home-page-video');
	video.setAttribute('id', 'home-video')
	video.muted = true;
	video.setAttribute('poster', _PATHS.getPosterURL(inx))
	video.setAttribute('preload', 'auto')
	/*  */
	let source = document.createElement('source');
	source.setAttribute('id', 'source')
	source.setAttribute('type', 'video/mp4')
	source.setAttribute('data-src',  _PATHS.getVideoURL(inx))

	video.appendChild(source);

	return video
}



const initView = (state, elements) => {

  const mapping = {
		'page.status': () => renderLoadingScreen(state, elements),
		'video.status': () => renderVideoElements(state, elements),
  };

  const watchedState = onChange(state, (path, value, previousValue) => {
		console.log(path, value);

    if (mapping[path]) {
      mapping[path]();
    }
  });

  return watchedState;
};

export default initView;


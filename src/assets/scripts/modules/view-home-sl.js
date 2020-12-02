import onChange from 'on-change';

import {hideElements, animPreloadFirstVideo,  animPreloadFirstOutThenPlayVideo, hideGreatingBlock} from './animation/greating'
import {mainTransition, hideMainContent, showCntContent} from './animation/main-transition'
import {setNewPathAttr, setNewPathAttrFromDataAttr, _PATHS} from './helpers/helpers'


function renderLoadingScreen(state, elements){
	const cnt = state.slider.data.current;
	const next = state.slider.data.next;
	switch (state.page.status) {
		/*  */
		case 'contentPreparingGreating':
			hideElements();
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
			break;
		/*  */
		case 'contentStartAnimationFirstScreen':
			showCntContent(cnt).play()
			break;
		/*  */
		case 'startLoadingVideo':
			animPreloadFirstVideo().play();
			break;
			/*  */
		case 'videoPlay':
			break;
			/*  */
		case 'showPartPageWithoutVideo':
			console.log('render showPartPageWithoutVideo');
			break;
			/*  */
		case 'showPartPageContact':
			console.log('render showPartPageContact');
			break;
			/*  */

		default:
			throw new Error(`Uknown state loading screen(${state})`)
	}
					/*  */
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
			animPreloadFirstOutThenPlayVideo().play();
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
			/*  */
		}
		
		

const createVideoTag = (inx) => {
	let video = document.createElement('video');
	video.setAttribute('class', 'video-view--cover home-page-video');
	video.setAttribute('id', 'home-video')
	video.muted = true;
	video.setAttribute('poster', _PATHS.getPosterURL(inx))
	video.setAttribute('preload', 'none')
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
		// 'page.video': () => renderLoadingScreen(state.page.status, elements),
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


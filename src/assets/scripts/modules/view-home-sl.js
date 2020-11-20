import onChange from 'on-change';

import {hideElements, animPreloadFirstVideo,  animPreloadFirstOutThenPlayVideo, hideGreatingBlock} from './animation/greating'
import {setNewPathAttr, setNewPathAttrFromDataAttr, _PATHS} from './helpers/helpers'


function renderLoadingScreen(state, elements){
	const cnt = state.slider.data.current;
	switch (state.page.status) {
		/*  */
		case 'contentPreparingGreating':
			hideElements();
			elements.preLoader.classList.add('loader--hidden');
			
			break;
			/*  */
			case 'contentPreparingFirstScreen':
			hideGreatingBlock();
			elements.preLoader.classList.add('loader--hidden');
			
			break;
		/*  */
		case 'contentStartAnimationGreating':
			break;
		/*  */
		case 'contentStartAnimationFirstScreen':
			
			break;
		/*  */
		case 'startLoadingVideo':
			animPreloadFirstVideo().play();
			break;
			/*  */
			case 'videoPlay':
				break;
				/*  */
				case 'videoEndPlay':
					break;
					/*  */
					default:
						throw new Error(`Uknown state loading screen(${state})`)
					}
					/*  */
				}
function renderVideoElements(state, elements){
	const cnt = state.slider.data.current;

	switch (state.video.status) {
		case 'readyToCheck':
			elements.videoWrapper.appendChild(createVideoTag(cnt));
			break;
			/*  */
		case 'setNewBlobURL':
				const source = document.querySelector('#source');
				source.setAttribute('src', state.video.tempBlobURL);
			break;
		/*  */
		case 'videoReady':
			animPreloadFirstOutThenPlayVideo().play();
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


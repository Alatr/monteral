import onChange from 'on-change';

import {hideElements, animPreloadFirstVideo,  animPreloadFirstOut} from './animation/greating'



function renderLoadingScreen(state, elements){
	switch (state) {
		/*  */
		case 'contentPreparingGreating':
			hideElements();
			elements.preLoader.classList.add('loader--hidden');
			
			break;
		/*  */
		case 'contentPreparingFirstScreen':
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
		case 'videoReady':
			animPreloadFirstOut().play();
			break;
		/*  */
		case 'videoPlay':
			elements.video.play();
			break;
		/*  */
		default:
			throw new Error(`Uknown state loading screen(${state})`)
	}
	/*  */
}
function controlVideo(state, elements){
	switch (state) {
		default:
			throw new Error(`Uknown state loading screen(${state})`)
			break;
	}
	/*  */
}





const initView = (state, elements) => {

  const mapping = {
		'page.status': () => renderLoadingScreen(state.page.status, elements),
		// 'page.video.status': () => renderLoadingScreen(state.page.status, elements),
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


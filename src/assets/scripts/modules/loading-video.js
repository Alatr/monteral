import {callFunctionWithInterval} from './helpers/interval-call'

export const startCheckingLoadingVideoEvery500ms = (video, state) => {
		callFunctionWithInterval({
			predicate: () => video.readyState >= 3,
			success: () => setStateVideoIsLoad(state),
			unSuccess: () => setStateVideoIsntLoad(state),
			time: 500,
		});
	}
	
	
/*  */
export const isVideoLoaded = (state) => {
	return state.page.video.videoLoaded = true;
}
/*  */
export const setStateVideoIsLoad = (state) => {
	state.page.video.videoLoaded = true;
}
export const setStateVideoIsntLoad = (state) => {
	state.page.video.videoLoaded = false;
}
/*  */





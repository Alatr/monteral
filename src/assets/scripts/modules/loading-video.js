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
	return state.video.videoLoaded = true;
}
/*  */
export const setStateVideoIsLoad = (state) => {
	console.log(state.video.videoLoaded,'|||||||||||||||||||||||||');
	state.video.videoLoaded = true;
	console.log(state.video.videoLoaded,'<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
}
export const setStateVideoIsntLoad = (state) => {
	state.video.videoLoaded = false;
}
/*  */





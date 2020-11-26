import {_PATHS} from './helpers/helpers'

// export const startCheckingLoadingVideoEvery500ms = (video, state) => {
// 		callFunctionWithInterval({
// 			predicate: () => video.readyState >= 3,
// 			success: () => setStateVideoIsLoad(state),
// 			unSuccess: () => setStateVideoIsntLoad(state),
// 			time: 500,
// 		});
// 	}
	
	
// /*  */
// export const isVideoLoaded = (state) => {
// 	return state.page.video.videoLoaded = true;
// }
// /*  */
// export const setStateVideoIsLoad = (state) => {
// 	state.page.video.videoLoaded = true;
// }
// export const setStateVideoIsntLoad = (state) => {
// 	state.page.video.videoLoaded = false;
// }
// /*  */

let _STATE = null;
let _ELEMENTS = null;


export const initVideoControll = (state, elements) => {
	_STATE = state;
	_ELEMENTS= elements;
};




export const loadForwardVideo = (result) => (result) ? true : false;

export const isVideoLoaded = (result) => (result) ? true : false;

export const getForwardVideo = async (inx) => await loadVideo(inx, 'forward');

export const getReverseVideo = async (inx) => await loadVideo(inx, 'reverse');



export const loadVideo = async (indx, type) => {
	
	let promise = new Promise(async function (resolve, reject) {
		_STATE.video.status = 'readyToCheck';
		
		const newBlobURL = await loadingVideo(indx, type);
		_STATE.video.tempBlobURL = newBlobURL;
		_STATE.video.status = 'setNewBlobURL';
		_STATE.video.isLoaded = true;
		resolve();

	});
	return await promise;
}
	
	
async function loadingVideo(inx, type){
	let promise = new Promise(function (resolve, reject) {
		let path;
		if(type === 'forward'){
			path = _PATHS.getVideoURL(inx);
		}
		if(type === 'reverse'){
			path = _PATHS.getReverseVideoURL(inx);
		}
		
		const req = new XMLHttpRequest();
		req.open('GET', path, true);
		req.responseType = 'blob';
		req.onload = function() {
			// Onload is triggered even on 404
			// so we need to check the status code
			if (this.status === 200) {
					const videoBlob = this.response;
					const newSource = URL.createObjectURL(videoBlob); // IE10+
					// Video is now downloaded
					// and we can set it as source on the video element
					resolve(newSource);
			}
		}
		req.onerror = function(data) {
			// Error
			reject(data);
			throw new Error("Error onload video! Something went wrong");
		}

		req.send();

	});
	return await promise;
}


// async function getPromise(data, url, parse) {
// 	let promise = new Promise(function (resolve, reject) {
// 		$.ajax({
// 			url: url,
// 			data: data,
// 			type: 'POST',
// 			global: false,
// 			async: true,
// 			success: function (res) {
// 				let data = (!parse) ? JSON.parse(res) : res
// 				resolve(data);
// 			},
// 			error: function (jqXHR, status, errorThrown) {
// 				reject(jqXHR);
// 			},
// 			beforeSend: function () {},
// 		});
// 	});

// 	return await promise;
// }




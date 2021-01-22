let _STATE = null;
import {isVideoLoaded, loadVideo, getForwardVideo, getReverseVideo} from './video-control';
import {setLocationName} from './routing';
// import {attach} from './helpers/helpers';


export const initSlider = (state) => {
	_STATE = state;

};

/*  */
export const next = async () => {
  console.log('next', _STATE.slider.data.current);
	if (_STATE.slider.data.current === _STATE.slider.data.total) return;

	disableScroll();
	setIndexToNext();
	_STATE.video.isLoaded = false;
	_STATE.video.status = 'removePrevVideo';
	/*  */
	_STATE.slider.ditection = 1;
	switch (_STATE.slider.data.current) {
		case 6:
      _STATE.page.status = 'showPartPageWithoutVideo';
			_STATE.video.status = 'videoReady';

			break;
		case 7:
      _STATE.page.status = 'showPartPageContact';
			_STATE.video.status = 'videoReady';

			break;
		default:
			await getForwardVideo(_STATE.slider.data.current);
			_STATE.video.status = 'videoReady';
			break;
		}
	/*  */
	setLocationName(_STATE.slider.data.current);
	
	// console.log('next', _STATE.slider.data);
	// is load
	// out
	// in

	// is load
	// load
	// out
	// in
}


























export const prev = async () => {
	if (_STATE.slider.data.current === 0) return;

	disableScroll();
	setIndexToPrev(_STATE.slider.data.current);
	_STATE.video.isLoaded = false;
	_STATE.video.status = 'removePrevVideo';
	_STATE.slider.ditection = -1;

	/*  */
	switch (_STATE.slider.data.current) {
		case 5:
      _STATE.page.status = 'hidePartPageWithoutVideo';
			_STATE.video.status = 'videoReady';
      
			break;
		case 6:
      _STATE.page.status = 'hidePartPageContact';
			_STATE.video.status = 'videoReady';
      
			break;
		default:
			await getForwardVideo(_STATE.slider.data.current);
			_STATE.video.status = 'videoReady';
			break;
		}
	/*  */
	setLocationName(_STATE.slider.data.current);
	console.log('prev', _STATE.slider.data);
}
/*  */
const disableScroll = () => {
	_STATE.page.blockedScroll = true;
}
const enableScroll = () => {
	_STATE.page.blockedScroll = false;
}
export const isBlockedScroll = () => {
	return _STATE.page.blockedScroll;
}
/*  */

const getDataIndex = () => {
	return _STATE.slider.data
}
export const getDirection = (delta) => {
	return (delta > 0) ? 1 : -1;
}
/*  */




	function setIndexToNext(){

		let current = _STATE.slider.data.current === _STATE.slider.data.total ? 0 : _STATE.slider.data.current + 1;
		const next = current === _STATE.slider.data.total ? 0 : current + 1;
		const prev = current === 0 ? _STATE.slider.data.total  : current - 1;
		
		const newData = {
			..._STATE.slider.data,
			next,
			current,
			prev,
		}
		
		_STATE.slider.data = newData;
	}

	function setIndexToPrev(){
		let current = _STATE.slider.data.current === 0 ? _STATE.slider.data.total : _STATE.slider.data.current - 1;
		const prev = current === 0 ?  _STATE.slider.data.total : current - 1;
		const next = current === _STATE.slider.data.total ? 0 : current + 1;

		const newData = {
			..._STATE.slider.data,
			current,
			prev,
			next,
		}
				
		_STATE.slider.data = newData;
	}

	export function setIndexToCnt (inx){

		const current = inx;
		const prev = current === 0 ?  _STATE.slider.data.total : current - 1;
		const next = current === _STATE.slider.data.total ? 0 : current + 1;


		const newData = {
			..._STATE.slider.data,
			current,
			prev,
			next,
		}
				
		_STATE.slider.data = newData;

	}




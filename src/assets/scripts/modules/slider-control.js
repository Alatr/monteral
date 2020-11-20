let _STATE = null;


export const initSlider = (state) => {
	console.log(state);
	_STATE = state;

};

/*  */
export const next = () => {
	disableScroll();
	setIndexToNext();
	console.log('next', _STATE.slider.data, _STATE);
	// is load
	// out
	// in

	// is load
	// load
	// out
	// in
}


























export const prev = () => {
	disableScroll();
	setIndexToPrev();
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
		const newData = {
			..._STATE.slider.data,
			current: _STATE.slider.data.current === _STATE.slider.data.total ? 0 : _STATE.slider.data.current + 1,
			prev: _STATE.slider.data.current === 0 ? _STATE.slider.data.total : _STATE.slider.data.current - 1,
			next: _STATE.slider.data.current === _STATE.slider.data.total ? 0 : _STATE.slider.data.current + 1,

		}
		
		_STATE.slider.data = newData;
		
	}
	function setIndexToPrev(){
		const newData = {
			..._STATE.slider.data,
			current: _STATE.slider.data.current === 0 ? _STATE.slider.data.total : _STATE.slider.data.current - 1,
			prev: _STATE.slider.data.current === _STATE.slider.data.total ? 0 : _STATE.slider.data.current + 1,
			next: _STATE.slider.data.current === _STATE.slider.data.total ? 0: _STATE.slider.data.current - 1,
			
		}
				
		_STATE.slider.data = newData;
		
	}
	function setIndexToCnt (inx){
		const prevCurrent = _STATE.slider.data.current;

		const newData = {
			..._STATE.slider.data,
			current: inx,
			prev: prevCurrent,
			next: _STATE.slider.data.current === _STATE.slider.data.total ? 0 : _STATE.slider.data.current + 1,
			
		}
				
		_STATE.slider.data = newData;

	}




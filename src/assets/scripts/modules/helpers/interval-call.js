export const callFunctionWithInterval = (setting = {}) => {
	const interval = setInterval(()=>{
		if (setting.predicate()) {
			clearInterval(interval);
			setting.success();
			console.log('Success');
			return
		}
		console.log('unSuccess');
		setting.unSuccess();
	}, setting.time);
}
/*  */
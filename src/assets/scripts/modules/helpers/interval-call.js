export const callFunctionWithInterval = (setting = {}) => {
	const interval = setInterval(()=>{
		console.log(setting.predicate());
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
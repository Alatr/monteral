function isFirstVisit(){
	return !(!!localStorage.getItem('LastVisit'));
}
function setCntTimeVisit(){
	return localStorage.setItem('LastVisit', Date.now());
	
}
function getTimeLastVisit(){
	return +localStorage.getItem('LastVisit');
	
}
function isHourPassedFromLastVisit() {
	const HOUR = 60 * 60 * 1000;
	const anHourAfter = getTimeLastVisit() + HOUR;
	return !(Date.now() > anHourAfter);
}

export {isFirstVisit, setCntTimeVisit, isHourPassedFromLastVisit}
export function setNewPathAttr(inx, attr, elem){
	const src = elem.getAttribute(attr);
	const reg = /(.+)\/(.+)\.(.+)$/gm;
	const newSrc = src.replace(reg, `$1/${inx}.$3`);
	elem.setAttribute(attr, newSrc);
}

export function setNewPathAttrFromDataAttr(inx, attr, elem){
	const src = elem.dataset[attr];

	const reg = /(.+)\/(.+)\.(.+)$/gm;
	const newSrc = src.replace(reg, `$1/${inx}.$3`);
	elem.setAttribute(attr, newSrc);
}



export const _PATHS = {
	getVideoURL: (inx) => `./assets/images/home/video/${inx}.mp4`,
	getPosterURL: (inx) => `./assets/images/home/${inx}.jpg` ,
}
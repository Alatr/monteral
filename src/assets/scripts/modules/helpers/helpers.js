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

export const eases = {
	ex: "expo.inOut",
	exI: "expo.in",
	exO: "expo.out",
	p4: "power4.inOut",
	p4I: "power4.in",
	p4O: "power4.out",
	p2: "power2.inOut",
	p2I: "power2.in",
	p2O: "power2.out",
	circ: "circ.inOut",
	circO: "circ.out",
	circI: "circ.in",
}	
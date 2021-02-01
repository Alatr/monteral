import {convertURL2Obj, convertObj2URL} from './helpers/helpers'
import _ from 'lodash'

const dataRoute = {
	about: 0,
	architecture: 1,
	balcony: 2,
	location: 3,
	children: 4,
	house: 5,
	developer: 6,
	contacts: 7,
}


export const getInxLocation = () => {
	const namePage = getLocationName();
	return (dataRoute[namePage] === undefined) ? 0 : dataRoute[namePage];
}

export const getLocationName = () => {
	const regex = /^\?partHomePage=(.+)(?:&)?/gm;
	const str = location.search;
	return regex.exec(str)[1];
}

export const isRedirect = () => {
	const regex = /partHomePage/gm;
	const str = location.search;
	return (regex.exec(str) === null) ? false : true;
}

export const setLocationName = (inxPartPage) => {
	const paramLocation = (_.isEmpty(convertURL2Obj())) ? {} : convertURL2Obj();
	const [newPartName, newPartInx] = _.toPairs(dataRoute).filter(([, inx]) => inx === inxPartPage)[0];

	paramLocation.partHomePage = newPartName;
	const newSearchParam = convertObj2URL(paramLocation);

	history.pushState('', '', `${newSearchParam}`);
}

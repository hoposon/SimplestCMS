const { URL_LENGTH, urlValidateRexExp, urlToDirRegExp } = require('../config/url.config.js');

function validateUrl(url) {
	console.log('validate url >>>> ', url)
	if (new RegExp(urlValidateRexExp).test(url)) {
		if (url.length <= URL_LENGTH) {
			return true;
		}
	}
	return false;
}

function urlToDir(url) {
	let temp = new RegExp(urlToDirRegExp).exec(url);
	if (temp !== null) {
		return temp[0].replace(/\./g,'-');
	} else {
		throw new Error('urlToDir not match dir name')
	}
	
}

module.exports = {
	validateUrl,
	urlToDir
}
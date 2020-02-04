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

function assetUrl(assetUrlDir, assetType, assetDir, assetName) {
	console.log('assetUrlDir', assetUrlDir)
	console.log('assetType', assetType)
	console.log('assetDir', assetDir)
	console.log('assetName', assetName)
	return `${assetUrlDir}/${assetType}${assetDir}/${assetName}`
}

module.exports = {
	validateUrl,
	urlToDir,
	assetUrl
}
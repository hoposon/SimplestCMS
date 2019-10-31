const urlValidateRexExp = /^((https?:\/\/(?:www\.|(?!www))(([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3})|(www\.(([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3})|((([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3}))$/;
const URL_LENGTH = 200;

const urlToDirRegExp = //;

function validateUrl(url) {
	if (new RegExp(urlValidateRexExp).test(url)) {
		if (url.length <= URL_LENGTH) {
			return true;
		}
	}
	return false;
}

function urlToDir(url) {
	let temp = new RegExp(urlToDirRegExp).match(url);
	return temp.replace('.', '-');
}

module.exports = {
	validateUrl,
	urlToDir
}
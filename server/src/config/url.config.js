URL_LENGTH = 250;
const urlValidateRexExp = /^((https?:\/\/(?:www\.|(?!www))(([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3})|(www\.(([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3})|((([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3}))$/;
const urlToDirRegExp = /(?![www])(([a-zA-Z0-9-]+\.)+[a-zA-Z0-9]+)/g;

module.exports = {
	URL_LENGTH,
	urlValidateRexExp,
	urlToDirRegExp
}
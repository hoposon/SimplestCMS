const path = require('path');
const BASE_PATH = path.join(path.dirname(require.main.filename), 'assets');
const IMAGES_PATH = 'images';
const DIR_LENGTH = 200;
const dirValidationRegExp = `^[a-zA-Z0-9-]{1,${DIR_LENGTH}}$`;

function getTypePath(type) {
	switch(type) {
		case 'image':
			return IMAGES_PATH
		default:
			throw new Error('Invalid asset type')
	}
}
module.exports = {
	BASE_PATH,
	dirValidationRegExp,
	getTypePath
}
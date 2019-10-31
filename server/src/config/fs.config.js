const BASE_PATH = 'assets';
const IMAGES_PATH = 'image';

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
	getTypePath
}
const { BASE_PATH, dirValidationRegExp, getTypePath } = require('../config/fs.config.js');
const fs = require('fs');
const path = require('path');

function validateDirName(dirName) {
	if (dirName && !(new RegExp(dirValidationRegExp, 'i').test(dirName))) {
		throw new Error('Dir name not valid')
	}
	return dirName

}

function makeDir(urlName, type, dirName) {
	try {
		// console.log('__dirname>>> ',__dirname)
		console.log('b>>> ',BASE_PATH)
		console.log('urlName >> ', urlName)
		console.log('type >>>>', getTypePath(type))
		console.log('name >>>> ', dirName)
		validateDirName(dirName);
		const newPath = path.join(BASE_PATH, urlName, getTypePath(type), dirName)
		console.log('newPath >>> ', newPath)
		fs.mkdirSync(newPath, {recursive: true});
	}
	catch(e) {
		console.log(e)
		throw new Error(e.message)
	}	
}

module.exports = {
	makeDir,
	validateDirName
}
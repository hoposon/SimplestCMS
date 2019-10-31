const { BASE_PATH, getTypePath } = require('../config/fs.config.js');
const fs = require('fs');
const path = require('path');

function makeDir(urlName, type, name) {
	try {
		const newPath = path.join(__dirname, BASE_PATH, urlName, getTypePath(type), name)
		console.log('newPath >>> ', newPath)
	}
	catch(e) {
		console.log(e)
		throw new Error(e.message)
	}
	
}

module.exports = {
	makeDir
}
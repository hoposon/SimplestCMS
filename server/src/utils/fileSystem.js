const { BASE_PATH, dirValidationRegExp, getTypePath } = require('../config/fs.config.js');
const fs = require('fs');
const path = require('path');

function validateDirName(dirName) {
	if (dirName && !(new RegExp(dirValidationRegExp, 'i').test(dirName))) {
		throw new Error('Dir name not valid')
	}
	return dirName

}

function makeDir(urlName, type, parentPath, dirName) {
	try {
		// console.log('__dirname>>> ',__dirname)
		// console.log('b>>> ',BASE_PATH)
		// console.log('urlName >> ', urlName)
		// console.log('type >>>>', getTypePath(type))
		// console.log('parentPath >>>> ', parentPath)
		// console.log('name >>>> ', dirName)
		validateDirName(dirName);
		const newPath = path.join(BASE_PATH, urlName, getTypePath(type), parentPath, dirName)
		console.log('newPath >>> ', newPath)
		fs.mkdirSync(newPath, {recursive: true});
	}
	catch(e) {
		console.log(e)
		throw new Error(e.message)
	}	
}

function parentDirPath(dirs, newDirId) {
	let rootIndex = 0;
	let remainingDirs = [...dirs];
	let orderedDirs = {};
	let paths = [];

	// find root
	rootIndex = dirs.findIndex(dir => dir.isRoot);
	orderedDirs[`${dirs[rootIndex].id}`] = { ...dirs[rootIndex], children: [], parentPath: '' };
	paths.push(`${dirs[rootIndex].id}`); // set path to root
	// state.currentDir = dirs[rootIndex].id.toString(); // set root as starting dir
	remainingDirs.splice(rootIndex, 1); // remove root from remainingDirs
	// console.log('orderedDirs 1 >>> ', orderedDirs)

	// flatten other dirs
	let orderedIndex = 0;
	while(remainingDirs.length) {
		// console.log('remainingDirs.length >>> ', remainingDirs.length)
		let path = paths[orderedIndex];
		let parentPath = orderedDirs[path].parentPath + '/' + orderedDirs[path].dirName;
		// console.log('paths >>> ', paths)
		// console.log('path >>> ', path)
		let parentDir = orderedDirs[path].id;
		// console.log('parentDir >>> ', parentDir)

		for (let i = 0; i < remainingDirs.length; i++) {
			// console.log('remainingDirs[i] >>> ', remainingDirs[i])
			if (newDirId === remainingDirs[i].id && remainingDirs[i].parentDir == parentDir) {
				remainingDirs = [];
				// console.log('parentPath >>>> ', parentPath)
				return parentPath;
			}

			if (remainingDirs[i].parentDir == parentDir) {
				orderedDirs[path].children.push(remainingDirs[i]);
				orderedDirs[path+'/'+remainingDirs[i].id] = { ...remainingDirs[i], children: [], parentPath}
				paths.push(path+'/'+remainingDirs[i].id);
				remainingDirs.splice(i,1);
				i--;
				// console.log('orderedDirs 2 >>> ', orderedDirs)
				// console.log('paths 2 >>> ', paths)
			}
		}
		orderedIndex++
		// console.log('orderedIndex 2 >>> ', orderedIndex)
	}
	throw new Error('Parent directory not found')
}

module.exports = {
	makeDir,
	validateDirName,
	parentDirPath
}
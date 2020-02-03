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

function removeDir(urlName, type, parentPath, dirName='') {
	try {
		const rmDirPath = path.join(BASE_PATH, urlName, getTypePath(type), parentPath, dirName)
		console.log('removeDir >>> ', rmDirPath)
		// if (newDir !== false) {
		// 	console.log('removeDir 1>>>>>>', dirPath)
		// 	dirPath = path.join(dirPath, newDir)
		// }
		fs.rmdirSync(rmDirPath, {recursive: true})
	}
	catch(e) {
		console.log(e);
		throw new Error(e.message)
	}
}

function removeFile(path) {
	try {
		fs.unlinkSync(path)
	}
	catch(e) {
		console.log(e)
		throw new Error(e.message)
	}
}

function dirPath(dirs, newDirId) {
	let rootIndex = 0;
	let remainingDirs = [...dirs];
	let orderedDirs = {};
	let paths = [];

	// find root
	console.log('dirPath >>>> ', dirs)
	rootIndex = dirs.findIndex(dir => dir.isRoot);
	orderedDirs[`${dirs[rootIndex].id}`] = { ...dirs[rootIndex], children: [], parentPath: '' };
	paths.push(`${dirs[rootIndex].id}`); // set path to root
	remainingDirs.splice(rootIndex, 1); // remove root from remainingDirs

	// when looking for root
	if (dirs[rootIndex].id == newDirId) {
		return ''
	}
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
			if (newDirId == remainingDirs[i].id && remainingDirs[i].parentDir == parentDir) {
				// remainingDirs = [];
				// console.log('parentPath >>>> ', parentPath)
				return parentPath + '/' + remainingDirs[i].dirName;
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

function storeFS({ stream, ulrDir, type, filePath, filename }) {
	// console.log('final path >>>>> ', path.join(BASE_PATH, ulrDir, getTypePath(type), parentDir, uploadDir))
	fs.statSync(`${path.join(BASE_PATH, ulrDir, getTypePath(type), filePath)}`)
	const assetPath = path.join(BASE_PATH, ulrDir, getTypePath(type), filePath, filename)
    // const path = `${uploadDir}/${filename}`;
    return new Promise((resolve, reject) =>
        stream
            .on('error', error => {
                if (stream.truncated)
                    // delete the truncated file
                    fs.unlinkSync(path);
                reject(error);
            })
            .pipe(fs.createWriteStream(assetPath))
            .on('error', error => reject(error))
            .on('finish', () => resolve({ assetPath }))
    );
}

module.exports = {
	makeDir,
	removeDir,
	removeFile,
	validateDirName,
	dirPath,
	storeFS
}
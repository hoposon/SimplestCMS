const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils/authentication');
const { makeDir, removeDir, removeFile, validateDirName, dirPath, storeFS } = require('../utils/fileSystem');
const { validateUrl, urlToDir } = require('../utils/urlUtils');


async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10)
	const user = await context.db.createUser({ ...args, password });
	user.token = jwt.sign({ userId: user.id }, APP_SECRET)
	console.log('user >>>> ', user)
	return user
}

async function login(parent, args, context, info) {
	const user = await context.db.user({ email: args.email })

	const valid = await bcrypt.compare(args.password, user.password)
	if (!valid) {
		throw new Error('Invalid password')
	}
	const token = jwt.sign({ userId: user.id }, APP_SECRET)
	user.token = token
	return user
}

async function createUrl(parent, args, context, info) {
	const userId = getUserId(context);

	if (!validateUrl(args.urlName)) {
		throw new Error('Invalid Url');
	}
	const url = await context.db.createUrl({urlName: args.urlName, userId, isOwner: true});
	if (!url) {
		throw new Error('Url not created')
	}
	// create root dir
	const dirArgs = {
		dir: {
			dirName: '',
			parentDir: 0,
			isRoot: true,
			urlId: url.id
		}
	}
	const dir = await createDir(null, dirArgs, context, null);
	if (!dir) {
		throw new Error('Root dir not created')
	}
	
	return url
}

async function createPage(parent, args, context, info) {
	const userId = getUserId(context);

	const page = await context.db.createPage(args.page, userId);
	if (!page) {
		throw new Error('{Page} not created')
	}
	return page
}

async function createDir(parent, args, context, info) {
	console.log('createDir mut >>>>> ', args)
	const userId = getUserId(context);

	validateDirName(args.dir.dirname);
	let newDir = {dirName:'', parentDir:-1, urlId:-1, isRoot:false, ...args.dir};
	console.log('new dir >>>> ', newDir)

	const url = await context.db.userUrlById(userId, args.dir.urlId);
	if (!url) {
		throw new Error('Can not get url')
	}

	let dirs = null;
	if (newDir.isRoot) {
		makeDir(urlToDir(url.urlName), 'image', '', args.dir.dirName)
	} else {
		dirs = await context.db.dirs(args.dir.urlId, userId);
		if (!dirs) {
			throw new Error('Dirs not selected')
		}
		console.log('createDir dirs >>>>>', dirs)
		// console.log('parent dir path >>> ', parentDirPath(dirs, dir.id));
		console.log('parent dir path >>> ', dirPath(dirs, newDir.parentDir));
		// makeDir(urlToDir(url.urlName), 'image', parentDirPath(dirs, dir.id), args.dir.dirName)
		makeDir(urlToDir(url.urlName), 'image', dirPath(dirs, newDir.parentDir), args.dir.dirName)
	}

	const dir = await context.db.createDir(newDir, userId);
	if (!dir) {
		removeDir(urlToDir(url.urlName), 'image', dirPath(dirs, newDir.parentDir), args.dir.dirName)
		throw new Error('Dir not created')
	}
	
	console.log('created dir >>> ', dir)
	return dir
}

async function storeAssets(parent, args, context, info) {
	const userId = getUserId(context);

	console.log('storeAssets called>>>>')
	// const { description, tags } = args;
	const userUrls = await context.db.userUrls(userId);
	console.log('urls >>>> ', userUrls)
	if (!userUrls) {
		throw new Error('Can not get user urls')
	}
	console.log('request url id>>>>', args.fileObj.urlId)
	const url = userUrls.find(url => url.id == args.fileObj.urlId);
	console.log('curent url >>> ', url)
	if (!url) {
		throw new Error('Invalid url id')
	}
	const dirs = await context.db.dirs(args.fileObj.urlId, userId);
	console.log('dirs >>>>', dirs)
	if (!dirs) {
		throw new Error('Can not get dirs')
	}
	// console.log('parent dir path >>> ', parentDirPath(dirs, dir));
	const newDirPath = dirPath(dirs, args.fileObj.uploadDirId);
	console.log('parent dir path >>> ', newDirPath)
	// const uploadDir = dirs.find(dir => dir.id == args.fileObj.uploadDirId)
	// if (!uploadDir) {
	// 	throw new Error('Invalid dir id')
	// }
	// console.log('upload dir>>>>', uploadDir)
	const { filename, mimetype, createReadStream } = await args.fileObj.file;
	// console.log('file >>>> ', args.file)
	// console.log('filename >>> ', filename)
	// console.log('mimetype >>>> ', mimetype)
	
	const stream = createReadStream();
	const filePath = await storeFS({ stream, ulrDir: urlToDir(url.urlName), type: 'image', filePath: newDirPath, filename });
	console.log('file saved to >>>> ', filePath)

	// store to db
	const asset = {
		assetType: 'image',
		stored_asset_name: filename,
		dirId: parseInt(args.fileObj.uploadDirId),
		urlId: parseInt(args.fileObj.urlId)
	}
	console.log('asset before store >>>', asset)
	const assetId = await context.db.createAsset(asset);
	if (!assetId) {
		// remove file if database not sucessful
		removeFile(filePath)
		throw new Error('Asset not stored in db')
	}

	return 'OK';
}
module.exports = {
	signup,
	login,
	createUrl,
	createPage,
	createDir,
	storeAssets
}
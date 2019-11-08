const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils/authentication');
const { makeDir, validateDirName, parentDirPath } = require('../utils/fileSystem');
const { validateUrl, urlToDir } = require('../utils/urlUtils');


async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10)
	const user = await context.db.createUser({ ...args, password });
	
	if (!user) {
		throw new Error('User not created')
	}
	user.token = jwt.sign({ userId: user.id }, APP_SECRET)
	console.log('user >>>> ', user)
	return user
}

async function login(parent, args, context, info) {
	const user = await context.db.user({ email: args.email })
	if (!user) {
		throw new Error('No such user found')
	}
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
	if (!userId) {
		throw new Error('Not logged in')
	}
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
	if (!userId) {
		throw new Error('Not logged in')
	}
	const page = await context.db.createPage(args.page, userId);
	if (!page) {
		throw new Error('{Page} not created')
	}
	return page
}

async function createDir(parent, args, context, info) {
	console.log('createDir mut >>>>> ', args)
	const userId = getUserId(context);
	if (!userId) {
		throw new Error('Not logged in')
	}
	validateDirName(args.dir.dirname);
	let newDir = {dirName:'', parentDir:-1, urlId:-1, isRoot:false, ...args.dir};
	// newDir.isRoot = false;
	console.log('new dir >>>> ', newDir)
	const dir = await context.db.createDir(newDir, userId);
	if (!dir) {
		throw new Error('Dir not created')
	}

	const url = await context.db.userUrlById(userId, args.dir.urlId);
	if (!url) {
		throw new Error('Can not get url')
	}

	if (dir.isRoot) {
		makeDir(urlToDir(url.urlName), 'image', '', args.dir.dirName)
	} else {
		const dirs = await context.db.dirs(args.dir.urlId, userId);
		if (!dirs) {
			throw new Error('Dirs not selected')
		}
		console.log('parent dir path >>> ', parentDirPath(dirs, dir.id));
		makeDir(urlToDir(url.urlName), 'image', parentDirPath(dirs, dir.id), args.dir.dirName)
	}
	
	console.log('created dir >>> ', dir)
	return dir
}

module.exports = {
	signup,
	login,
	createUrl,
	createPage,
	createDir
}
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET, getUserId } = require('../utils/authentication');


async function signup(parent, args, context, info) {
	const password = await bcrypt.hash(args.password, 10)
	const user = await context.db.createUser({ ...args, password });
	if (!user) {
		throw new Error('User not created')
	}
	const token = jwt.sign({ userId: user.id }, APP_SECRET)
	return {
		token,
		user,
	}
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
	const url = await context.db.createUrl({urlName: args.urlName, userId, isOwner: true});
	if (!url) {
		throw new Error('Url not created')
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
	console.log('createDir mut >>>>>')
	const userId = getUserId(context);
	if (!userId) {
		throw new Error('Not logged in')
	}
	// const dir = await context.db.createDir({dirName: args.dirName, urlId: args.urlId, parentDir: args.parentDir || undefined});
	const dir = await context.db.createDir({dirName, urlId, parentDir=undefined} = args);
	if (!dir) {
		throw new Error('Dir not created')
	}
	return dir
}

module.exports = {
	signup,
	login,
	createUrl,
	createDir,
	createPage
}
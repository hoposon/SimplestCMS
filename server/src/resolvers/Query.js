const { getUserId } = require('../utils/authentication');

async function urls(parent, args, context, info) {
	const userId = getUserId(context);

	const urls = await context.db.userUrls(userId);
	if (!urls) {
		throw new Error('Urls not selected')
	}
	// console.log(urls);
	return urls
}

async function pages(parent, args, context, info) {
	const userId = getUserId(context);

	const pages = await context.db.pages(args.urlId, userId);
	if (!pages) {
		throw new Error('Pages not selected')
	}
	console.log(pages);
	return pages
}

async function dirs(parent, args, context, info) {
	const userId = getUserId(context);

	const dirs = await context.db.dirs(args.urlId, userId);
	if (!dirs) {
		throw new Error('Dirs not selected')
	}
	console.log('get dirs >>>> ', dirs);
	return dirs
}

async function dirAssets(parent, args, context, info) {
	const userId = getUserId(context);

	const assets = await context.db.dirAssets(args.dirId, args.urlId, userId)
	if (!assets) {
		throw new Error('Assets not selected')
	}
	console.log('get assets >>>> ', assets);

	// set asset URL
	
	return assets
}

module.exports = {
	urls,
	pages,
	dirs,
	dirAssets
}
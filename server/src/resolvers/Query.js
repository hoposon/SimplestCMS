const { getUserId } = require('../utils/authentication');
const { dirPath } = require('../utils/fileSystem');
const { urlToDir, assetUrl } = require('../utils/urlUtils');

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

	let assets = await context.db.dirAssets(args.assetQ.dirId, args.assetQ.urlId, userId)
	if (!assets) {
		throw new Error('Assets not selected')
	}
	console.log('get assets >>>> ', assets);
	const dirs = await context.db.dirs(args.assetQ.urlId, userId);
	console.log('dirs >>>>', dirs)
	if (!dirs) {
		throw new Error('Can not get dirs')
	}
	const url = await context.db.userUrlById(userId, args.assetQ.urlId);
	if (!url) {
		throw new Error('Can not get url')
	}

	// set asset URL
	assets = assets.map(asset => {
		return {
			assetUrl: assetUrl(urlToDir(url.urlName), asset.assetType, dirPath(dirs, asset.dirId), asset.storedAssetName),
			assetName: asset.storedAssetName,
			assetType: asset.assetType
		}
	})
	console.log('final assets >>>> ', assets)
	return assets
}

module.exports = {
	urls,
	pages,
	dirs,
	dirAssets
}
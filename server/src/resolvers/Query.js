const { getUserId } = require('../utils/authentication');

async function urls(parent, args, context, info) {
	const userId = getUserId(context);
	if (!userId) {
		throw new Error('Not logged in')
	}
	const urls = await context.db.userUrls(userId);
	if (!urls) {
		throw new Error('Urls not selected')
	}
	console.log(urls);
	return urls
}

async function pages(parent, args, context, info) {
	const userId = getUserId(context);
	if (!userId) {
		throw new Error('Not logged in')
	}
	const pages = await context.db.pages(args.urlId, userId);
	if (!pages) {
		throw new Error('Pages not selected')
	}
	console.log(pages);
	return pages
}

module.exports = {
	urls,
	pages
}
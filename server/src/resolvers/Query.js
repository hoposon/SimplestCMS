const { getUserId } = require('../utils/authentication');

async function urls(parent, args, context, info) {
	const userId = getUserId(context);
	if (!userId) {
		throw new Error('Not logged in')
	}
	const urls = await context.db.userUrls(userId);
	if (!urls) {
		throw new Error('Url not created')
	}
	console.log(urls);
	return urls
}

module.exports = {
	urls
}
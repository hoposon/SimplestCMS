
const pgConfig = {
	client: 'pg',
	connection: {
		host : '127.0.0.1',
		user : 'app_public',
		password : 'apppublic',
		// user : 'postgres',
		// password : 'postgres',
		database : 'simplecms'
	},
	searchPath: ['app_public']
}
module.exports = {
	pgConfig
}
const config = {
	// conn: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/simplecms",
	conn: "postgres://postgres:postgres@localhost:5432/simplecms",
	// conn: "postgres://app_public:apppublic@localhost:5432/simplecms",
	schema: 'app_public',
	options: {
		watchPg: false,
		graphiql: true,
		enhanceGraphiql: true,
		ignoreRBAC: true,
		ignoreIndexes: false,
		// showErrorStack: true,
		// extendedErrors: 'detail'
	}
}

module.exports = {
	config
}
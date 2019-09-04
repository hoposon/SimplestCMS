const Queries = {
	loginQuery: `mutation loginQuery($email: String!, $password: String!) {
		login(
			email: $email,
			password: $password
		) {
			token
			user {
				email
			}
		}
	}`
}

module.exports = {
	Queries
}




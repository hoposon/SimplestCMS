const Queries = {
	loginQuery: `mutation login($email: String!, $password: String!) {
		login(
			email: $email,
			password: $password
		) {
			token
			user {
				email
			}
		}
	}`,
	createUrl: `mutation createUrl($urlName: String!) {
		createUrl(
		  	urlName: $urlName
		) {
			  id,
			  urlName
		}
	}`,
	userUrls: `query {
		urls {
			id,
			urlName,
			isOwner
		}
	}`
}

module.exports = {
	Queries
}



const Queries = {
	loginQuery: `mutation login($email: String!, $password: String!) {
		login(
			email: $email,
			password: $password
		) {
			email
			token
			roles
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
	}`,
	createPage: `mutation createPage($page: PageInput) {
		createPage(
				page: $page
		) {
			id,
			pageName,
			pageCode,
			urlId,
			subUrl
		}
	}`,
	urlsPages: `query pages($urlId: ID!) {
		pages(
		  urlId: $urlId
		) {
		  	id,
		  	pageName,
			pageCode,
			urlId,
			subUrl
		}
	}`,
	createDir: `mutation createDir($dir: DirInput) {
		createDir(dir: $dir) {
		  	id,
		  	dirName,
		  	parentDir,
		  	urlId
		}
	}`,
	urlsDirs: `query dirs($urlId: ID!) {
		dirs(
			urlId: $urlId
		) {
			id,
			dirName,
			parentDir,
			isRoot,
			urlId
		}
	}`
}

module.exports = {
	Queries
}




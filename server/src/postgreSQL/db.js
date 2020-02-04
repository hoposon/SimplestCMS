const knex = require('knex');
const { pgConfig } = require('../config/pg.config')

const changeCase = require('change-case');

let pg = knex(pgConfig);

function switchCase(key, typeCase) {
	if (typeCase === 'snakeCase') return changeCase.snakeCase(key)
	if (typeCase === 'camelCase') return changeCase.camelCase(key)
}

function switchObjectKeysCase(obj, typeCase) {
	let temp = {};
	Object.keys(obj).forEach(key => {
		temp[switchCase(key, typeCase)] = obj[key]
	})
	return temp;
}

class test {

}

class DB {
	constructor() {

	}

	// select
	async user({email}) {
		try {
			let user = new User((await pg.select().from('users').where('email', email))[0], 'camelCase');
			let roles = await pg('user_roles').join('roles', 'user_roles.role_id', '=', 'roles.id').select('roles.role_name').where('user_roles.user_id', user.id);
			roles = roles.map(role => {
				return role.role_name
			})
			user.roles = roles
			return user
		}
		catch(e) {
			console.log('pg.user exception: ', e)
			// !TODO - log exception
			// throw exception
			return undefined
		}
	}

	async userUrls(userId) {
		try {
			let urls = await pg('users_urls').join('urls', 'users_urls.url_id', '=', 'urls.id').select('urls.id', 'urls.url_name', 'users_urls.is_owner').where('users_urls.user_id', userId)
			urls = urls.map(url => {
				return switchObjectKeysCase(url, 'camelCase')
			})
			// console.log(urls)
			return urls
		}
		catch(e) {
			console.log('pg.userUrls exception: ', e)
			// return {
			// 	exception: e,
			// 	code: 'EXCEPTION',
			// 	res: []
			// }
			return undefined
		}
	}

	async userUrlById(userId, urlId) {
		try {
			let url = await pg('users_urls').join('urls', 'users_urls.url_id', '=', 'urls.id').select('urls.url_name').where({'users_urls.user_id': userId, 'urls.id': urlId})
			url = url.map(url => {
				return switchObjectKeysCase(url, 'camelCase')
			})
			console.log('userUrlById >>>>', url)
			return url[0]
		}
		catch(e) {
			console.log('pg.userUrlById exception: ', e)
			// return {
			// 	exception: e,
			// 	code: 'EXCEPTION',
			// 	res: []
			// }
			return undefined
		}
	}

	async pages(urlId, userId) {
		try {
			let pages = await pg('pages').join('users_urls', 'users_urls.url_id', '=', 'pages.url_id').select('pages.*').where({'users_urls.url_id': urlId, 'users_urls.user_id': userId})
			pages = pages.map(page => {
				return switchObjectKeysCase(page, 'camelCase')
			})
			return pages
		}
		catch(e) {
			console.log('pg.pages exception: ', e)
			return undefined
		}
	}

	async dirs(urlId, userId) {
		try {
			let dirs = await pg('dirs').join('users_urls', 'users_urls.url_id', '=', 'dirs.url_id').select('dirs.*').where({'users_urls.url_id': urlId, 'users_urls.user_id': userId})
			console.log('primary dirs >>> ', dirs)
			dirs = dirs.map(dir => {
				return switchObjectKeysCase(dir, 'camelCase')
			})
			return dirs
		}
		catch(e) {
			console.log('pg.dirs exception: ', e)
			return undefined
		}
	}

	async dirById(dirId, userId, urlId) {
		try {
			let dir = await pg('dirs').join('users_urls', 'users_urls.url_id', '=', 'dirs.url_id').select('dirs.*').where({'users_urls.url_id': urlId, 'users_urls.user_id': userId, 'dirs.id': dirId})
			console.log('dirById dir >>> ', dir)
			dir = dir.map(dir => {
				return switchObjectKeysCase(dir, 'camelCase')
			})
			return dir
		}
		catch(e) {
			console.log('pg.dirs exception: ', e)
			return undefined
		}
	}

	async dirAssets(dirId, urlId, userId) {
		try {
			console.log('dirId >>>>', dirId)
			console.log('urlId >>>>', urlId)
			console.log('userId >>>>', userId)
			let assets = await pg('assets')
								.join('dirs', 'dirs.id', '=', 'assets.dir_id')
								.join('users_urls', 'users_urls.url_id', '=', 'dirs.url_id')
								.select('assets.*').where({'dirs.id': dirId, 'users_urls.url_id': urlId, 'users_urls.user_id': userId})
			console.log('get dir assets >>> ', assets)
			assets = assets.map(asset => {
				return switchObjectKeysCase(asset, 'camelCase')
			})
			return assets
		}
		catch(e) {
			console.log('pg.dirAssets exception: ', e)
			return undefined
		}
	}

	async pageById(pageId, userId) {
		// try {
		// 	return {
		// 		res: await pg.select().from('pages').where(),
		// 		exception: '',
		// 		code: 'OK'
		// 	}
		// }
		// catch(e) {
		// 	console.log('pg.pageById exception: ', e)
		// 	return {
		// 		exception: e,
		// 		code: 'EXCEPTION',
		// 		res: []
		// 	}
		// }
	}

	async pageByCode(pageCode, userId) {

	}

	async assetUsed(assetId, url, userId) {

	}

	// create
	async createUser(user) {
		try {
			return {...user, id: (await pg('users').insert(new User(user, 'snakeCase')).returning('id'))[0]}
		}
		catch(e) {
			console.log('pg.createUser exception: ', e)
			// !TODO - log exception
			// throw exception
			return undefined;
		}
	}

	async createUrl(url) {
		try {
			return switchObjectKeysCase((await pg.raw('select url_id as id, url_name, owner as is_owner from app_public.create_users_urls(?, ?, ?);', Object.values(switchObjectKeysCase(url, 'snakeCase')))).rows[0], 'camelCase')
			// create root dir
		}
		catch(e) {
			console.log('pg.createUrl exception: ', e)
			// !TODO - log exception
			// throw exception
			return undefined;
		}
	}

	async createPage(page, userId) {
		try {
			return {...page, id: (await pg.raw('select * from app_public.create_pages(?, ?, ?, ?, ?);', Object.values({pageName: page.pageName, pageCode: page.pageCode, urlId: parseInt(page.urlId), subUrl: page.subUrl, user_id: userId}))).rows[0]['create_pages']}
		}
		catch(e) {
			console.log('pg.createPage exception: ', e)
			// !TODO - log exception
			// throw exception
			return undefined;
		}
	}

	async createDir(dir, userId) {
		try {
			return {...dir, id: (await pg.raw('select * from app_public.create_dirs(?, ?, ?, ?, ?);', Object.values({dirName: dir.dirName, parentDir: parseInt(dir.parentDir), isRoot: dir.isRoot, urlId: parseInt(dir.urlId), userId}))).rows[0]['create_dirs']}
		}
		catch(e) {
			console.log('pg.createDir exception: ', e)
			// return {
			// 	exception: e,
			// 	code: 'EXCEPTION',
			// 	res: []
			// }
			return undefined;
		}
	}

	async createAsset(asset) {
		try {
			return {id: (await pg('assets').insert(switchObjectKeysCase(asset, 'snakeCase')).returning('id'))[0]}
		}
		catch(e) {
			console.log('pg.createAsset exception: ', e)
			// !TODO - log exception
			// throw exception
			return undefined;
		}
	}

	

	// update
	async updatePage(page, userId) {

	}

	// delete
	async deleteDir(dirId, url, userId) {

	}

	async deleteAsset(assetId, url, userId) {

	}
}

class User {
	constructor(user, typeCase) {
		Object.keys(user).forEach(key => {
			if (key === 'password') {
				this['password_hash'] = user[key]
			} else if (key === 'password_hash') {
				this['password'] = user[key]
			} else {
				this[switchCase(key, typeCase)] = user[key]
			}
		})
	}
}

module.exports = {
	DB
}
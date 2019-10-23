import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries.js'

export const state = () => ({

})

export const mutations = {
	[types.SET_DIRS] (state, {dirs}) {
		let rootIndex = 0;
		let remainingDirs = [...dirs];
		let orderedDirs = {};
		let paths = [];

		// find root
		rootIndex = dirs.findIndex(dir => dir.isRoot);
		orderedDirs[`${dirs[rootIndex].id}`] = { ...dirs[rootIndex], children: [] };
		paths.push(`${dirs[rootIndex].id}`); // set path to root
		remainingDirs.splice(rootIndex, 1); // remove root from remainingDirs
		console.log('orderedDirs 1 >>> ', orderedDirs)

		// flatten other dirs
		let orderedIndex = 0;
		while(remainingDirs.length) {
			console.log('remainingDirs.length >>> ', remainingDirs.length)
			let path = paths[orderedIndex];
			console.log('paths >>> ', paths)
			console.log('path >>> ', path)
			let parentDir = orderedDirs[path].id;
			console.log('parentDir >>> ', parentDir)

			for (let i = 0; i < remainingDirs.length; i++) {
				console.log('remainingDirs[i] >>> ', remainingDirs[i])

				if (remainingDirs[i].parentDir = parentDir) {
					orderedDirs[path].children.push(remainingDirs[i]);
					orderedDirs[path+'/'+remainingDirs[i].id] = { ...remainingDirs[i], children: []}
					paths.push(path+'/'+remainingDirs[i].id);
					remainingDirs.splice(i,1);
					i--;
					console.log('orderedDirs 2 >>> ', orderedDirs)
					console.log('paths 2 >>> ', paths)
				}
			}
			orderedIndex++
			console.log('orderedIndex 2 >>> ', orderedIndex)
		}
		console.log('orderedDirs >>> ', orderedDirs);
		state.dirs = orderedDirs;
	}
}

export const actions = {
	async getDirs({ commit, rootState }) {
		try {
			if (!rootState.urls.currentUrl) throw new Error('Url not selected')
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.urlsDirs, {urlId: parseInt(rootState.urls.currentUrl.id)});
			if (result) {
				console.log('result >>>> ', result)
				commit(types.SET_DIRS, {dirs: result.dirs})
			} else {
				throw new Error('Internal error')
			}
		}
		catch(e) {
			console.log('getDirs exception >>> ', e)
			throw new Error(e)
		}
	}
}
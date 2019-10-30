import { types } from './mutations-type.js'
import { newGrphQlClient } from './helpers.js'
import { Queries } from './graphQueries.js'

export const state = () => ({
	dirs: {},
	currentDir: '',
	currentChildren: []
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
		state.currentDir = dirs[rootIndex].id.toString(); // set root as starting dir
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
		state.currentChildren = orderedDirs[state.currentDir].children
	},
	[types.SET_CURRENT_DIR](state, {dirId}) {
		// console.log('state.currentDir >>>> ', state.currentDir)
		state.currentDir = state.currentDir+'/'+dirId
		// console.log('state.currentDir >>>> ', state.currentDir)
		state.currentChildren = state.dirs[state.currentDir].children
	},
	[types.CREATE_DIR] (state, dir) {
		state.currentChildren.push({id: dir.id, dirName: dir.dirName, isRoot: false, parentDir: dir.parentDir, urlId: dir.urlId});
		state.dirs[state.currentDir].children = state.currentChildren;
		state.dirs[state.currentDir+'/'+dir.id] = {id: dir.id, dirName: dir.dirName, isRoot: false, parentDir: dir.parentDir, urlId: dir.urlId};
		state.dirs[state.currentDir+'/'+dir.id].children = [];
		// console.log('currentChildren >>>> ', state.currentChildren)
		// console.log('dirs >>>> ', state.dirs)
	},
	[types.CHANGE_PARENT_DIR] (state) {
		// let curDirTemp = state.currentDir.split('/');
		// curDirTemp.pop();
		// console.log('splice >>> ', state.currentDir.split('/').splice(-2,1).join('/'))
		// console.log('state.dirs >>>> ', state.dirs)
		state.currentDir = state.currentDir.split('/').splice(-2,1).join('/')
		// console.log('state.currentDir >>>> ', state.currentDir)
		state.currentChildren = state.dirs[state.currentDir].children;
	}
}

export const actions = {
	async getDirs({ commit, rootState }) {
		try {
			if (!rootState.urls.currentUrl) throw new Error('Url not selected')
			const client = newGrphQlClient({state: rootState})
			const result = await client.request(Queries.urlsDirs, {urlId: parseInt(rootState.urls.currentUrl.id)});
			if (result && result.dirs) {
				console.log('result get dirs>>>> ', result.dirs.map(item => item.dirName+'----'+item.parentDir))
				commit(types.SET_DIRS, {dirs: result.dirs})
			} else {
				throw new Error('Internal error')
			}
		}
		catch(e) {
			console.log('getDirs exception >>> ', e)
			throw new Error(e)
		}
	},
	async createDir({commit, state, rootState}, newDir) {
		try {
			if (!rootState.urls.currentUrl) throw new Error('Url not selected');
			if (!state.currentDir) throw new Error('No current directory');
			const client = newGrphQlClient({state: rootState});
			const parentId = parseInt(state.currentDir.split('/')[state.currentDir.split('/').length - 1]); 
			const dir =  {dirName: newDir.dirName, parentDir: parentId, urlId: parseInt(rootState.urls.currentUrl.id)};
			const result = await client.request(Queries.createDir, {dir});
			if (result && result.createDir) {
				console.log('result create dir >>>> ', result)
				commit(types.CREATE_DIR, result.createDir);
			} else {
				throw new Error('Internal error')
			}
			
		}
		catch(e) {
			console.log('create Dir exception >>>> ', e)
			throw new Error(e)
		}
	}
}
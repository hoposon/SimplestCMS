<template>
</template>

<script>
	export default {
		layout: 'ManageAssets',
		async fetch ({ store }) {
			if (!store.state.urls.urlsInitialized && store.state.user.user && store.state.user.user.token) {
				await store.dispatch('urls/getUrls')
			}			
		}
	}
</script>
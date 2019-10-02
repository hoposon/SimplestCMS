<template>
	
</template>

<script>
	export default {
		layout: 'default',
		async fetch ({ store }) {
			if (store.state.user.user && store.state.user.user.token) {
				await store.dispatch('urls/getUrls')
			}
			
		}
	}
</script>

<style>

</style>

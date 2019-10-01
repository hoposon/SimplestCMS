<template>
	
</template>

<script>
	export default {
		layout: 'default',
		async fetch ({ store }) {
			await store.dispatch('urls/getUrls')
		}
	}
</script>

<style>

</style>

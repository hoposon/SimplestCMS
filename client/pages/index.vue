<template>
	
</template>

<script>
	// import { mapActions } from 'vuex'

	export default {
		layout: 'default',
		// methods: {
		// 	...mapActions({
		// 		getUrls: 'urls/getUrls'
		// 	})
		// },
		// beforeUpdate() {
		// 	console.log('beforeUpdate')
		// 	this.getUrls();
		// },
		async fetch ({ store }) {
			await store.dispatch('urls/getUrls')
		}
	}
</script>

<style>

</style>

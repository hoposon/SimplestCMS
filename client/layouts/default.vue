<template>
  	<div v-if='token'>
		<Modal v-if='ModalsState.show'/>
		<NavigationBarMain />
		<!-- <ManageContent v-if='manageContentRoute' /> -->
    	<nuxt />
  	</div>
</template>

<script>

	import { mapState } from 'vuex';

	import NavigationBarMain from '../components/NavigationBarMain'
	import Modal from '../components/modals/Modal';
	// import ManageContent from '../components/ManageContent';


	export default {
		components: {
			NavigationBarMain,
			Modal,
			// ManageContent
		},
		computed: {
			// manageContentRoute() {
			// 	console.log('this.$router.currentRoute.path >>> ', this.$router.currentRoute.path)
			// 	return this.$router.currentRoute.path === '/ManageContent'
			// },
			...mapState({
				token: state => state.user.user.token,
				ModalsState: state => state.ModalsState,
				currentUrl: state => state.urls.currentUrl
			})
		},
		mounted() {
			if (!this.token) {
				this.$router.push('/login');
			}
			if (this.currentUrl) {
				this.$router.push('/ManageContent');
			}
		}
	}
</script>

<style>

	html {
		font-family: Roboto, 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
		font-size: 16px;
		word-spacing: 1px;
		-ms-text-size-adjust: 100%;
		-webkit-text-size-adjust: 100%;
		-moz-osx-font-smoothing: grayscale;
		-webkit-font-smoothing: antialiased;
		box-sizing: border-box;
		}

	.content {
		background-color: #ebebeb;
	}
</style>
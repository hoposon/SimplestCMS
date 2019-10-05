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


</style>
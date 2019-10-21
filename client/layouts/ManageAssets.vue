<template>
  	<div v-if='token'>
		<Modal v-if='ModalsState.show'/>
		<NavigationBarMain />
		<ManageAssets />
    	<nuxt />
  	</div>
</template>

<script>

	import { mapState } from 'vuex';

	import NavigationBarMain from '../components/NavigationBarMain'
	import Modal from '../components/modals/Modal';
	import ManageAssets from '../components/ManageAssets';


	export default {
		components: {
			NavigationBarMain,
			Modal,
			ManageAssets
		},
		computed: {
			...mapState({
				token: state => state.user.user.token,
				ModalsState: state => state.ModalsState
			})
		},
		mounted() {
			if(!this.token) {
				this.$router.push('/login');
			}
		}
	}
</script>

<style>

</style>
<template>
  	<div v-if='token'>
		<NavigationBarMain />
		<ManageContent />
    	<nuxt />
		<Modal v-if='ModalsState.show'/>
  	</div>
</template>

<script>

	import { mapState } from 'vuex';

	import NavigationBarMain from '../components/NavigationBarMain'
	import Modal from '../components/modals/Modal';
	import ManageContent from '../components/ManageContent';


	export default {
		components: {
			NavigationBarMain,
			Modal,
			ManageContent
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
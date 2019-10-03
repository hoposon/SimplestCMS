<template>
	<button class='btn-custom my-3 mb-4' @click='addPage'>Add Page</button>
</template>

<script>
	import { mapMutations } from 'vuex';
	export default {
		methods: {
			addPage() {
				let options = {
					modalName: 'AddPageModal',
					show: true
				}
				this.showModal(options);
			},
			...mapMutations({
				showModal: 'SET_MODAL',
			})
		}
	}
</script>
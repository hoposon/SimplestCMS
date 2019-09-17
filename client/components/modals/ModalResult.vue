<template>

	<div class="modal-result">
		<div v-if="result === 'inProgress'" class="modal-result-progress">
			<!-- <p><i class="icon -tick-circle color-ok -text"></i></p>
			<h2 class="h2">{{ translate(`at.mod.res.inProgress.header`) }}</h2>
			<p class="message">{{ translate(`at.mod.res.inProgress.message.${modalTransl}`) }}</p> -->
		</div>
		<div v-else-if="result === 'sentSuccessful'" class="modal-result-success">
			<!-- <p><i class="icon -tick-circle color-ok -text"></i></p> -->
			<h2 class="h2">{{ modalTransl }}</h2>
			<!-- <p class="message">{{ translate(`at.mod.res.sentSuccessful.message.${modalTransl}`) }}</p> -->
		</div>
		<div v-if="result === 'error'" class="modal-result-error">
			<!-- <p><i class="icon -error-exclamation color-danger -text" :class='{"-exclamation-outline": brand==="avg", "-attention-circle": brand!=="avg"}'></i></p> -->
			<h2 class="h2">Error</h2>
			<!-- <p class="message">{{ translate(`at.mod.res.error.message.${modalTransl}`) }}</p> -->
		</div>
		<div class="modal-footer">
			<button class="btn btn-secondary" @click='$emit("close")'>Cancel</button>
		</div>
	</div>

</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'ModalResult',
		computed: {
			modalTransl() {
				// return this.ModalsState.params.transl;
				return 'URL successfully created';
			},
			result() {
				return this.ModalsState.result;
			},
			...mapState([
				'ModalsState'
			])
		}
	}

</script>
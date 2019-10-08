<template>
	<div class="modal-body">
		<h5 class="modal-title">{{ resultTitle }}</h5>
		<div class="modal-result">
			<div v-if="result === 'inProgress'" class="modal-result-progress">
				<!-- <p><i class="icon -tick-circle color-ok -text"></i></p>
				<h2 class="h2">{{ translate(`at.mod.res.inProgress.header`) }}</h2>
				<p class="message">{{ translate(`at.mod.res.inProgress.message.${modalTransl}`) }}</p> -->
			</div>
			<div v-else-if="result === 'sentSuccessful'" class="modal-result-success">
				<!-- <p><i class="icon -tick-circle color-ok -text"></i></p> -->
				<h5>{{ successMessage }}</h5>
				<!-- <p class="message">{{ translate(`at.mod.res.sentSuccessful.message.${modalTransl}`) }}</p> -->
			</div>
			<div v-if="result === 'error'" class="modal-result-error">
				<!-- <p><i class="icon -error-exclamation color-danger -text" :class='{"-exclamation-outline": brand==="avg", "-attention-circle": brand!=="avg"}'></i></p> -->
				<h5>Error</h5>
				<!-- <p class="message">{{ translate(`at.mod.res.error.message.${modalTransl}`) }}</p> -->
			</div>
			<div class="modal-footer">
				<button class="btn btn-custom" @click='$emit("close")'>OK</button>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		name: 'ModalResult',
		computed: {
			resultTitle() {
				return this.ModalsState.params.transl;
				// return 'URL successfully created';
			},
			successMessage() {
				return this.ModalsState.params.translResSuccess;
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
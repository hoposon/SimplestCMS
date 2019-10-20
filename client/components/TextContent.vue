<template>
	<div class="text-content-type offset-1 col-10">
		<form class="offset-1 col-10">
			<h4 class="heading">Text content</h4>
			<div class="form-group">
				<label for="nameInput">Content Name:</label>
				<input type="text" class="form-control" id="nameInput" placeholder="Content name" v-model='cLocal.data.csName' @input='cLocal.changed=true, cLocal.data.csCode = genCode(cLocal.data.csName)'>
			</div>
			<div class="form-group">
				<label for="codeInput">Content Code:</label>
				<input type="text" class="form-control" id="nameInput" v-model='cLocal.data.csCode'>
			</div>
			<div class="form-group">
				<label for="contentTextArea">Content text:</label>
				<textarea class="form-control" id="contentTextArea" rows="5" v-model='cLocal.data.csValue' @input='changed=true'></textarea>
			</div>
			<div class="actions d-flex">
				<div v-if='cLocal.changed'>
					<button class="btn btn-primary">Save</button>
				</div>
				<div>
					<button class="btn btn-primary">Delete</button>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';
	export default {
		props: [
			'content'
		],
		data() {
			return {
				cLocal: JSON.parse(JSON.stringify(this.content)),
			}
		},
		computed: {
			...mapGetters({
				genCode: 'genCode'
			})
		},
		methods: {
			
		}
	}
</script>

<style>
	.text-content-type {
		background-color: var(--acc-light-col);
		border-radius: 4px;
		padding: 30px 0 35px 0;
		box-shadow: 0px 0px 10px 0px var(--shade-for-light-col);
		margin-bottom: 35px;
	}

	.text-content-type .heading {
		color: var(--main-col);
		margin-bottom: 20px;
	}
</style>
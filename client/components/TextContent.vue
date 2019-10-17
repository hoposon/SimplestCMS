<template>
	<div class="text-content-type offset-1 col-10">
		<form class="offset-1 col-10">
			<h4 class="heading">Text content</h4>
			<div class="form-group">
				<label for="nameInput">Content Name:</label>
				<input type="text" class="form-control" id="nameInput" placeholder="Content name" v-model='cLocal.name' @input='changed=true'>
			</div>
			<div class="form-group">
				<label for="codeInput">Content Code:</label>
				<input type="text" class="form-control" id="nameInput" placeholder="Content name" v-model='cLocal.code' @input='changed=true'>
			</div>
			<div class="form-group">
				<label for="contentTextArea">Content text:</label>
				<textarea class="form-control" id="contentTextArea" rows="5" v-model='cLocal.value' @input='changed=true'></textarea>
			</div>
			<div v-if='changed'>
				<button type="submit" class="btn btn-primary">Save</button>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		props: [
			'content'
		],
		data() {
			return {
				cLocal: JSON.parse(JSON.stringify(this.content)),
				changed: false
			}
		},
		methods: {
			changed() {
				
			}
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
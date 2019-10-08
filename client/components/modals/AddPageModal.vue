<template>
	<div class="modal-body">
		<h5 class="modal-title">Add new page</h5>
		<div class="modal-data">
			<div class="form-row">
				<label for="newPage">Enter page name:</label>
				<input ref="newPage" id="newPage" type="text" class="form-control" placeholder="Add page" v-model='pageName' />
				<div class="invalid-feedback">
					Please enter valid page name.
				</div>
			</div>
			<div class="form-row">
				<label for="newPageSubUrl">Page code:</label>
				<input ref="newPageSubUrl" id="newPageSubUrl" type="text" class="form-control" disabled v-model='pageCode'/>
				<div class="invalid-feedback">
					Please enter valid sub URL string.
				</div>
			</div>
			<div class="form-row">
				<label for="newPageSubUrl">Enter sub URL:</label>
				<input ref="newPageSubUrl" id="newPageSubUrl" type="text" class="form-control" placeholder="/suburl1/suburl2/" />
				<div class="invalid-feedback">
					Please enter valid sub URL string.
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal" @click='$emit("close")'>Cancel</button>
			<button type="button" class="btn btn-custom" @click='send()'>Save changes</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				pageName: ''
			}
		},
		computed: {
			pageCode() {
				const regCode = /[^A-Za-z0-9]/g;
				return this.pageName.replace(regCode, '-')
			}	
		},
		methods: {
			async send() {
				try {
					if (this.validatePage()) {
						let result = await this.createPage({
							pageName: this.$refs.newPage.value,
							subUrl: this.$refs.newPageSubUrl.value});
						this.setModalState({result: 'sentSuccessful'});
					}
				}
				catch(e) {
					console.log(e)
					this.setModalState({result: 'error'});
				}
			},
			validatePage() {
				// pageName
				const regPage = /^[A-Za-z0-9- /[\]]+$/i; // eslint-disable-line no-useless-escape
				const regSubUrl = /^[A-Za-z0-9-/[\]]*$/i; // eslint-disable-line no-useless-escape
				if (this.$refs.newPage.value && regPage.test(this.$refs.newPage.value)) {
					this.$refs.newPage.classList.remove('is-invalid');
					this.$refs.newPage.classList.add('is-valid');
					if (regSubUrl.test(this.$refs.newPageSubUrl.value)) {
						this.$refs.newPageSubUrl.classList.remove('is-invalid');
						this.$refs.newPageSubUrl.classList.add('is-valid');
						return true
					} else {
						this.$refs.newPageSubUrl.classList.add('is-invalid');
						return false
					}
				} else {
					this.$refs.newPage.classList.add('is-invalid');
					return false;
				}
			},
			...mapActions({
				createPage: 'pages/createPage'
			}),
			...mapMutations({
				setModalState: 'SET_MODAL_RESULT'
			})
		}
	}
</script>
<template>
	<div class="modal-body">
		<h5 class="modal-title">Add new page</h5>
		<div class="modal-data">
			<div id="newPage" class="form-row">
				<label for="newPage">Enter page name:</label>
				<input ref="newPage" type="text" placeholder="Add page" />
				<div class="invalid-feedback">
					Please enter valid page name.
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal" @click='$emit("close")'>Cancel</button>
			<button type="button" class="btn btn-primary" @click='send()'>Save changes</button>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapMutations } from 'vuex';
	export default {
		methods: {
			async send() {
				try {
					if (this.$refs.newPage.value && this.validatePageName(this.$refs.newPage.value)) {
						// let result = await this.createUrl({urlName: this.$refs.newUrl.value});
						this.setModalState({result: 'sentSuccessful'});
					}
				}
				catch(e) {
					this.setModalState({result: 'error'});
				}
			},
			validatePageName(pageName) {
				const reg = /^([A-Z]+|\.+)+$/i; // eslint-disable-line no-useless-escape
				if (reg.test(pageName)) {
					document.querySelector('#newPage').classList.remove('invalid')
					return true;
				} else {
					document.querySelector('#newPage').classList.add('invalid')
					return false;
				}
			},
			...mapActions({
				createUrl: 'urls/createUrl'
			}),
			...mapMutations({
				setModalState: 'SET_MODAL_RESULT'
			})
		}
	}
</script>
<template>
	<div class="modal-body">
		<h5 class="modal-title">Modal title</h5>
		<div class="modal-data">
			<div id="newUrl" class="form-row">
				<label for="newUrl">Enter new url:</label>
				<input ref="newUrl" type="text" placeholder="New url" />
				<div class="invalid-feedback">
					Please enter valid url.
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
	import { mapState, mapActions, mapMutations } from 'vuex';
	export default {
		methods: {
			async send() {
				try {
					if (this.$refs.newUrl.value && this.validateUrl(this.$refs.newUrl.value)) {
						let result = await this.createUrl({urlName: this.$refs.newUrl.value});
						this.setModalState({result: 'sentSuccessful'});
					}
				}
				catch(e) {
					this.setModalState({result: 'error'});
				}
			},
			validateUrl(url) {
				const reg = /^([A-Z]+|\.+)+$/i; // eslint-disable-line no-useless-escape
				if (reg.test(url)) {
					document.querySelector('#newUrl').classList.remove('invalid')
					return true;
				} else {
					document.querySelector('#newUrl').classList.add('invalid')
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
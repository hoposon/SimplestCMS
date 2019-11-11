<template>
	<div class="modal-body">
		<h5 class="modal-title">Create directory</h5>
		<div class="modal-data">
			<div Class="form-row">
				<label for="newDir">Enter directory name:</label>
				<input ref="newDir" id="newDir" class="form-control" type="text" placeholder="Directory name" v-model='dirName'/>
				<div class="invalid-feedback">
					Please enter valid directory name.
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal" @click='$emit("close")'>Cancel</button>
			<button type="button" class="btn btn-custom" @click='send()' tabindex="1">Create directory</button>
		</div>
	</div>
</template>

<script>
	const ENTER = 13;
	import { mapActions, mapMutations } from 'vuex';
	export default {
		data() {
			return {
				bindedKeydownHandler: undefined,
				dirName: ''
			}
		},
		methods: {
			sendOnEnter(event) {
				if (event.type === 'keydown' && event.keyCode === ENTER) {
					this.send();
				}
			},
			async send() {
				try {
					if (this.dirName && this.validateDir(this.dirName)) {
						let result = await this.createDir({dirName: this.dirName});
						this.setModalState({result: 'sentSuccessful'});
					}
				}
				catch(e) {
					this.setModalState({result: 'error'});
				}
			},
			validateDir(dirName) {
				const DIR_LENGTH = 200;
				const dirValidationRegExp = `^[a-zA-Z0-9-]{1,${DIR_LENGTH}}$`; // eslint-disable-line no-useless-escape
				if (new RegExp(dirValidationRegExp, 'i').test(dirName)) {
					this.$refs.newDir.classList.remove('is-invalid');
					return true;
				} else {
					this.$refs.newDir.classList.add('is-invalid');
					return false;
				}
			},
			...mapActions({
				createDir: 'assets/createDir'
			}),
			...mapMutations({
				setModalState: 'SET_MODAL_RESULT'
			})
		},
		mounted: function() {
			this.bindedKeydownHandler = this.sendOnEnter.bind(this);
			window.addEventListener('keydown', this.bindedKeydownHandler);

			this.$refs.newDir.focus();
		},
		destroyed: function() {
			window.removeEventListener('keydown', this.bindedKeydownHandler);
		}
	}
</script>
<template>
	<div class="modal-body">
		<h5 class="modal-title">Add new URL</h5>
		<div class="modal-data">
			<div Class="form-row">
				<label for="newUrl">Enter new url:</label>
				<input ref="newUrl" id="newUrl" class="form-control" type="text" placeholder="New url" v-model='urlName'/>
				<div class="invalid-feedback">
					Please enter valid url.
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal" @click='$emit("close")'>Cancel</button>
			<button type="button" class="btn btn-custom" @click='send()' tabindex="1">Create url</button>
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
				urlName: ''
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
					if (this.urlName && this.validateUrl(this.urlName)) {
						let result = await this.createUrl({urlName: this.urlName});
						this.setModalState({result: 'sentSuccessful'});
					}
				}
				catch(e) {
					this.setModalState({result: 'error'});
				}
			},
			validateUrl(url) {
				URL_LENGTH = 250;
				const urlValidateRexExp = /^((https?:\/\/(?:www\.|(?!www))(([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3})|(www\.(([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3})|((([a-zA-Z0-9]+\.)+)[a-zA-Z]{2,3}))$/;
				if (urlValidateRexExp.test(url) && url.length <= URL_LENGTH) {
					this.$refs.newUrl.classList.remove('is-invalid');
					// document.querySelector('#newUrl').classList.remove('invalid')
					return true;
				} else {
					this.$refs.newUrl.classList.add('is-invalid');
					// document.querySelector('#newUrl').classList.add('invalid')
					return false;
				}
			},
			...mapActions({
				createUrl: 'urls/createUrl'
			}),
			...mapMutations({
				setModalState: 'SET_MODAL_RESULT'
			})
		},
		mounted: function() {
			this.bindedKeydownHandler = this.sendOnEnter.bind(this);
			window.addEventListener('keydown', this.bindedKeydownHandler);

			this.$refs.newUrl.focus()
		},
		destroyed: function() {
			window.removeEventListener('keydown', this.bindedKeydownHandler);
		}	
	}
</script>
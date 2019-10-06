<template>
	<div class="modal" id="modalOverlay" @click='hide($event)'>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-close">
					<button type="button" class="close" @click='close()'>
						<span>&times;</span>
					</button>
				</div>
				<ModalResult v-if='ModalsState.commandSent' v-on:close='close()' />
				<CreateUrlModal v-else-if='ModalsState.modalName === "CreateUrlModal"' v-on:close='close()' />
				<AddPageModal v-else-if='ModalsState.modalName === "AddPageModal"' v-on:close='close()' />
			</div>
		</div>
	</div>
</template>

<script>
	const ESCAPE = 27;
	import { mapState, mapMutations } from 'vuex';
	import ModalResult from './ModalResult';
	import CreateUrlModal from './CreateUrlModal';
	import AddPageModal from './AddPageModal';

	export default {
		components: {
			ModalResult,
			CreateUrlModal,
			AddPageModal
		},
		data () {
			return {
				bindedKeydownHandler: undefined
			}
		},
		computed: {
			...mapState({
				ModalsState: state => state.ModalsState
			})
		},
		methods: {
			hide(event) {
				if (event.type === 'click' && event.target.id === 'modalOverlay') {
					this.close(this.ModalsState.modalName, false);
				}
				if (event.type === 'keydown' && event.keyCode === ESCAPE) {
					this.close(this.ModalsState.modalName, false);
				}
			},
			...mapMutations({
				close: 'SET_MODAL'
			})
		},
		mounted: function() {
			this.bindedKeydownHandler = this.hide.bind(this);
			window.addEventListener('keydown', this.bindedKeydownHandler);
		},
		destroyed: function() {
			window.removeEventListener('keydown', this.bindedKeydownHandler);
		}	
	}
</script>

<style>
	.modal {
		display: block;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		outline: 0;
		background-color: var(--modal-overlay);
		color: var(--shades-dark-col);
	}

	.modal .modal-close {
		position: absolute;
		top: 15px;
		right: 20px;
		z-index: 1000;
	}

	.modal .modal-body {
		padding: 40px;
	}

	.modal .modal-title {
		/* width: 50%; */
		color: var(--main-col);
	}

	.modal .modal-data {
		padding: 30px 0px;
	}

	.modal .form-row {
		display: flex;
		align-items: baseline;
		margin: 15px auto;
	}

	.modal label {
		margin-right: 15px;
	}

	.modal .modal-footer {
		/* padding-right: 0; */
		border: none;
	}

	.modal .modal-result {
		padding-top: 40px;
	}
	.modal .modal-result:nth-child(0) {
		display: flex;
		flex-direction: column;
		align-items:  center;
	}

	.modal .form-row.invalid input {
		padding-right: calc(1.5em + 0.75rem);
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc354…%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
		background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
		border-color: rgb(220, 53, 69);
		background-repeat: no-repeat;
		background-position: right calc(0.375em + 0.1875rem) center;
	}

	/* .modal .modal-footer .btn-primary{
		
	} */
</style>

<template>
	<div class="modal" id="modalOverlay" @click='hide($event)'>
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Modal title</h5>
					<button type="button" class="close" @click='close()'>
						<span>&times;</span>
					</button>
				</div>
				<div class="modal-body">
					...
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
					<button type="button" class="btn btn-primary">Save changes</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	const ESCAPE = 27;
	import { mapState, mapMutations } from 'vuex';
	export default {
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
		background-color: #2d92b09c;
	}
</style>

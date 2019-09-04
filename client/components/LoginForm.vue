<template>
	<form class="login-form col-8 offset-2 col-md-4 offset-md-4 needs-validation" novalidate>
		<div id='loginEmail' class="form-row">
			<div class="col-md-12 mb-3">
				<label for="validationCustomUsername">Username</label>
				<div class="input-group">
					<div class="input-group-prepend">
					<span class="input-group-text" id="inputGroupPrepend">@</span>
					</div>
					<input type="email" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required v-model='email' @input='validate(email, "email", "loginEmail")'>
					<div class="invalid-feedback">
						Please enter valid email.
					</div>
				</div>
			</div>
		</div>
		<div id='loginPassword' class="form-row">
			<div class="col-md-12 mb-3">
				<label for="validationCustom01">Password</label>
				<input type="password" class="form-control" id="validationCustom01" value="" required v-model='password' @input='validate(password, "password", "loginPassword")'>
				<div class="invalid-feedback">
					Please enter your password.
				</div>
			</div>
		</div>
		<button class="btn btn-warning btn-block mt-3 mr-1" type="submit" @click='userLogin($event)'>Log In</button>
	</form>
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		data() {
			return {
				email: '',
				password: ''
			}
		},
		methods: {
			async userLogin(event) {
				try {
					event.preventDefault();
					if (await this.validate({value: this.email, type: 'email', selector: 'loginEmail'}) && await this.validate({value: this.password, type: 'password', selector: 'loginPassword'})) {
						const result = await this.login({email: this.email, password: this.password});
						this.$router.push('/')
					}
				}
				catch(e) {
					console.log('component login exception: ', e)
				}
				
							
			},
			...mapActions({
				login: 'user/login',
				validate: 'user/validate'
			})
		}
	}
</script>

<style>

	.login-form {
		padding: 40px;
		border: 1px solid #d1d0d0;
		box-shadow: 2px 3px 14px 0px #d1d0d0;
		border-radius: 20px;
		margin-top: -28px;
	}

	.form-row.invalid input {
		padding-right: calc(1.5em + 0.75rem);
		background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='%23dc354…%3e%3ccircle cy='3' r='.5'/%3e%3ccircle cx='3' cy='3' r='.5'/%3e%3c/svg%3E");
		background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem);
		border-color: rgb(220, 53, 69);
		background-repeat: no-repeat;
		background-position: right calc(0.375em + 0.1875rem) center;
	}

	.form-row.invalid .invalid-feedback {
		display: block;
	}

</style>
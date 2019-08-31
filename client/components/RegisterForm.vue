<template>
	<form class="register-form col-4 offset-4 needs-validation" novalidate>
		<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="validationCustomUsername">Username</label>
				<div class="input-group">
					<div class="input-group-prepend">
					<span class="input-group-text" id="inputGroupPrepend">@</span>
					</div>
					<input type="text" class="form-control" id="validationCustomUsername" placeholder="Username" aria-describedby="inputGroupPrepend" required>
					<div class="invalid-feedback">
						Please choose a username.
					</div>
				</div>
			</div>
		</div>
		<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="validationCustom01">First name</label>
				<input type="text" class="form-control" id="validationCustom01" placeholder="First name" value="Mark" required>
				<div class="valid-feedback">
					Looks good!
				</div>
			</div>
		</div>
		<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="validationCustom02">Last name</label>
				<input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required>
				<div class="valid-feedback">
					Looks good!
				</div>
			</div>
		</div>
		<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="validationCustom02">Nick name</label>
				<input type="text" class="form-control" id="validationCustom02" placeholder="Last name" value="Otto" required>
				<div class="valid-feedback">
					Looks good!
				</div>
			</div>
		</div>
		<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="validationCustom02">Enter Password</label>
				<input type="password" class="form-control" id="validationCustom02" value="" required>
				<div class="valid-feedback">
					Looks good!
				</div>
			</div>
		</div>
		<div class="form-row">
			<div class="col-md-12 mb-3">
				<label for="validationCustom02">Repeat password</label>
				<input type="password" class="form-control" id="validationCustom02"  value="" required>
				<div class="valid-feedback">
					Looks good!
				</div>
			</div>
		</div>
		<button class="btn btn-primary" type="submit">Submit form</button>
	</form>
</template>

<script>
	export default {
		
	}
</script>

<style>

	.register-form {
		padding: 40px;
		border: 1px solid #d1d0d0;
		box-shadow: 2px 3px 14px 0px #d1d0d0;
		border-radius: 20px;
		margin-top: -124px;
	}

</style>
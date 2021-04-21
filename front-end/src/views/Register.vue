<template>
	<div>
		<h1>Create Account</h1>
		<div class="login-container-two">
			<div class="login-box-two">
				<div class="email-container login-detail">
					<p class="input-label">First Name</p>
					<input class="input-box" v-model="firstName"/>
				</div>
				<div class="email-container login-detail">
					<p class="input-label">Last Name</p>
					<input class="input-box" v-model="lastName"/>
				</div>
				<div class="email-container login-detail" id="email-container">
					<p class="input-label">Email</p>
					<input class="input-box" id="email-input"  v-model="email"/>
				</div>
				<div class="confirm-password-container login-detail"> <!-- password-container-two"> -->
					<p class="input-label">Password</p>
					<input class="input-box" id="password-input" v-model="password"/>
				</div>
<!--				<div class="confirm-password-container login-detail">-->
<!--					<p>Confirm</p>-->
<!--					<input id="confirm-password-input"/>-->
<!--				</div>-->

			</div>
			<p v-if="error" class="error">{{error}}</p>
			<button @click.prevent="register()" id="account-submit-button">Submit</button>
			<!--    <input id="account-submit-button" type="submit" value="Submit"/>-->
		</div>
	</div>

</template>

<script>
import axios from "axios";

export default {
	name: "Register",
	data() {
		return {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			error: '',
		}
	},
	methods: {
		async register() {
			this.error = '';
			if (!this.firstName || !this.lastName || !this.email || !this.password) {
				this.error = "Please fill all fields. :)";
				return;
			}
			try {
				let response = await axios.post('/api/users', {
					firstName: this.firstName,
					lastName: this.lastName,
					email: this.email,
					password: this.password,
				});
				this.$root.$data.user = response.data.user;
				this.$router.push({name: 'Forum'})
			} catch (error) {
				this.error = error.response.data.message;
				this.$root.$data.user = null;
			}
		},
	}
}
</script>

<style scoped>

h1 {
	text-align: center;
	margin: 30px;
	margin-bottom: 0;
	font-size: 50px;
	text-decoration: underline;
}

.login-container, .login-container-two {
	/*background-color: goldenrod;*/
	/*border: purple 6px solid;*/
	display: flex;
	justify-content: center;
	align-items: center;
}

.login-container-two {
	flex-direction: column;
	justify-content: center !important;
}

.login-box, .login-box-two {
	justify-content: center;
	flex-direction: column;
	align-items: center;
	display: flex;
	/*padding: 20px;*/
	margin: 60px 70px;
	/*background-color: lightgrey;*/
	/*border: 2px solid black;*/
	border: goldenrod 4px solid;
	background: bisque;
	margin-bottom: 0;
}

.login-box-two {
	margin-top: 50px;
	margin-bottom: 20px;
}

.input-box {
	font-family: "monaco", monospace;
	font-size: 20px;
	background: papayawhip;
	border: goldenrod 2px solid;
	/*margin: 20px 30px 20px 20px;*/
	margin: 10px;
	padding: 3px 7px;
	margin-left: 0;
}

.input-label {
	font-size: 25px;
}

#account-submit-button {
	/*color: darkgoldenrod;*/
	background-color: bisque;
	border: goldenrod 4px solid;
	/*margin: 12px;*/
	text-align: center;
	padding: 10px;
	margin-top: 25px;
	margin-bottom: 50px;
}


.login-outer-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.email-container, .password-container-two, .email-container {
	/*border-bottom: #132020 2px solid;*/
	border-bottom: goldenrod 4px solid;
	width: 100%;
}

.email-container, .password-container, .login-detail {
	/*border: 2px solid #00ffff;*/
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px
}

.email-container > p, .password-container > p, .login-detail > p {
	padding-right: 20px;
	margin-bottom: 0;
	padding-bottom: 0;
}

.create-account-option {
	display: flex;
	justify-content: flex-start;
	width: 85%;
	margin-left: 70px;
}

#createAccount {
	margin-bottom: 40px;
	color: black;
	font-family: monospace;
	font-size: 15px;
	color: #a57940;

}

.error {
	color: red;
}

@media only screen and (max-width: 900px) {
	.login-container {
		display: flex;
		flex-direction: column-reverse;
		justify-content: center;
		align-items: center;
	}
}

@media only screen and (max-width: 600px) {
	.login-box-two {
		margin-left: 10px;
		margin-right: 10px;
	}
	.login-detail {
		padding: 10px;
		margin: 0;
	}
	.username-container, .password-container {
		margin: 0;
		padding: 10px;
	}
	.input-box{
		width: 175px
	}
}

</style>
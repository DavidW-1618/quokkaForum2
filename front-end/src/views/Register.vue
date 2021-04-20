<template>
	<div>
		<h1>Create Account</h1>
		<div class="login-container-two">
			<div class="login-box-two">
				<div class="email-container login-detail">
					<p>First Name</p>
					<input v-model="firstName"/>
				</div>
				<div class="email-container login-detail">
					<p>Last Name</p>
					<input v-model="lastName"/>
				</div>
				<div class="email-container login-detail" id="email-container">
					<p>Email</p>
					<input id="email-input"  v-model="username"/>
				</div>
				<div class="confirm-password-container login-detail"> <!-- password-container-two"> -->
					<p>Password</p>
					<input id="password-input" v-model="password"/>
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
			username: '',
			password: '',
			error: '',
		}
	},
	methods: {
		async register() {
			this.error = '';
			if (!this.firstName || !this.lastName || !this.username || !this.password) {
				this.error = "Please fill all fields. :)";
				return;
			}
			try {
				let response = await axios.post('/api/users', {
					firstName: this.firstName,
					lastName: this.lastName,
					username: this.username,
					password: this.password,
				});
				this.$root.$data.user = response.data.user;
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
	background-color: lightgrey;
	border: 2px solid black;
	margin-bottom: 0;
}

.login-box-two {
	margin-top: 50px;
	margin-bottom: 20px;
}

#account-submit-button {
	/*background-color: bisque;*/
	/*margin: 12px;*/
	text-align: center;
	padding: 10px;

	margin-bottom: 70px;
}


.login-outer-box {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.username-container, .password-container-two, .email-container {
	border-bottom: #132020 2px solid;
	width: 100%;
}

.username-container, .password-container, .login-detail {
	/*border: 2px solid #00ffff;*/
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 20px
}

.username-container > p, .password-container > p, .login-detail > p {
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

	.quokka-couple {
		margin-top: 60px;
		width: 330px;
	}
}

</style>
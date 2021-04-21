<template>
	<div class="login-body-box">
		<h1>Login</h1>
		<div class="login-container">
			<div class="login-outer-box">
					<div class="login-box">
						<div class="username-container">
							<p class="input-label">Email</p>
							<input class="input-box" id="username-input" v-model="emailLogin" />
						</div>
						<div class="password-container">
							<p class="input-label">Password</p>
							<input class="input-box" id="password-input" v-model="passwordLogin" />
						</div>
					</div>
					<div class="create-account-option">
						<router-link class="login-box-buttons" to="/register">Become a
							Quokka!</router-link>
						<p class="login-box-buttons" @click.prevent="login()">Login</p>
					</div>

			</div>
			<img class="quokka-couple" src="/images/quokka-couple.jpg">
<!--			TODO: Make sure this picture keeps working. -->
		</div>
		<p v-if="errorLogin" class="error">{{errorLogin}}</p>
		<!-- Todo: Move this! -->
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "Login",
	data() {
		return {
			emailLogin: '',
			passwordLogin: '',
			errorLogin: '',
		}
	},
	methods: {
		async login() {
			this.errorLogin = '';
			if (!this.emailLogin || !this.passwordLogin)
				return;
			try {
				let response = await axios.post('/api/users/login', {
					email: this.emailLogin,
					password: this.passwordLogin,
				});
				this.$root.$data.user = response.data.user;
				this.$router.push({name: 'Forum'})
			} catch (error) {
				this.errorLogin = "Error: " + error.response.data.message;
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

.login-body-box {
	display: flex;
	flex-direction: column;
	align-items: center;
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
	/*background-color: lightgrey;*/
	/*border: 2px solid black;*/
	border: goldenrod 4px solid;
	background: bisque;
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
	margin: 60px 70px;
	margin-bottom: 40px;
}

.username-container, .password-container-two, .email-container {
	/*border-bottom: #132020 2px solid;*/
	border-bottom: goldenrod 4px solid;
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
	justify-content: space-between;
	align-items: center;
	width: 100%;
	/*width: 85%;*/
	/*margin-left: 70px;*/
}

.login-box-buttons {
	/*color: black;*/
	margin: 12px 6px;
	text-decoration: underline;
	font-family: monospace;
	font-size: 21px;
	color: #a57940;
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

/*.create-account-option {*/
/*	display: flex;*/
/*	justify-content: flex-start;*/
/*	width: 85%;*/
/*	margin-left: 70px;*/
/*}*/

/*#createAccount {*/
/*	!*margin-bottom: 40px;*!*/
/*	color: black;*/
/*	font-family: monospace;*/
/*	font-size: 18px;*/
/*	color: #a57940;*/

/*}*/

.error {
	color: red;
	font-size: 22px;
	margin-top: 0;
	padding-top: 0;
	margin-bottom: 50px;
}

.quokka-couple {
	width: 295px;
	margin: 10px 70px;
	border: 2px solid black;
	margin-bottom: 40px;
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
		margin-bottom: 10px;
		width: 330px;
	}
}

@media only screen and (max-width: 600px) {
	.quokka-couple {
		margin-left: 10px;
		margin-right: 10px;
	}
	.login-outer-box {
		margin-left: 10px;
		margin-right: 10px;
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
<template>
	<div>
		<h1>Login</h1>
		<div class="login-container">
			<div class="login-outer-box">
				<div class="login-box">
					<div class="username-container">
						<p>Email</p>
						<input id="username-input"/>
					</div>
					<div class="password-container">
						<p>Password</p>
						<input id="password-input"/>
					</div>
				</div>
				<div class="create-account-option">
					<router-link to="/register" id="createAccount">Become a Quokka!</router-link>
				</div>
			</div>
			<img class="quokka-couple" src="/images/quokka-couple.jpg">
<!--			TODO: Make sure this picture keeps working. -->
		</div>
	</div>
</template>

<script>
export default {
	name: "Login"
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
	font-size: 18px;
	color: #a57940;

}

.quokka-couple {
	width: 295px;
	margin: 10px 70px;
	border: 2px solid black;
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
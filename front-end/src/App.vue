<template>
	<div id="app">
		<div id="nav" class="navbar navbar-expand-lg navbar-dark bg-dark">
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
					aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarNav">
				<ul class="navbar-nav">
					<li class="nav-item">
						<a class="nav-link">Home</a>
					</li>
					<li class="nav-item">
						<a class="nav-link">FAQs</a>
					</li>
					<li class="nav-item">
						<a class="nav-link">Friends</a>
					</li>
					<li class="nav-item">
						<router-link to="/login" class="nav-link">Login</router-link>
					</li>
					<li class="nav-item">
						<a class="nav-link">Trivia</a>
					</li>
					<li class="nav-item">
<!--						TODO: Figure out how to make the active class work. -->
						<router-link to="/" class="nav-link">Forum</router-link>
					</li>
				</ul>
			</div>
		</div>
		<router-view/>
		<div class="footer-container navbar-dark bg-dark">
			<p>Creator: David Weber</p>
			<p><a href="https://github.com/DavidW-1618/quokkaForum2">Source Code on GitHub</a></p>
		</div>
	</div>
</template>

<style>
/*@import "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"*/

/*@import "../public/generalStyles.css";*/

/*#app {*/
/*	font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*	-webkit-font-smoothing: antialiased;*/
/*	-moz-osx-font-smoothing: grayscale;*/
/*	text-align: center;*/
/*	color: #2c3e50;*/
/*}*/

/*#nav {*/
/*	!*color: #132020;*!*/
/*	color: palegoldenrod;*/
/*	!*text-shadow: 1px 1px 6px lightgoldenrodyellow;*!*/
/*	font-size: 30px;*/
/*	padding: 10px 20px;*/
/*	font-family: "monaco", monospace;*/
/*	!*background: #a57940*!*/
/*}*/

/*#nav a {*/
/*	font-weight: bold;*/
/*	color: #2c3e50;*/
/*}*/

/*#nav a.router-link-exact-active {*/
/*	color: #42b983;*/
/*}*/






* {
	margin: 0;
	padding: 0;
}

.footer-container {
	display: flex;
	justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	padding: 15px 15px 0 15px; /* Todo: Make the padding situation less jenky in the footer. I don't want this zero here. */
	text-align: center;
	font-family: Arial, serif;
	color: palegoldenrod;
	font-size: 25px;
	text-decoration: none;
	/*margin-top: 20px;*/
}
.footer-container p {
	margin-left: 10px;
	margin-right: 10px;
}

a {
	color: palegoldenrod;
	text-decoration: none;
}

.image-space-holder {
	width: 250px;
}

p {
	font-family: "monaco", monospace;
	font-size: 20px;
}
button {
	font-size: 20px;
	font-family: "monaco", monospace;
}

.navbar-dark .navbar-nav .nav-link {
	/*color: #132020;*/
	color: palegoldenrod;
	/*text-shadow: 1px 1px 6px lightgoldenrodyellow;*/
	font-size: 30px;
	margin: 10px 20px;
	font-family: "monaco", monospace;
}

li.nav-item {
	/*border-left: 1px solid palegoldenrod;*/
}

.bg-dark {
	background: #a57940 !important;
	/*border: saddlebrown solid 2px !important;*/
	/*background-image: linear-gradient(to right, slategrey, lightslategray, slategrey);*/

}

.navbar-expland-lg .navbar-colapse {
	background-color: red !important;
}

#navbarNav {
	/*background-color: red !important;*/
	justify-content: center;
}

li.nav-item {
	/*border-top: palegoldenrod 1px solid;*/
	/*border-bottom: palegoldenrod 1px solid;*/
}
</style>

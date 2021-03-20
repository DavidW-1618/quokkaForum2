<template>
	<div class="outer-box">
		<p>Add {{questionOrResponse}}</p>
<!--		<div class="person">-->
<!--			<img class="person-img" src="../../public/images/cartoon-quokka.png">-->
<!--			<div class="personal-info">-->
<!--				<h3>{{name}}</h3>-->
<!--				<p>{{email}}</p>-->
<!--			</div>-->
<!--		</div>-->
	</div>
</template>

<script>
export default {
	name: "AddForumPost",
	props: {
		questionId: Number,
	},
	data() {
		return {
			name: "James Bond",
			email: "007@MI6.gov",
			comment: "Just go up to them and say hi. Try talking to them. Don't shoot them."
		}
	},
	computed: {
		questionOrResponse() {
			if (this.questionId === -1) {
				return "Question"
			} else {
				return "Response"
			}
		},
	}
}
</script>

<style scoped>

@import "../../public/generalStyles.css";

* {
	margin: 0;
	padding: 0;
}

p {
	font-family: "monaco", monospace;
	color: darkgoldenrod;
	font-size: 25px;
	text-align: center;
}

.outer-box {
	border: goldenrod 4px solid;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 10px 10px;
	margin: 30px 0;
	background: bisque;

}
.person {
	/*border: 2px black solid;*/
	display: flex;
	align-items: center;
}
.person-img {
	width: 80px;
	margin: 10px;
	border: goldenrod 3px solid;
	border-radius: 50%;
}
.personal-info {
	/*border: 2px black solid;*/
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;
	margin-left: 10px;
}
.dividing-line {
	width: 96%;
	background: goldenrod;
	height: 2px;
	margin: 10px;
}
.comment {
	padding: 5px 15px;
}

</style>
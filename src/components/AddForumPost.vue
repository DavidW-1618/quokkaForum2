<template>
	<div class="outer-box">
		<div v-if="clicked">
			<div class="person">
				<img class="person-img" src="../../public/images/cartoon-quokka.png">
				<div class="personal-info">
					<h3>{{name}}</h3>
					<p>{{email}}</p>
				</div>
				<div class="control-buttons">
					<div class="button">
						<p class="button-text">Submit</p>
					</div>
					<div class="button" @click="hideAddForm">
						<p class="button-text">Cancel</p>
					</div>
				</div>
			</div>
			<div class="dividing-line"></div>
			<p class="comment">{{comment}}</p>
		</div>
		<div v-else>
			<div class="click-box" v-on:click="showAddForm">
				<p class="button-text">Add {{questionOrResponse}}</p>
			</div>
		</div>
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
			comment: "Just go up to them and say hi. Try talking to them. Don't shoot them.",
			clicked: false,
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
	},
	methods: {
		showAddForm() {
			this.clicked=true;
		},
		hideAddForm() {
			this.clicked=false;
		}
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
	font-size: 20px;
}

.button-text {
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
.click-box {
	height: 100%;
	width: 100%;
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
.control-buttons {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/*padding: 20px;*/
	margin-left: auto;
}
.button{
	border: goldenrod 4px solid;
	margin: 20px 30px 20px 20px;
	padding: 8px;
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
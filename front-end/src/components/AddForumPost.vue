<template>
	<div class="outer-box">
		<div v-if="clicked">
			<form>
				<div class="person">
					<img class="person-img" src="../../public/images/cartoon-quokka.png">
					<div class="personal-info">
						<input type="text" v-model="nameIn">
						<input type="email" v-model="emailIn">
					</div>
					<div class="control-buttons large-display">
						<div class="button">
							<p class="button-text" @click="addComment()">Submit</p>
						</div>
						<div class="button" @click="hideAddForm">
							<p class="button-text">Cancel</p>
						</div>
					</div>
				</div>
				<div class="dividing-line"></div>
				<textarea class="comment" v-model="commentIn"></textarea>
				<p class="fine-print">If a registered email is used, the name will be replaced with the name on
					record with the email.</p>
				<div class="dividing-line small-display"></div>
				<div class="control-buttons small-display">
					<div class="button">
						<p class="button-text" @click="addComment()">Submit</p>
					</div>
					<div class="button" @click="hideAddForm">
						<p class="button-text">Cancel</p>
					</div>
				</div>
			</form>
		</div>
		<div v-else class="click-box" v-on:click="showAddForm">
			<p class="button-text">Add {{questionOrResponse}}</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";

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
			nameIn: "Name",
			emailIn: "Email",
			commentIn: "Comment",
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
		existingEmails() {
			return this.$root.$data.persons.map(person => {return person.email});
		},
	},
	methods: {
		showAddForm() {
			this.clicked=true;
		},
		hideAddForm() {
			this.clicked=false;
		},
		// async createPerson() {
		// 	// Yup. Add a new person.
		// 	let newPerson = {
		// 		name: this.nameIn,
		// 		email: this.emailIn,
		// 		bio: "",
		// 		age: "0",
		// 		gender: "Unknown",
		// 	};
		// 	await axios.post('/api/persons/', newPerson);
		// 	this.$root.$data.nextPersonId += 1;
		// 	this.$root.$data.persons.push(curPerson);
		// }
		async addComment() {
			// debugger
			//Do we need to add a new person?
			let curPerson = this.$root.$data.persons.find(person => person.email === this.emailIn);
			if (curPerson === undefined) {
				// Yup. Add a new person.
				// curPerson = {
				// 	name: this.nameIn,
				// 	email: this.emailIn,
				// 	bio: "",
				// 	age: "0",
				// 	gender: "Unknown",
				// };
				debugger
				try{
					let responsePerson = await axios.post('/api/persons/',{
						name: this.nameIn,
						email: this.emailIn,
						bio: "",
						age: "0",
						gender: "Unknown",
					} );
					// this.$root.$data.nextPersonId += 1;
					// responsePerson.id = responsePerson._id
					this.$root.$data.persons.push(responsePerson);
				} catch(error) {
					console.log(error)
				}
			}
			let newPost = {
				id: this.$root.$data.nextPostId,
				personId: curPerson.id,
				comment: this.commentIn,
			};
			this.$root.$data.nextPostId += 1;
			if (this.questionId === -1) {
				newPost.responses = [];
				this.$root.$data.forumPosts.push(newPost);
			} else {
				let curQuestion = this.$root.$data.forumPosts.find(question => question.id === this.questionId);
				if (curQuestion == undefined) {
					console.log("ERROR: Tried to submit answer to nonexistent question.");
					this.resetInput();
					return;
				}
				curQuestion.responses.push(newPost)
			}
			this.resetInput();
			return;
		},
		resetInput() {
			this.nameIn = "Name";
			this.emailIn = "Email";
			this.commentIn = "Comment";
			this.hideAddForm();
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
form {
	width: inherit;
}
input {
	margin: 10px;

	font-family: "monaco", monospace;
	font-size: 20px;
	background: papayawhip;
	border: goldenrod 2px solid;
	padding: 3px 7px;
}
textarea {
	margin: 10px;
	margin-bottom: 0;
	width: 96%;

	font-family: "monaco", monospace;
	font-size: 20px;
	background: papayawhip;
	border: goldenrod 2px solid;
	padding: 3px 7px;
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
	width: 100%;
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
.fine-print {
	font-family: Arial;
	font-size: 15px;
	margin: 0 10px 10px 12px;
}

@media only screen and (max-width: 1000px) {
	.outer-box {
		margin-left: 0 !important;
		margin-right: 0 !important;
	}
	.control-buttons {
		margin: 20px;
	}
}

@media only screen and (max-width: 800px) {
	.outer-box {
		align-items: center;
	}
	.large-display {
		display: none;
	}
	.small-display {
		display: block;
	}
	.control-buttons {
		justify-content: center;
	}
	.button {
		margin: 20px;
	}
	.person {
		justify-content: center;
	}
	/* Fix margins making the top part of the box not centered. */
	.person-img{
		margin-left: 20px;
	}
	.personal-info {
		margin-right: 30px;
	}
	.dividing-line, .comment, .fine-print {
		width: 80%;
	}
}
@media only screen and (max-width: 700px) {
	.person {
		flex-direction: column;
		align-items: center;
	}
	.personal-info {
		justify-content: center;
		align-items: center;
		text-align: center;
		margin-left: 10px;
		margin-right: 10px;
	}
	.person-img {
		margin-left: 10px;
		margin-right: 10px;
	}
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.dividing-line {
		width: 80%;
	}
	.comment, .fine-print {
		margin-left: 20px;
		margin-right: 20px;
		text-align: center;
	}
}
@media only screen and (max-width: 550px) {
	input {
		width: 90%;
	}
}
@media only screen and (max-width: 500px) {
	p {
		text-align: center;
	}
	.person-img {
		width: 100px;
	}
	.control-buttons {
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}
}
@media only screen and (max-width: 500px) {
	input, textarea, .comment, .dividing-line, .fine-print {
		width: 60%
	}
}

@media only screen and (max-width:300px) {

	.button {
		margin: 10px;
		padding: 5px;
	}
	.button-text {
		font-size: 18px;
	}
}

</style>
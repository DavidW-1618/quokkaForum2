<template>
	<div class="add-post-outer-box">
		<form class="add-post-form-box" v-if="clicked">
			<div class="person">
				<img class="person-img" src="../../public/images/cartoon-quokka.png">
				<div class="personal-info">
					<h3>{{$root.$data.user.firstName}} {{$root.$data.user.lastName}}</h3>
					<p class="email">{{ $root.$data.user.email }}</p>
				</div>
				<div class="control-buttons large-display">
					<div class="button">
						<p class="button-text" @click.prevent="addComment()">Submit</p>
					</div>
					<div class="button" @click.prevent="hideAddForm">
						<p class="button-text">Cancel</p>
					</div>
				</div>
			</div>
			<div class="dividing-line"></div>
			<textarea class="comment" v-model="commentIn"></textarea>
			<p class="fine-print">If a registered email is used, the name will be replaced with the name on
				record with the email.</p>
			<div class="dividing-line small-display"></div>
			<div class="full-space small-display">
				<div class="control-buttons">
					<div class="button">
						<p class="button-text" @click.prevent="addComment()">Submit</p>
					</div>
					<div class="button" @click.prevent="hideAddForm">
						<p class="button-text">Cancel</p>
					</div>
				</div>
			</div>
		</form>
		<div v-else class="click-box" v-on:click.prevent="showAddForm">
			<p class="button-text">Add {{ questionOrResponse }}</p>
		</div>
	</div>
</template>

<script>
import axios from "axios";

export default {
	name: "AddForumPost",
	props: {
		question_id: String,
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
	created() {
		// console.log("In created -- question_id:", this.question_id)
	},
	computed: {
		questionOrResponse() {
			if (this.question_id === -1) {
				return "Question"
			} else {
				return "Response"
			}
		},
		existingEmails() {
			return this.$root.$data.persons.map(person => {
				return person.email
			});
		},
	},
	methods: {
		// async loadPosts() {
		// 	let response = axios.get('/api/forum_posts');
		// 	this.$root.$data.forumPosts = response.data;
		// 	return
		// },
		async getPosts() {
			try {
				// console.log("getting posts")
				let response = await axios.get("/api/forum_posts");
				// console.log("got posts")
				this.$root.$data.forumPosts = response.data[0];
				// this.questions = response.data[0];
				// console.log("saved posts")
			} catch (error) {
				console.log(error);
			}
		},
		async getPersons() {
			try {
				// console.log("getting people")
				let response = await axios.get("/api/persons");
				// console.log("got people")
				this.$root.$data.persons = response.data;
				// console.log("saved people")
			} catch (error) {
				console.log(error);
			}
		},
		showAddForm() {
			this.clicked = true;
		},
		hideAddForm() {
			this.clicked = false;
		},
		async addComment() {
			// Make Post
			let newPost = {
				// id: this.$root.$data.nextPostId,
				personId: this.$root.$data.user._id,
				comment: this.commentIn,
				timeOfPost: new Date()
			};
			// Send Post
			console.log("question_id:", this.question_id)
			if (this.question_id === "-1") {
				newPost.responseToPost = null
			} else {
				newPost.responseToPost = this.question_id
			}
			console.log(newPost)
			console.log("Hello")
			try {
				await axios.post('/api/forum_posts', newPost)
			} catch (error) {
				console.log(error)
				return;
			}
			//Reload posts
			await this.getPosts()
			
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

a {
	font-family: "monaco", monospace;
	font-size: 20px;
	color: black;
	text-decoration: none;
}

p {
	font-family: "monaco", monospace;
	font-size: 20px;
}

h3 {
	margin-bottom: 3px;
}

form {
	width: 100%;
	margin: 0;
	padding: 0;
}

.add-post-form-box{
	margin: 0;
	padding: 0;
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

.click-box {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
}

.full-space {
	width: 100%;
	height: 100%;
}

.small-display {
	display: none;
}

.add-post-outer-box {
	border: goldenrod 4px solid;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 10px 10px;
	margin: 30px 0;
	background: bisque;
	
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

.control-buttons-wrapper {
	margin: 0;
	padding: 0;
	margin-left: auto;
}

.control-buttons {
	/*height: 100%;*/
	display: flex;
	justify-content: space-between;
	align-items: center;
	/*padding: 20px;*/
	margin-left: auto;
}

.button {
	border: goldenrod 4px solid;
	margin: 20px 30px 20px 10px;
	padding: 8px;
}

.button-text {
	color: darkgoldenrod;
	font-size: 25px;
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
	/*.add-post-outer-box {*/
	/*	margin-left: 50px;*/
	/*	margin-right: 50px;*/
	/*}*/
}

@media only screen and (max-width: 940px) {
	.large-display {
		display: none;
	}
	
	.small-display {
		display: block;
	}
	.person {
		justify-content: center;
	}
	.control-buttons {
		justify-content: center;
	}
}

@media only screen and (max-width: 800px) {
	.add-post-outer-box {
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
	.person-img {
		margin-left: 20px;
	}
	
	.personal-info {
		margin-right: 30px;
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
	
	input {
		text-align: center;
	}
	
	.comment {
		margin-left: 10px;
		margin-right: 10px;
		text-align: center;
	}
}

/*@media only screen and (max-width: 600px) {*/

/*	.personal-info {*/
/*		align-items: center;*/
/*	}*/
/*}*/
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

@media only screen and (max-width: 400px) {
	.personal-info input{
		/*margin-right: 0;*/
		width: 100%;
	}
}

@media only screen and (max-width: 300px) {
	
	.button {
		margin: 10px;
		padding: 5px;
	}
	
	.button-text {
		font-size: 18px;
	}
}

</style>
<template>
	<div>
		<div class="outer-box">
			<div class="person">
				<router-link :to="'/person/' + person.id">
					<img class="person-img" src="../../public/images/cartoon-quokka.png">
				</router-link>
				<div class="personal-info">
					<router-link :to="'/person/' + person.id">
						<h3>{{person.name}}</h3>
						<p>{{person.email}}</p>
					</router-link>
				</div>
				<div v-if="inEditMode" class="control-buttons">
					<div class="button">
						<p class="button-text" @click="submitPostEdit()">Save</p>
					</div>
					<div class="button" @click="hideEditForm()">
						<p class="button-text">Cancel</p>
					</div>
				</div>
				<div v-else class="control-buttons">
					<div class="button">
						<p class="button-text" @click="showEditForm()">Edit</p>
					</div>
					<div class="button" @click="deletePost()">
						<p class="button-text">Delete</p>
					</div>
				</div>
			</div>
			<div class="dividing-line"></div>
			<div v-if="inEditMode" class="full-space">
				<textarea class="comment" v-model="commentIn"></textarea>
				<p class="fine-print">To edit the person details, please delete and/or make a new post.</p>
			</div>
			<div v-else>
				<p class="comment">{{post.comment}}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "ForumPost",
	props: {
		post: Object,
	},
	computed: {
		person() {
			let person = this.$root.$data.persons.find(person => person.id === this.post.personId)
			return person
		}
	},
	data() {
		return {
			inEditMode: false,
			commentIn: this.post.comment,
		}
	},
	methods: {
		showEditForm() {
			this.inEditMode = true;
		},
		hideEditForm() {
			this.inEditMode = false;
		},
		deletePost() {
			let questions = this.$root.$data.forumPosts;
			for (let questionIndex = questions.length - 1; questionIndex >= 0; questionIndex -= 1) {
				if (questions[questionIndex].id === this.post.id) {
					questions.splice(questionIndex, 1);
				} else {
					// Go through responses
					let responses = questions[questionIndex].responses;
					for (let responseIndex = responses.length - 1; responseIndex >= 0; responseIndex -= 1) {
						if (responses[responseIndex].id === this.post.id) {
							responses.splice(responseIndex, 1)
						}
					}
				}
			}
		},
		submitPostEdit() {
			this.post.comment = this.commentIn;

			this.hideEditForm()
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
	width: inherit;
}
input {
	margin: 10px;
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

.full-space {
	width: 100%;
	height: 100%;
}

.outer-box {
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
	margin: 20px 30px 20px 10px;
	padding: 8px;
}
.button-text {
	color: darkgoldenrod;
	font-size: 25px;
	text-align: center;
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

</style>
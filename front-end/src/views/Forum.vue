<template>
	<div class="forum-outer-box">
		<h1>Forum</h1>
		<hr/>
		<div v-for="question in questions" :key="question._id" :isResponse=false>
			<div class="question-wrapper">
				<ForumPost :post="question"></ForumPost>
			</div>
			<div>
				<div v-for="response in question.responses" :key="response._id" :isResponse=true>
					<div class="response-wrapper">
						<ForumPost :post="response"></ForumPost>
					</div>
				</div>
				<div v-if="$root.$data.user">
					<div class="response-wrapper">
						<AddForumPost :question_id=question._id></AddForumPost>
					</div>
				</div>
			</div>
		</div>
		<div v-if="$root.$data.user">
			<div class="question-wrapper">
				<AddForumPost :question_id="'-1'"></AddForumPost>
			</div>
		</div>
	</div>
</template>

<script>

import ForumPost from "../components/ForumPost.vue";
import AddForumPost from "@/components/AddForumPost";

import axios from 'axios'

export default {
	name: "Forum",
	components: {AddForumPost, ForumPost},
	data() {
		return {
			// questions: this.$root.$data.forumPosts,
			// questions: [], // SWAP
		}
	},
	computed: {
		questions() {
			console.log(this.$root.$data.forumPosts)
			return this.$root.$data.forumPosts
		}
	},
	methods: {
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
		async myCreated() {
			await this.getPersons();
			await this.getPosts(); //SWAP
		}
	},
	created() {
		this.myCreated()
	},
	watch: {
		// this.$root.$data.forumPosts
	}
}
</script>


<style scoped>
@import "../../public/generalStyles.css";

p {
	font-family: "monaco", monospace;
	font-size: 20px;
}

h1 {
	text-align: center;
	margin: 30px;
	font-size: 50px;
	text-decoration: underline;
}

hr {
	/*border-bottom: 2px #a57940 solid;*/
	border-bottom: 4px goldenrod solid;
}

.forum-outer-box {
	/*border: red 2px solid;*/
	margin-left: auto;
	margin-right: auto;
	max-width: 900px;
}

.question-wrapper {
	/*border: green 2px solid;*/
	margin-right: 110px;
	padding: 0;
}

.response-wrapper {
	/*border: cyan 2px solid;*/
	margin-left: 110px;
	padding: 0;
}

@media only screen and (max-width: 1000px) {
	.forum-outer-box {
		margin-left: 50px;
		margin-right: 50px;
	}
}
@media only screen and (max-width:470px) {
	.forum-outer-box {
		margin-left: 20px;
		margin-right: 20px;
	}
	.response-wrapper {
		margin: 0;
		padding: 0;
		background: bisque;
		border-right: bisque 20px solid;
		border-left: bisque 20px solid;
	}
	.question-wrapper {
		margin: 30px 0;
		background: goldenrod;
		border-right: goldenrod 20px solid;
		border-left: goldenrod 20px solid;
	}
}

</style>
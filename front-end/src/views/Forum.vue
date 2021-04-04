<template>
	<div class="outer-box">
		<h1>Forum</h1>
		<hr/>
		<div v-for="question in questions" :key="question.id" :isResponse=false>
			<div class="question-wrapper">
				<ForumPost :post="question"></ForumPost>
			</div>
			<div>
				<div v-for="response in question.responses" :key="response.id" :isResponse=true>
					<div class="response-wrapper">
						<ForumPost :post="response"></ForumPost>
					</div>
				</div>
					<div class="response-wrapper">
						<AddForumPost :questionId="question.id"></AddForumPost>
					</div>
			</div>
		</div>
		<div class="question-wrapper">
			<AddForumPost :questionId="-1"></AddForumPost>
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
			questions: this.$root.$data.forumPosts,
			// questions: [],
		}
	},
	methods: {
		async getPosts() {
			try {
				console.log("getting posts")
				let response = await axios.get("http://localhost:3000/api/forumPosts");
				console.log("got posts")
				debugger
				this.$root.$data.forumPosts = response.data;
				console.log("saved posts")
			} catch (error) {
				console.log(error);
			}
		}
	},
	created() {
		debugger
		this.getPosts();
	},
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

.outer-box {
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
	.outer-box {
		margin-left: 50px;
		margin-right: 50px;
	}
}
@media only screen and (max-width:470px) {
	.outer-box {
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
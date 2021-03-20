<template>
	<div class="outer-box">
		<h1>Forum</h1>
		<hr/>
		<div v-for="question in questions" :key="question.id">
			<div class="question-wrapper">
				<ForumPost :email="question.email" :comment="question.comment"></ForumPost>
			</div>
			<div>
				<div v-for="response in question.responses" :key="response.id">
					<div class="response-wrapper">
						<ForumPost :email="response.email" :comment="response.comment"></ForumPost>
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
export default {
	name: "Forum",
	components: {AddForumPost, ForumPost},
	data() {
		return {
			questions: this.$root.$data.forumPosts
		}
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
}
.response-wrapper {
	/*border: cyan 2px solid;*/
	margin-left: 110px;
}
</style>
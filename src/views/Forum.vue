<template>
	<div class="outer-box">
		<div v-for="question in questions" :key="question.id">
			<ForumPost :email="question.email" :comment="question.comment"></ForumPost>
			<div>
				<div v-for="response in question.responses" :key="response.id">
					<div class="response-wrapper">
						<ForumPost :email="response.email" :comment="response.comment"></ForumPost>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

import ForumPost from "../components/ForumPost.vue";
export default {
	name: "Forum",
	components: {ForumPost},
	data() {
		return {
			questions: this.$root.$data.forumPosts
		}
	},
}
</script>



<style scoped>
.outer-box {
	border: red 2px solid;
}
.response-wrapper {
	border: cyan 2px solid;
	margin-left: 70px;
}
</style>
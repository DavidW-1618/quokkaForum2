<template>
	<div class="outer-box">
		<h2>{{name}}</h2>
		<p>{{email}}</p>
		<p>{{comment}}</p>
	</div>
</template>

<script>
export default {
	name: "ForumPost",
	props: {
		email: String,
		comment: String,
	},
	computed: {
		name() {
			let person = this.$root.$data.persons.find(person => person.email === this.email)
			return person.name
		}
	},
	data() {
		return {
		}
	}
}
</script>

<style scoped>

.outer-box {
	border: #42b983 2px solid;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
}

</style>
<template>
	<div class="outer-box">
		<div class="person">
			<router-link :to="'/person/' + person.id">
				<img class="person-img" src="../../public/images/cartoon-quokka.png">
			</router-link>
			<div class="personal-info">
				<h3>{{person.name}}</h3>
				<p>{{person.email}}</p>
			</div>
		</div>
		<div class="dividing-line"></div>
		<p class="comment">{{comment}}</p>
	</div>
</template>

<script>
export default {
	name: "ForumPost",
	props: {
		personId: Number,
		comment: String,
	},
	computed: {
		person() {
			let person = this.$root.$data.persons.find(person => person.id === this.personId)
			return person
		}
	},
	data() {
		return {
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
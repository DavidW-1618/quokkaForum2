<template>
	<div>
		<div class="outer-box">
			<div class="top-box">
				<div class="left-box">
					<img class="person-img" src="../../public/images/cartoon-quokka.png">
					<div v-if="inEditMode" class="control-buttons">
						<div class="button">
							<p class="button-text" @click="submitEdits()">Submit</p>
						</div>
						<div class="button">
							<p class="button-text" @click="hideEditForm()">Cancel</p>
						</div>
					</div>
					<div v-else class="control-buttons">
						<div class="button">
							<p class="button-text" @click="showEditForm()">Edit</p>
						</div>
						<div class="button">
							<p class="button-text" @click="deletePerson()">Delete</p>
						</div>
					</div>
				</div>
				<form v-if="inEditMode" class="personal-info">
					<div class="input-row">
						<p class="input-label">Name:</p>
						<input type="text" v-model="newName" class="input-box"/>
					</div>
					<div class="dividing-line"></div>
					<div class="input-row">
						<p class="input-label">Email:</p>
						<input type="email" v-model="newEmail" class="input-box"/>
					</div>
					<div class="input-row">
						<p class="input-label">Age:</p>
						<input type="number" v-model="newAge" class="input-box"/>
					</div>
					<div class="input-row">
						<p class="input-label">Gender:</p>
						<input type="text" v-model="newGender" class="input-box"/>
					</div>
					<div class="dividing-line"></div>
					<div class="input-row">
						<p class="input-label">Bio:</p>
						<textarea v-model="newBio" class="input-box"/>
					</div>
				</form>
				<div v-else class="personal-info">
					<h1>{{ curPerson.name }}</h1>
					<div class="dividing-line"></div>
					<!--					<p>Name: <strong>{{curPerson.name}}</strong></p>-->
					<p>Email: {{ curPerson.email }}</p>
					<p>Age: {{ curPerson.age }}</p>
					<p>Gender: {{ curPerson.gender }}</p>
					<div class="dividing-line"></div>
					<p>Bio: {{ curPerson.bio }}</p>
				</div>
			</div>
			<!--		<div class="dividing-line"></div>-->
			<!--		<p class="comment">{{curPerson.bio}}</p>-->
		</div>
	</div>
</template>

<script>
export default {
	name: "Person",
	data() {
		return {
			inEditMode: false,
			curPerson: {},
		}
	},
	created() {
		this.curPerson = this.$root.$data.persons.find(person => person.id === parseInt(this.$route.params.personId));

		this.newName = this.curPerson.name;
		this.newEmail = this.curPerson.email;
		this.newAge = this.curPerson.age;
		this.newGender = this.curPerson.gender;
		this.newBio = this.curPerson.bio;
	},
	methods: {
		showEditForm() {
			this.inEditMode = true;
		},
		hideEditForm() {
			this.inEditMode = false;
		},
		submitEdits() {
			this.curPerson.name = this.newName;
			this.curPerson.email = this.newEmail;
			this.curPerson.age = this.newAge;
			this.curPerson.gender = this.newGender;
			this.curPerson.bio = this.newBio;

			this.inEditMode = false;
		},
		deletePerson() {
			// let perId = curPerson.id;
			// Go through questions
			let questions = this.$root.$data.forumPosts;
			for (let questionIndex = questions.length - 1; questionIndex >= 0; questionIndex -= 1) {
				if (questions[questionIndex].personId === this.curPerson.id) {
					questions.splice(questionIndex, 1);
				} else {
					// Go through responses
					let responses = questions[questionIndex].responses;
					for (let responseIndex = responses.length - 1; responseIndex >= 0; responseIndex -= 1) {
						if (responses[responseIndex].personId === this.curPerson.id) {
							responses.splice(responseIndex, 1)
						}
					}
				}
			}
			// Remove Person
			let personIndex = this.$root.$data.persons.findIndex(person => person.id === this.curPerson.id)
			this.$root.$data.persons.slice(personIndex, 1);
			this.$router.back();
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

h1 {
	text-align: center;
	width: 100%;
	margin-bottom: 10px;
}


.outer-box {
	margin: 50px auto;
	/*margin-left: auto;*/
	/*margin-right: auto;*/
	width: fit-content;
	max-width: 900px;

	border: goldenrod 4px solid;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 20px;
	background: bisque;

}

.top-box {
	/*border: 2px black solid;*/
	display: flex;
	/*align-items: center;*/
}

.left-box {
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
}

.person-img {
	width: 200px;
	margin: 10px;
	border: goldenrod 3px solid;
	border-radius: 50%;
}

.personal-info {
	/*border: 2px black solid;*/
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	margin: 0 10px 0 20px;
}

.dividing-line {
	width: 100%;
	background: goldenrod;
	height: 2px;
	margin: 10px 0;
}

.comment {
	padding: 5px 15px;
}

.control-buttons {
	height: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/*padding: 20px;*/
	/*margin-left: auto;*/
}

.button {
	border: goldenrod 4px solid;
	/*margin: 20px 30px 20px 20px;*/
	margin: 15px;
	padding: 8px;
}

.button-text {
	color: darkgoldenrod;
	font-size: 20px;
	text-align: center;
}

.input-label {
	display: inline;
}

.input-row {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.input-box {
	font-family: "monaco", monospace;
	font-size: 20px;
	background: papayawhip;
	border: goldenrod 2px solid;
	/*margin: 20px 30px 20px 20px;*/
	margin: 10px;
	padding: 3px 7px;
}

</style>
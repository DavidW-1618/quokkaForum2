<template>
	<div class="true-person-outer-box">
		<div class="person-outer-box">
			<div class="top-box">
				<div class="left-box">
					<img class="person-img" src="../../public/images/cartoon-quokka.png">
					<div v-if="allowedToEdit">
						<div v-if="inEditMode" class="control-buttons">
							<div class="button">
								<p class="button-text" @click.prevent="editPerson()">Submit</p>
							</div>
							<div class="button">
								<p class="button-text" @click.prevent="hideEditForm()">Cancel</p>
							</div>
						</div>
						<div v-else class="control-buttons">
							<div class="button">
								<p class="button-text" @click.prevent="showEditForm()">Edit</p>
							</div>
							<div class="button">
								<p class="button-text" @click.prevent="deletePerson()">Delete</p>
							</div>
						</div>
					</div>
				</div>
				<form v-if="inEditMode" class="personal-info">
					<div class="input-row">
						<p class="input-label">Name:</p>
						<input type="text" v-model="editedPerson.name" class="input-box"/>
					</div>
					<div class="dividing-line"></div>
					<div class="input-row">
						<p class="input-label">Email:</p>
						<input type="email" v-model="editedPerson.email" class="input-box"/>
					</div>
					<div class="input-row">
						<p class="input-label">Age:</p>
						<input type="number" v-model="editedPerson.age" class="input-box"/>
					</div>
					<div class="input-row">
						<p class="input-label">Gender:</p>
						<input type="text" v-model="editedPerson.gender" class="input-box"/>
					</div>
					<div class="dividing-line"></div>
					<div class="input-row">
						<p class="input-label">Bio:</p>
						<textarea v-model="editedPerson.bio" class="input-box"/>
					</div>
				</form>
				<div v-else class="personal-info">
					<h1>{{ curPerson.name }}</h1>
					<div class="dividing-line"></div>
					<!--					<p>Name: <strong>{{curPerson.name}}</strong></p>-->
					<p><strong>Email:</strong> {{ curPerson.email }}</p>
					<p><strong>Age:</strong> {{ curPerson.age }}</p>
					<p><strong>Gender:</strong> {{ curPerson.gender }}</p>
					<div class="dividing-line"></div>
					<p><strong>Bio:</strong> {{ curPerson.bio }}</p>
				</div>
			</div>
			<!--		<div class="dividing-line"></div>-->
			<!--		<p class="comment">{{curPerson.bio}}</p>-->
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	name: "Person",
	data() {
		return {
			inEditMode: false,
			curPerson: {},
			editedPerson: {}
		}
	},
	async created() {
		await this.getPerson()
	},
	computed: {
		allowedToEdit() {
			if (!this.$root.$data.user) {
				return false;
			}
			if (!this.$root.$data.user != this.person) {
				return false;
			}
			return true;
		},
	},
	methods: {
		showEditForm() {
			this.inEditMode = true;
		},
		hideEditForm() {
			this.inEditMode = false;
		},
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
		async getPerson() {
			// console.log(this.$route.params.personId);
			// debugger
			this.curPerson = await axios.get("/api/persons/" + this.$route.params.personId);
			this.curPerson = this.curPerson.data;
			//this.curPerson = this.$root.$data.persons.find(person => person._id === parseInt(this.$route.params.personId));
			console.log("this.curPerson");
			console.log(this.curPerson);
			
			this.newName = this.curPerson.name;
			this.newEmail = this.curPerson.email;
			this.newAge = this.curPerson.age;
			this.newGender = this.curPerson.gender;
			this.newBio = this.curPerson.bio;
			
			this.editedPerson = {
				name: this.curPerson.name,
				email: this.curPerson.email,
				age: this.curPerson.age,
				gender: this.curPerson.gender,
				bio: this.curPerson.bio,
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
		async editPerson() {
			try {
				// Send the update.
				await axios.put('/api/persons/' + this.$route.params.personId, {
					name: this.editedPerson.name,
					email: this.editedPerson.email,
					age: this.editedPerson.age,
					gender: this.editedPerson.gender,
					bio: this.editedPerson.bio,
				});
				// Get the updated person.
				await this.getPerson()
			} catch (error) {
				console.log(error);
			}
			this.inEditMode = false;
		},
		async deletePerson() {
			try {
				// Delete the person from the vue object
				await axios.delete("/api/persons/" + this.curPerson._id);
				// Delete the person from the vue object.
				// Todo: swap for reloading everything.
				// this.oldDeletePerson();
				await this.getPersons();
				await this.getPosts();
				this.$router.back()

			} catch (error) {
				console.log(error);
			}
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

.true-person-outer-box {
	display: flex;
	justify-content: center;
	align-items: center;
}

.person-outer-box {
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

@media only screen and (max-width: 1000px) {
	.person-outer-box {
		margin: 50px;
	}
}

@media only screen and (max-width: 600px) {
	.top-box {
		flex-direction: column;
		align-items: center;
	}

	.personal-info {
		align-items: center;
	}
}

@media only screen and (max-width: 500px) {
	p {
		text-align: center;
	}

	.top-box {
		flex-direction: column;
		align-items: center;
	}

	.person-img {
		width: 100px;
	}
}

@media only screen and (max-width: 300px) {
	.control-buttons {
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	.button {
		margin: 10px;
		padding: 5px;
	}

	.button-text {
		font-size: 18px;
	}
}

</style>
import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// import mockForumPosts from '../mock-forum-posts'  //SWAP
// import mockPersons from '../mock-persons'

let data = {
  // forumPosts: mockForumPosts,
  // persons: mockPersons,
  forumPosts: [], //SWAP
  persons: [],
  nextPostId: 24,
  nextPersonId: 10,
}

new Vue({
  router,
  data: data,
  render: h => h(App)
}).$mount('#app')

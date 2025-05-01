import { defineStore } from 'pinia'

export const useBlogStore = defineStore('blog', {
  state: () => ({
    isLoggedIn: false,
    isLoading: false,
    userId: null,
    blogPosts: [
    ],
  }),
  actions: {
    logIn() {
      this.isLoggedIn = true
    },
    async fetchPosts() {
      this.isLoading = true;
      const response = await fetch('https://vue-blog-68392-default-rtdb.firebaseio.com/posts.json')
      const responseData = await response.json();

      const posts = [];
      for (const key in responseData) {
        const post = {
          id: key,
          title: responseData[key].title,
          postText: responseData[key].postText
        }
        posts.unshift(post);
        this.blogPosts = posts;
        this.isLoading = false;
      }
    },
    async deletePost(id) {
      await fetch(`https://vue-blog-68392-default-rtdb.firebaseio.com/posts/${id}.json`, {
        method: 'DELETE',
      })
    }
  }
})

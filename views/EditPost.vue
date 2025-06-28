<template>
  <div>
    <h1 class="mt-3 text-center text-3xl mb-5">EDIT PAGE</h1>
    <div v-if="postData" class="flex flex-col">
      <input @focus="titleIsInvalid = false" v-model.trim="postTitle" class="font-bold mx-auto border rounded-lg p-2"
        type="text">
      <h3 class="text-center font-bold m-3 text-red-500" v-if="titleIsInvalid">Please enter a title</h3>
      <textarea @focus="textIsInvalid = false" v-model.trim="postText" class="mt-5 mx-auto border rounded-lg p-2"
        id="blogText" name="blogText" cols="50" rows="15"></textarea>
      <h3 class="text-center font-bold m-3 text-red-500" v-if="textIsInvalid">Please enter blog text</h3>
      <button @click="submitData" class="mx-auto font-bold bg-blue-500 text-white p-2 rounded-lg mt-3 hover:bg-blue-400
      hover:scale-96">Submit</button>
    </div>
  </div>
</template>

<script>
import { useBlogStore } from "../stores/blog.js"
export default {
  setup() {
    const store = useBlogStore();
    return { store }
  },
  data() {
    return {
      postTitle: '',
      postText: '',
      titleIsInvalid: false,
      textIsInvalid: false,
    }
  },
  methods: {
    async getData() {
      await this.store.fetchPosts();
      this.postTitle = this.postData.title
      this.postText = this.postData.postText
    },
    validateForm() {
      if (this.postTitle === '') {
        console.log('postTitle is empty')
        this.titleIsInvalid = true;
      }
      if (this.postText === '') {
        console.log('postText is empty')
        this.textIsInvalid = true;
      }
    },
    async submitData() {
      //validate form data
      this.validateForm();

      if (this.titleIsInvalid || this.textIsInvalid) {
        return;
      }

      const response = await
        fetch(`https://vue-blog-68392-default-rtdb.firebaseio.com/posts/${this.postData.id}.json`, {
          method: 'PUT',
          body: JSON.stringify({
            title: this.postTitle,
            postText: this.postText
          })
        })

      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(response.error.message || 'There was an error submitting your post')
        throw error;
      }

      this.$router.replace(`/posts/${this.$route.params.id}/`)
    },
  },
  computed: {
    postData() {
      return this.store.blogPosts.find(post => post.id === this.$route.params.id);
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

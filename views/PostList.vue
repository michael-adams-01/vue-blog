<template>
  <div>
    <base-dialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>
    <div v-if="store.isLoading" class="flex items-center justify-center h-screen flex-col">
      <base-spinner></base-spinner>
      <p class="mt-5">Loading posts...</p>
    </div>
    <!-- <h1 v-if="isLoading" class="font-bold animate-pulse">Loading...</h1> -->
    <div v-else>
      <button class="border rounded-lg p-1 bg-blue-400 font-bold text-white hover:scale-95
    active:bg-blue-300" @click="loadPosts">Refresh</button>
      <div class="container grid grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-6 items-center m-4">
        <!-- <div class="flex items-center justify-center h-screen flex-row flex-wrap"> -->
        <ul class="w-full" v-for="post in store.blogPosts" :key="post.id">
          <base-card class="mt-9">
            <b>{{ post.title }}</b>
            <li>Published: {{ post.datePublished }}</li>
            <router-link :to="`/posts/${post.id}`" class="flex self-center font-bold bg-blue-500 text-white p-2 rounded-lg
        mt-3 hover:bg-blue-400 hover:scale-96">Read
              more!</router-link>
            <!-- Delete Stuff start -->
            <button v-if="store.isLoggedIn" class="text-xs font-bold text-white bg-red-400 p-1 border rounded-lg m-2"
              @click="confirmDelete(post.title, post.id)">Delete</button>
            <base-modal :open="openDeleteModal">
              <h1>Are you sure you want to delete: <b>{{ deleteTitle }}</b>?</h1>
              <button @click="removePost(deleteId)"
                class="border rounded-lg bg-red-400 font-bold text-white p-1 m-1">Yes</button>
              <button @click="openDeleteModal = false"
                class="border rounded-lg bg-green-400 font-bold text-white p-1 m-1">No</button>
            </base-modal>
            <!-- Delete Stuff End -->
          </base-card>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import PostSearch from '../components/posts/PostSearch.vue';
import BaseSpinner from '../components/UI/BaseSpinner.vue';
import { useBlogStore } from '../stores/blog.js';
export default {
  components: {
    PostSearch,
    BaseSpinner,
  },
  setup() {
    const store = useBlogStore()

    // const loadPosts = async function () {
    //   console.log('hi')
    //   const response = await fetch('https://vue-blog-68392-default-rtdb.firebaseio.com/posts.json')
    //   const responseData = await response.json();
    //   console.log(responseData)
    // }
    return { store };
  },
  data() {
    return {
      openDeleteModal: false,
      deleteTitle: null,
      deleteId: null,
      error: null,
    }
  },
  methods: {
    async loadPosts() {
      try {
        await this.store.fetchPosts()
      } catch (error) {
        this.store.isLoading = false;
        this.error = error.message || 'Something went wrong fetching posts. Please try again';
      }
    },
    confirmDelete(title, id) {
      console.log(title, id)
      this.deleteTitle = title;
      this.deleteId = id;
      this.openDeleteModal = true;
    },
    async removePost(id) {
      try {
        await this.store.deletePost(id);
      } catch (error) {
        console.log('error deleting', error)
        this.error = error.message || 'Something went wrong deleting your post. Please try again'
      }
      this.openDeleteModal = false;
      this.loadPosts();
    },
    handleError() {
      this.error = null;
    }

  },
  mounted() {
    // this.isLoading = true;
    this.loadPosts()
    // this.isLoading = false;
  }
}
</script>

<template>
  <div>
    <h1 v-if="!postData">Error loading page. Please try reloading.</h1>
    <base-card class="flex flex-col" v-else>
      <h1 class="text-3xl mt-3 font-bold">{{ postData.title }}</h1>
      <h2 class="text-sm mt-3">{{ postData.datePublished }}</h2>
      <p class="mt-4 text-3xl"> {{ postData.postText }}</p>
      <router-link v-if="store.isLoggedIn" class="mx-auto font-bold bg-green-500 text-white p-2 rounded-lg mt-3
        hover:bg-green-400 hover:scale-96" :to="`/posts/${postData.id}/edit`">Edit</router-link>
    </base-card>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

import { useBlogStore } from '../stores/blog.js';
const store = useBlogStore();


const route = useRoute();

async function getPosts() {
  await store.fetchPosts()
}
getPosts()

store.fetchPosts()


const postData = computed(function () {
  return store.blogPosts.find(post => post.id === route.params.id);
});

</script>

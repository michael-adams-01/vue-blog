<template>
  <base-card>
    <h1 class="text-3xl mt-3 font-bold">{{ postData.title }}</h1>
    <h2 class="text-sm mt-3">{{ postData.datePublished }}</h2>
    <p class="mt-4 text-3xl"> {{ postData.postText }}</p>
    <!-- <h3 class="mt-3">The post id is: {{ route.params.id }}</h3> -->
  </base-card>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { computed } from 'vue';

import { useBlogStore } from '../stores/blog.js';
const store = useBlogStore();


const route = useRoute();
//console.log(route.params.id)
//console.log(store.blogPosts)

const postData = computed(function () {
  return store.blogPosts.find(post => post.id === route.params.id);
});

console.log(postData.value.title)



</script>

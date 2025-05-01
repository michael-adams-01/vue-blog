<template>
  <header class="w-full h-20 bg-blue-500">
    <!-- <h1 class="font-bold text-white">Is logged in: {{ store.isLoggedIn }}</h1> -->
    <nav class="h-full">
      <div class="flex justify-center items-center h-full m-0 p-0">
        <router-link
          class="absolute left-0 text-white bg-transparent border border-transparent py-2 px-6 inline-block cursor-pointer hover:text-[#f1a80a] hover:border-[#f1a80a] hover:bg-[#1a037e] transition-colors mx-8"
          to="/">Home</router-link>
        <router-link v-if="!store.isLoggedIn"
          class="absolute right-0 text-white bg-transparent border border-transparent py-2 px-6 inline-block cursor-pointer hover:text-[#f1a80a] hover:border-[#f1a80a] hover:bg-[#1a037e] transition-colors mx-8"
          to="/auth">Login</router-link>
        <!-- <button @click="logout" class="text-white" v-if="store.isLoggedIn">Logout</button> -->

        <router-link v-if="store.isLoggedIn" @click="logout"
          class="absolute right-0 text-white bg-transparent border border-transparent py-2 px-6 inline-block cursor-pointer hover:text-[#f1a80a] hover:border-[#f1a80a] hover:bg-[#1a037e] transition-colors mx-8"
          to="">Logout</router-link>

        <router-link v-if="store.isLoggedIn"
          class="text-white bg-transparent border border-transparent py-2 px-6 inline-block cursor-pointer hover:text-[#f1a80a] hover:border-[#f1a80a] hover:bg-[#1a037e] transition-colors mx-8"
          to="/newPost">New Post</router-link>
        <!-- <router-link -->
        <!--   class="text-white bg-transparent border border-transparent py-2 px-6 inline-block cursor-pointer hover:text-[#f1a80a] hover:border-[#f1a80a] hover:bg-[#1a037e] transition-colors mx-8" -->
        <!--   to="/about">About</router-link> -->
      </div>
    </nav>
  </header>
</template>

<script>
import { useBlogStore } from '../../stores/blog.js';

export default {
  setup() {
    const store = useBlogStore();
    // const logout = function () {
    //   store.isLoggedIn = false;
    // }
    return { store };
  },
  methods: {
    logout() {
      this.store.isLoggedIn = false;
      this.$router.replace('/');
    }
  }
}

</script>

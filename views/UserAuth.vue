<template>
  <base-card>
    <sign-in v-if="!showSignUp"></sign-in>
    <button v-if="showSignUp" @click="switchToSignup" class="hover:scale-95 bg-indigo-500 font-bold text-white p-1 border rounded-lg
      hover:bg-indigo-400 p-2">Sign In</button>
  </base-card>
</template>

<script>
import SignIn from '../components/auth/SignIn.vue'

export default {
  components: {
    SignIn,
  },
  data() {
    return {
      showSignUp: false,
    }
  }
}
</script>




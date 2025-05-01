<template>
  <!-- <button @click="debug" class="border bg-blue-500 text-white font-bold">DEBUG</button> -->
  <form @submit.prevent="handleSubmit">
    <div class="form-control">
      <label for="email">Email: </label>
      <input @focus="clearError" class="border-2 rounded-lg border-gray-300" type="email" id="email"
        v-model.trim="email.val">
      <p v-if="!email.isValid" class="mt-1 text-red-600">Invalid Email</p>
    </div>
    <div class="form-control">
      <label for="password">Password: </label>
      <input @focus="clearError" class="border-2 rounded-lg border-gray-300" type="password" id="password"
        v-model.trim="password.val">
      <p v-if="!password.isValid" class="mt-1 text-red-600">Incorrect Password</p>
    </div>
    <!-- <p class="text-bold text-red-600 mb-2" v-if="!!errorMessage">{{ errorMessage}}</p> -->
    <base-dialog :show="!!errorMessage" title="An error occured!" @close="handleError">
      <p>{{ errorMessage }}</p>
    </base-dialog>
    <p v-if="!isLoading && !!errorMessage" class="text-bold text-red-600 mb-2">{{ errorMessage }}</p>
    <button v-if="!isLoading" class="hover:scale-95 block mx-auto bg-blue-500 font-bold text-white p-1 border rounded-lg
      hover:bg-blue-400">Sign In</button>
    <button disabled v-if="isLoading" class="block mx-auto bg-blue-500 font-bold text-white p-1 border rounded-lg
      hover:bg-blue-400 animate-pulse">Please wait...</button>

  </form>
</template>

<script>
import { useBlogStore } from '../../stores/blog.js';
export default {
  setup() {
    const store = useBlogStore();
    return { store }
  },
  data() {
    return {
      email: {
        val: '',
        isValid: true,
      },
      password: {
        val: '',
        isValid: true,
      },
      isLoading: false,
      error: null,
      errorMessage: '',
      formIsInvalid: false,
    }
  },
  methods: {
    validateForm() {
      this.formIsInvalid = false;
      if (!this.email.val.includes('@')) {
        this.email.isValid = false;
        this.formIsInvalid = true;
      }
      if (this.password.val.length < 6) {
        this.password.isValid = false;
        this.formIsInvalid = true;
      }
    },
    async handleSubmit() {
      //Form validation
      this.validateForm()
      if (this.formIsInvalid) {
        return;
      }

      try {
        //Login request
        this.isLoading = true;
        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAPsqdelB2nGFq0ujXianUjDrlZenfmN5k',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email: this.email.val,
              password: this.password.val,
              returnSecureToken: true
            })
          });

        const responseData = await response.json();

        if (!response.ok) {
          const error = new Error(responseData.error.message || 'Login failed please try again.');
          throw error;
        }



        this.store.userId = responseData.idToken;
      } catch (error) {
        console.log('There was an error: ', error);
        this.errorMessage = error.message;
        this.isLoading = false;
        return;
      }


      if (this.store.userId) {
        this.isLoading = false;
        this.store.logIn()
        this.$router.push('/newPost');
      } else {
        this.errorMessage = 'There was an error, please try again.'
      }
    },

    clearError() {
      this.email.isValid = true;
      this.password.isValid = true;
      this.formIsInvalid = false;
    },
    // debug() {
    //   console.log(this.email.isValid)
    //   console.log(this.password.isValid)
    //   this.validateForm()
    // }
    handleError() {
      this.errorMessage = null;
    }
  },
}
</script>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>

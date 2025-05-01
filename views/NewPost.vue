<template>
  <div>
    <base-dialog :show="!!errorMessage" title="An error occured!" @close="handleError">
      <p>{{ errorMessage }}</p>
    </base-dialog>
    <base-card>
      <h1 class="font-bold text-1xl text-center container mx-auto mb-2">New Post</h1>
      <form @submit.prevent="handleSubmit">
        <div class="container flex flex-col">
          <label for="title">Title: </label>
          <input @focus="clearError" class="border-2 rounded-lg border-gray-300" type="text" id="title"
            v-model.trim="titleInput.val">
          <p class="text-red-600" v-if="!titleInput.isValid">A Title is required</p>
          <label for="text">Text: </label>
          <textarea @focus="clearError" v-model.trim="textInput.val" class="border-2 rounded-lg border-gray-300" id="text"
            name="text" cols="30" rows="10"></textarea>
          <p class="text-red-600" v-if="!textInput.isValid">Blog text is required.</p>
        </div>
        <button
          class="hover:scale-95 active:bg-blue-400 block mx-auto border-2 rounded-lg bg-blue-500 text-white font-bold p-1 mt-3">Submit</button>
      </form>
    </base-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      titleInput: {
        val: '',
        isValid: true,
      },
      textInput: {
        val: '',
        isValid: true,
      },
      formIsValid: true,
      errorMessage: null,
    }
  },
  methods: {
    validateForm() {
      if (this.titleInput.val.length === 0) {
        this.titleInput.isValid = false;
        this.formIsValid = false;
      }
      if (this.textInput.val.length === 0) {
        this.textInput.isValid = false;
        this.formIsValid = false;
      }
    },
    async handleSubmit() {
      this.validateForm()

      if (!this.formIsValid) {
        return;
      }

      //For debugging
      const noRequest = false;
      if (noRequest) {
        console.log("Requests Disabled for Debugging")
        return;
      }

      try {
        const response = await fetch('ttps://vue-blog-68392-default-rtdb.firebaseio.com/posts.json', {
          method: 'POST',
          body: JSON.stringify({
            title: this.titleInput.val,
            postText: this.textInput.val,
          })
        })

        const responseData = await response.json();

        if (!response.ok) {
          const error = new Error(response.error.message || 'There was an error submitting your post')
          throw error;
        }

      } catch (error) {
        this.errorMessage = (error || 'There was an error submitting your post')
      }

      //Only on success
      this.$router.push('/');
    },
    clearError() {
      this.isError = false
      this.formIsValid = true;
      this.titleInput.isValid = true;
      this.textInput.isValid = true;
    },
    handleError() {
      this.errorMessage = null;
    }
  },
}
</script>

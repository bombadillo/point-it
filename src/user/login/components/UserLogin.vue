<template>
  <div class="pure-g center container">
    <div class="pure-u-1-4">
      <form @submit.prevent="onSubmit" class="pure-form pure-form-stacked">
        <fieldset>
          <legend>Login</legend>
          <label for="name">Name</label>
          <input
            v-model="username"
            type="text"
            id="name"
            placeholder="Your name"
          />
          <button type="submit" class="pure-button pure-button-primary">
            Sign in
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: ['userLoggedIn'],
  data() {
    return {
      username: ''
    }
  },
  methods: {
    onSubmit() {
      const user = { name: this.username }
      localStorage.setItem('user', JSON.stringify(user))
      this.userLoggedIn({ name: this.username })
    }
  }
}
</script>

<style scoped>
.center {
  justify-content: center;
}

.container {
  margin-top: 100px;
}
</style>

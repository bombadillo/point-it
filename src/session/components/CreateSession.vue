<template>
  <div class="pure-g">
    <div class="pure-u-1">
      <h1>Create new session</h1>
      <form @submit="onFormSubmit" class="pure-form pure-form-stacked">
        <fieldset>
          <legend>Session details</legend>
          <label for="session-name">Name</label>
          <input
            v-model="sessionName"
            type="text"
            id="session-name"
            placeholder="name"
          />
          <button type="submit" class="pure-button pure-button-primary">
            Create session
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import createSession from '@/session/services/create-session'

export default {
  data() {
    return {
      sessionName: ''
    }
  },
  methods: {
    onFormSubmit() {
      console.log(this.sessionName)
      const session = createSession(this.sessionName)
      console.log(session)
    }
  }
}
</script>

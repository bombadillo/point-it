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
import getLocalUser from '@/user/services/get-logged-in-user'

export default {
  props: ['onSessionCreated'],
  data() {
    return {
      sessionName: ''
    }
  },
  methods: {
    async onFormSubmit() {
      const session = await createSession(this.sessionName, getLocalUser())
      this.onSessionCreated(session)
    }
  }
}
</script>

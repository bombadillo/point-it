<template>
  <div class="pure-g">
    <div class="pure-u-1">
      <h1>Join session</h1>
      <form @submit.prevent="onFormSubmit" class="pure-form pure-form-stacked">
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
            Join session
          </button>
        </fieldset>
      </form>
    </div>
  </div>
</template>

<script>
import joinSession from '@/session/services/join-session'
import getLocalUser from '@/user/services/get-logged-in-user'

export default {
  props: ['onSessionJoined'],
  data() {
    return {
      sessionName: ''
    }
  },
  methods: {
    async onFormSubmit() {
      const session = await joinSession(this.sessionName, getLocalUser())
      this.onSessionJoined(session)
    }
  }
}
</script>

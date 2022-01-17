<template>
  <div class="flex flex-row md:mt-14 p-10">
    <div class="basis-full md:basis-1/4">
      <h1 class="text-xl font-bold">Join session</h1>

      <form @submit.prevent="onSubmit" class="mt-4 space-y-6">
        <input type="hidden" name="remember" value="true" />
        <div class="rounded-md shadow-sm -space-y-px">
          <div>
            <label for="sessionName" class="sr-only">Session name</label>
            <input
              v-model="sessionName"
              name="sessionName"
              type="text"
              required
              class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Session name"
            />
          </div>
        </div>
        <button
          class="group relative py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Join
        </button>
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
    async onSubmit() {
      const session = await joinSession(this.sessionName, getLocalUser())
      this.onSessionJoined(session)
    }
  }
}
</script>

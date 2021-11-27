<template>
  <div id="list" class="pure-u-1">
    <div
      v-for="ticket in groomingTickets.issues"
      :key="ticket.id"
      class="email-item email-item-selected pure-g"
    >
      <div class="pure-u">🎫</div>

      <div class="pure-u-3-4">
        <h5 class="email-name">{{ ticket.reportedBy }}</h5>
        <h4 class="email-subject">{{ ticket.name }}</h4>
        <p class="email-desc">
          {{ ticket.summary }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import getGroomingTickets from '@/jira/grooming-tickets/services/getGroomingTickets'

export default {
  data() {
    return { groomingTickets: [] }
  },
  methods: {
    async getGroomingTickets() {
      const groomingTickets = await getGroomingTickets()
      console.log(groomingTickets)
      this.groomingTickets = groomingTickets
    }
  },
  mounted() {
    this.getGroomingTickets()
  }
}
</script>

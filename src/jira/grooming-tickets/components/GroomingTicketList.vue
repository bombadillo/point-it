<template>
  <div id="list" class="pure-u-1">
    <Skeleton v-if="loading" :totalToDisplay="4" />
    <div
      v-for="ticket in groomingTickets.issues"
      :key="ticket.id"
      class="email-item email-item-selected pure-g"
      @click="ticketSelected(ticket)"
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
import Skeleton from '@/skeleton/components/Skeleton'

export default {
  props: ['onTicketSelected'],
  components: { Skeleton },
  data() {
    return { loading: true, groomingTickets: [] }
  },
  methods: {
    async getGroomingTickets() {
      const groomingTickets = await getGroomingTickets()
      this.groomingTickets = groomingTickets
      this.loading = false
    },
    ticketSelected(ticket) {
      this.onTicketSelected(ticket)
    }
  },
  mounted() {
    this.getGroomingTickets()
  }
}
</script>

<style>
.email-item {
  transition: background 0.5s ease;
  background: rgba(238, 238, 238, 0.1);
}
.email-item:hover {
  cursor: pointer;
  background: rgba(238, 238, 238, 1);
}
</style>

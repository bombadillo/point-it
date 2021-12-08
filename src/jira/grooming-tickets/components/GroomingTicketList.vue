<template>
  <div id="list" class="pure-u-1">
    <Skeleton v-if="loadingTickets" :totalToDisplay="4" />
    <h3 v-if="showNoTicketsMessage()">No tickets to groom</h3>
    <div
      v-for="ticket in tickets.issues"
      :key="ticket.id"
      :class="`email-item email-item-selected pure-g ${
        ticket.id === selectedTicket.id ? 'selected' : ''
      } `"
      @click="ticketSelected(ticket)"
    >
      <div class="pure-u">{{ getTicketEmoji(ticket) }}</div>

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
import Skeleton from '@/skeleton/components/Skeleton'

export default {
  props: ['onTicketSelected', 'loadingTickets', 'tickets', 'selectedTicket'],
  components: { Skeleton },
  methods: {
    ticketSelected(ticket) {
      this.onTicketSelected(ticket)
    },
    showNoTicketsMessage() {
      return this.tickets?.length === 0 && !this.loadingTickets
    },
    getTicketEmoji(ticket) {
      switch (ticket.type) {
        case 'Story':
          return '🎫'
        case 'Bug':
          return '🐛'
        case 'Technical Spike':
          return '💡'
        default:
          return '🤖'
      }
    }
  }
}
</script>

<style scoped>
.email-item {
  transition: background 0.5s ease;
  background: rgba(238, 238, 238, 0.1);
}
.email-item:hover {
  cursor: pointer;
  background: rgba(238, 238, 238, 1);
}

h3 {
  padding: 10px;
}

.selected,
.selected:hover {
  background: rgba(0, 117, 225, 0.9);
  color: white;
}

.selected .email-name {
  color: rgba(250, 250, 250, 0.7);
}
</style>

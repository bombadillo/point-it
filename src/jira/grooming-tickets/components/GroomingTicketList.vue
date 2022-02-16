<template>
  <div class="p-10 overflow-auto h-screen">
    <SkeletonLoader v-if="loadingTickets" :totalToDisplay="4" />
    <h3 v-if="showNoTicketsMessage()">No tickets to groom</h3>
    <div
      v-for="ticket in tickets.issues"
      :key="ticket.id"
      :class="`bg-white p-4 rounded-md mb-4 hover:drop-shadow-xl ease-out duration-100 cursor-pointer ${
        ticket.id === selectedTicket?.id
          ? ' border-black-800 drop-shadow-2xl scale-105'
          : ''
      } `"
      @click="ticketSelected(ticket)"
    >
      <div class="flex flex-row">
        <div class="">{{ getTicketEmoji(ticket) }}</div>
        <div class="pl-2 font-bold">
          <h4 class="">{{ ticket.name }}</h4>
        </div>
      </div>

      <div class="">
        <h5 class="text-gray-400">{{ ticket.reportedBy }}</h5>

        <p class="">
          {{ ticket.summary }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import SkeletonLoader from '@/skeleton/components/SkeletonLoader'

export default {
  props: ['onTicketSelected', 'loadingTickets', 'tickets', 'selectedTicket'],
  components: { SkeletonLoader },
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
/* .email-item {
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
} */
</style>

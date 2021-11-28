<template>
  <div id="layout" class="content pure-g">
    <div id="nav" class="pure-u">
      <a href="#" id="menuLink" class="nav-menu-button">Menu</a>

      <div class="nav-inner">
        <h1 class="logo">👉 it!</h1>

        <div class="pure-menu">
          <ul class="pure-menu-list">
            <li class="pure-menu-item">
              <a href="#" class="pure-menu-link">Join new session</a>
            </li>
            <li class="pure-menu-item">
              <a href="#" class="pure-menu-link">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <GroomingTicketList :onTicketSelected="onTicketSelected" />

    <GroomingTicket :ticket="selectedTicket" :pointSubmitted="pointSubmitted" />
  </div>
</template>

<script>
import '@/assets/styles/app-styles.css'
import GroomingTicketList from '@/jira/grooming-tickets/components/GroomingTicketList'
import GroomingTicket from '@/jira/grooming-tickets/components/GroomingTicket'

export default {
  name: 'App',
  components: { GroomingTicketList, GroomingTicket },
  data() {
    return {
      selectedTicket: undefined
    }
  },
  methods: {
    onTicketSelected(ticket) {
      console.log('ticket received', ticket)
      this.selectedTicket = ticket
    },
    pointSubmitted(point) {
      console.log('point received', point)
    }
  }
}
</script>

<style scoped>
.logo {
  color: white;
}
</style>

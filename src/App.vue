<template>
  <div v-if="!user"><UserLogin :userLoggedIn="userLoggedIn" /></div>

  <div v-if="user" id="layout" class="content pure-g">
    <div id="nav" class="pure-u">
      <a href="#" id="menuLink" class="nav-menu-button">Menu</a>

      <div class="nav-inner">
        <h1 class="logo">👉 it!</h1>

        <div class="pure-menu">
          <ul class="pure-menu-list">
            <li class="pure-menu-item">
              <p class="pure-menu-user">🐱‍💻 {{ user.name }}</p>
            </li>
            <li class="pure-menu-item">
              <a href="#" class="pure-menu-link">Join new session</a>
            </li>
            <li class="pure-menu-item">
              <a href="#" class="pure-menu-link">Create new session</a>
            </li>
            <li class="pure-menu-item">
              <a @click="logout" href="#" class="pure-menu-link">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <GroomingTicketList :onTicketSelected="onTicketSelected" />

    <GroomingTicket
      v-if="!groomingSuccessful"
      :ticket="selectedTicket"
      :pointSubmitted="pointSubmitted"
    />

    <GroomingSuccess v-if="groomingSuccessful" />
  </div>
</template>

<script>
import '@/assets/styles/app-styles.css'
import GroomingTicketList from '@/jira/grooming-tickets/components/GroomingTicketList'
import GroomingTicket from '@/jira/grooming-tickets/components/GroomingTicket'
import GroomingSuccess from '@/jira/grooming-tickets/components/GroomingSuccess'
import UserLogin from '@/user/login/components/UserLogin'
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader'

export default {
  name: 'App',
  components: {
    GroomingTicketList,
    GroomingTicket,
    GroomingSuccess,
    UserLogin
  },
  data() {
    return {
      user: undefined,
      selectedTicket: undefined,
      groomingSuccessful: false
    }
  },
  methods: {
    onTicketSelected(ticket) {
      console.log('ticket received', ticket)
      this.selectedTicket = ticket
      this.groomingSuccessful = false
    },
    pointSubmitted(point) {
      console.log('point received', point)
      this.groomingSuccessful = true
    },
    userLoggedIn(user) {
      this.user = user
    },
    logout() {
      this.user = undefined
    }
  },
  setup() {
    initSkeleton()
  }
}
</script>

<style scoped>
.logo {
  color: white;
}
</style>

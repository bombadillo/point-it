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
              <p class="pure-menu-user"><span>🐱‍💻</span> {{ user.name }}</p>
            </li>
            <li class="pure-menu-item">
              <a href="#" class="pure-menu-link">🤝 Join new session</a>
            </li>
            <li class="pure-menu-item">
              <a @click="onCreateSessionClicked" href="#" class="pure-menu-link"
                >🆕 Create new session</a
              >
            </li>
            <li class="pure-menu-item">
              <a @click="logout" href="#" class="pure-menu-link">👋 Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="session">
      <GroomingTicketList :onTicketSelected="onTicketSelected" />

      <GroomingTicket
        v-if="!groomingSuccessful"
        :ticket="selectedTicket"
        :pointSubmitted="pointSubmitted"
      />

      <GroomingSuccess v-if="groomingSuccessful" />
    </div>
    <div v-else>
      <CreateSession v-if="showCreateSession" />
      <NoSession v-else />
    </div>
  </div>
</template>

<script>
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader'

import '@/assets/styles/app-styles.css'
import GroomingTicketList from '@/jira/grooming-tickets/components/GroomingTicketList'
import GroomingTicket from '@/jira/grooming-tickets/components/GroomingTicket'
import GroomingSuccess from '@/jira/grooming-tickets/components/GroomingSuccess'
import UserLogin from '@/user/login/components/UserLogin'
import getLoggedInUser from '@/user/services/get-logged-in-user'
import logUserOut from '@/user/services/log-user-out'
import NoSession from '@/session/components/NoSession'
import CreateSession from '@/session/components/CreateSession'

export default {
  name: 'App',
  components: {
    GroomingTicketList,
    GroomingTicket,
    GroomingSuccess,
    UserLogin,
    NoSession,
    CreateSession
  },
  data() {
    return {
      user: undefined,
      session: undefined,
      selectedTicket: undefined,
      groomingSuccessful: false,
      showCreateSession: false
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
    tryGetLoggedInUser() {
      this.user = getLoggedInUser()
    },
    userLoggedIn(user) {
      this.user = user
    },
    logout() {
      logUserOut()
      this.user = undefined
    },
    onCreateSessionClicked() {
      this.showCreateSession = true
    }
  },
  setup() {
    initSkeleton()
  },
  mounted() {
    this.tryGetLoggedInUser()
  }
}
</script>

<style scoped>
.logo {
  color: white;
  background: rgb(51, 66, 109);
  color: white;
  padding: 20px;
  margin-top: 0;
}
</style>

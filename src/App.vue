<template>
  <div v-if="!user"><UserLogin :userLoggedIn="userLoggedIn" /></div>

  <div v-if="user" id="layout" class="content pure-g">
    <div id="nav" class="pure-u">
      <a href="#" id="menuLink" class="nav-menu-button">Menu</a>

      <div class="nav-inner">
        <h1 class="logo"><span>👉</span> it!</h1>

        <div class="pure-menu">
          <ul class="pure-menu-list">
            <li class="pure-menu-item">
              <p class="pure-menu-user"><span>🐱‍💻</span> {{ user.name }}</p>
            </li>
            <li class="pure-menu-item">
              <a @click="onJoinSessionClicked" href="#" class="pure-menu-link"
                >🤝 Join session</a
              >
            </li>
            <li class="pure-menu-item">
              <a @click="onCreateSessionClicked" href="#" class="pure-menu-link"
                >🆕 Create new session</a
              >
            </li>
            <li class="pure-menu-item">
              <a @click="logout" href="#" class="pure-menu-link">👋 Logout</a>
            </li>
            <li class="pure-menu-item">
              <p class="pure-menu-user"><span>👥</span> Users</p>
              <ul>
                <li v-for="user in session.users" :key="user.name" class="user">
                  {{ user.name }}
                </li>
              </ul>
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
      <CreateSession
        v-if="showCreateSession"
        :onSessionCreated="onSessionCreated"
      />
      <JoinSession
        v-else-if="showJoinSession"
        :onSessionJoined="onSessionJoined"
      />
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
import JoinSession from '@/session/components/JoinSession'
import getLocalSession from '@/session/services/get-local-session'

export default {
  name: 'App',
  components: {
    GroomingTicketList,
    GroomingTicket,
    GroomingSuccess,
    UserLogin,
    NoSession,
    CreateSession,
    JoinSession
  },
  data() {
    return {
      user: undefined,
      session: undefined,
      selectedTicket: undefined,
      groomingSuccessful: false,
      showCreateSession: false,
      showJoinSession: false
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
      this.session = undefined
    },
    onCreateSessionClicked() {
      this.showCreateSession = true
    },
    onSessionCreated(session) {
      this.session = session
    },
    tryGetLocalSession() {
      this.session = getLocalSession()
      console.log(this.session)
    },
    onJoinSessionClicked() {
      this.showJoinSession = true
    },
    onSessionJoined(session) {
      this.session = session
    }
  },
  setup() {
    initSkeleton()
  },
  mounted() {
    this.tryGetLoggedInUser()
    this.tryGetLocalSession()
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

.user {
  color: white;
}
</style>

<template>
  <div v-if="!user"><UserLogin :userLoggedIn="userLoggedIn" /></div>
  <!-- 
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
              <a
                @click="onJoinSessionClicked"
                href="javascript:void(0)"
                class="pure-menu-link"
                >🤝 Join session</a
              >
            </li>
            <li class="pure-menu-item">
              <a
                @click="onCreateSessionClicked"
                href="javascript:void(0)"
                class="pure-menu-link"
                >🆕 Create new session</a
              >
            </li>
            <li class="pure-menu-item">
              <a
                @click="logout"
                href="javascript:void(0)"
                class="pure-menu-link"
                >👋 Logout</a
              >
            </li>
            <li v-if="session?.users" class="pure-menu-item">
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
      <GroomingTicketList
        :onTicketSelected="onTicketSelected"
        :tickets="groomingTickets"
        :loadingTickets="loadingGroomingTickets"
        :selectedTicket="selectedTicket"
      />

      <GroomingTicket
        v-if="!groomingSuccessful"
        :ticket="selectedTicket"
        :pointSubmitted="pointSubmitted"
        :session="session"
        :repointRequired="repointRequired"
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
  </div> -->

  <div v-if="user" class="container">
    <div class="flex flex-col md:flex-row">
      <div class="basis-1/4">
        <NavSidebar :user="user" :session="session" />
      </div>
      <div class="basis-1/4 bg-gray-200">
        <GroomingTicketList
          :onTicketSelected="onTicketSelected"
          :tickets="groomingTickets"
          :loadingTickets="loadingGroomingTickets"
          :selectedTicket="selectedTicket"
        />
      </div>
      <div class="basis-1/2 bg-gray-100">
        <GroomingTicket
          v-if="!groomingSuccessful"
          :ticket="selectedTicket"
          :pointSubmitted="pointSubmitted"
          :session="session"
          :repointRequired="repointRequired"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader'

import getGroomingTickets from '@/jira/grooming-tickets/services/getGroomingTickets'
import NavSidebar from '@/navigation/components/NavSidebar'
import GroomingTicketList from '@/jira/grooming-tickets/components/GroomingTicketList'
import GroomingTicket from '@/jira/grooming-tickets/components/GroomingTicket'
// import GroomingSuccess from '@/jira/grooming-tickets/components/GroomingSuccess'
import UserLogin from '@/user/login/components/UserLogin'
import getLoggedInUser from '@/user/services/get-logged-in-user'
import logUserOut from '@/user/services/log-user-out'
// import NoSession from '@/session/components/NoSession'
// import CreateSession from '@/session/components/CreateSession'
// import JoinSession from '@/session/components/JoinSession'
import getLocalSession from '@/session/services/get-local-session'
import getSession from '@/session/services/get-session'
import setActiveTicketForSession from '@/session/services/set-active-ticket-for-session'
import addPointsToActiveTicket from '@/session/services/add-points-to-active-ticket'

export default {
  name: 'App',
  components: {
    GroomingTicketList,
    GroomingTicket,
    // GroomingSuccess,
    UserLogin,
    // NoSession,
    // CreateSession,
    // JoinSession,
    NavSidebar
  },
  data() {
    return {
      user: undefined,
      session: undefined,
      selectedTicket: undefined,
      groomingSuccessful: false,
      showCreateSession: false,
      showJoinSession: false,
      repointRequired: false,
      loadingGroomingTickets: true,
      sessionRefreshInterval: undefined,
      getGroomingTicketsInterval: undefined,
      groomingTickets: []
    }
  },
  methods: {
    onTicketsLoaded() {
      if (this.session?.activeTicketId && !this.selectedTicket) {
        this.setActiveTicket(this.session.activeTicketId)
      }
    },
    onTicketSelected(ticket) {
      this.selectedTicket = ticket
      this.groomingSuccessful = false
      setActiveTicketForSession(this.session.name, ticket)
    },
    pointSubmitted(points) {
      addPointsToActiveTicket(
        this.session.name,
        this.user,
        points,
        this.session.activeTicketId
      )
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

      if (this.session?.groomingSuccessful) {
        this.groomingSuccessful = true
      }
    },
    onJoinSessionClicked() {
      this.session = undefined
      this.showJoinSession = true
      clearInterval(this.triggerSessionRefreshInterval)
      this.triggerSessionRefreshInterval = null
      clearInterval(this.getGroomingTicketsInterval)
      this.getGroomingTicketsInterval = null
    },
    onSessionJoined(session) {
      this.session = session
    },
    async triggerSessionRefreshInterval() {
      this.sessionRefreshInterval = setInterval(async () => {
        if (!this.session) {
          clearInterval(this.triggerSessionRefreshInterval)
          this.triggerSessionRefreshInterval = null
          return
        }

        this.getLatestSession()
      }, 3000)
    },
    async tiggerGetGroomingTicketsInterval() {
      this.getGroomingTicketsInterval = setInterval(async () => {
        if (!this.session) {
          clearInterval(this.getGroomingTicketsInterval)
          this.getGroomingTicketsInterval = null
          return
        }

        this.getGroomingTickets()
      }, 10000)
    },
    async getLatestSession() {
      const latestSession = await getSession(this.session.name)

      if (
        latestSession.activeTicketId &&
        (latestSession.activeTicketId !== this.session.activeTicketId ||
          !this.selectedTicket)
      ) {
        this.groomingSuccessful = false
        this.setActiveTicket(latestSession.activeTicketId)
      }

      if (!this.groomingSuccessful && latestSession.groomingSuccessful) {
        this.getGroomingTickets()
        this.groomingSuccessful = true
        this.repointRequired = false
      } else if (
        latestSession.allUsersPointed &&
        !latestSession.pointsAreUnanimous
      ) {
        this.repointRequired = true
      }

      this.session = latestSession
    },
    setActiveTicket(ticketId) {
      this.selectedTicket = this.groomingTickets.issues.find(
        x => x.id === ticketId
      )
    },
    async getGroomingTickets(showLoader = false) {
      this.loadingGroomingTickets = showLoader
      const groomingTickets = await getGroomingTickets()
      this.groomingTickets = groomingTickets || []
      this.onTicketsLoaded(groomingTickets)
      this.loadingGroomingTickets = false
    }
  },
  setup() {
    initSkeleton()
  },
  mounted() {
    this.getGroomingTickets(true)
    this.tryGetLoggedInUser()
    this.tryGetLocalSession()
  },
  updated() {
    if (
      this.session &&
      !this.sessionRefreshInterval &&
      !this.getGroomingTicketsInterval
    ) {
      this.triggerSessionRefreshInterval()
      this.tiggerGetGroomingTicketsInterval()
    }
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

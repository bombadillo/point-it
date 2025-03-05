<template>
  <div v-if="!user"><UserLogin :userLoggedIn="userLoggedIn" /></div>

  <div v-if="user" class="container max-w-max">
    <div class="flex flex-col md:flex-row w-screen h-screen">
      <div class="basis-1/6">
        <NavSidebar
          :user="user"
          :session="session"
          :logout="logout"
          :onCreateSessionClicked="onCreateSessionClicked"
          :onJoinSessionClicked="onJoinSessionClicked"
        />
      </div>
<!-- IF JIRA/DEVOPS enabled
      <div class="basis-2/6 bg-gray-200" v-if="session">
        <GroomingTicketList
          :onTicketSelected="onTicketSelected"
          :tickets="groomingTickets"
          :loadingTickets="loadingGroomingTickets"
          :selectedTicket="selectedTicket"
        />
      </div>
       -->
      <div class="basis-5/6 bg-gray-100" v-if="session">
        <GroomingTicket
          :session="session"
          :user="user"
        />
      </div>
      <div class="basis-5/6 bg-gray-100" v-if="!session">
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
  </div>
</template>

<script>
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader'

import NavSidebar from '@/navigation/components/NavSidebar'
import GroomingTicket from '@/default-grooming-tickets-provider/components/GroomingTicket'
import UserLogin from '@/user/login/components/UserLogin'
import userService from '@/user/services/userService'
import logUserOut from '@/user/services/log-user-out'
import NoSession from '@/session/components/NoSession'
import CreateSession from '@/session/components/CreateSession'
import JoinSession from '@/session/components/JoinSession'
import getLocalSession from '@/session/services/get-local-session'
import getSession from '@/session/services/get-session'

export default {
  name: 'App',
  components: {
    GroomingTicket,
    UserLogin,
    NoSession,
    CreateSession,
    JoinSession,
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
      groomingTickets: []
    }
  },
  methods: {
    tryGetLoggedInUser() {
      this.user = userService.getLoggedInUser()
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
      this.clearSession()

      this.showCreateSession = true
      this.showJoinSession = false
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
      this.clearSession()
      this.showJoinSession = true
      this.showCreateSession = false
    },
    clearSession() {
      this.session = undefined
      clearInterval(this.sessionRefreshInterval)
      this.sessionRefreshInterval = null
    },
    onSessionJoined(session) {
      this.session = session
    },
    async triggerSessionRefreshInterval() {
      this.sessionRefreshInterval = setInterval(async () => {
        if (!this.session) {
          clearInterval(this.sessionRefreshInterval)
          this.sessionRefreshInterval = null
          return
        }

        this.getLatestSession()
      }, 3000)
    },
    async getLatestSession() {
      const latestSession = await getSession(this.session.name)
  console.log(latestSession)
      // if (
      //   latestSession.activeTicketId &&
      //   (latestSession.activeTicketId !== this.session.activeTicketId ||
      //     !this.selectedTicket)
      // ) {
      //   this.groomingSuccessful = false
      // }

      if (!this.groomingSuccessful && latestSession.groomingSuccessful) {
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

  },
  setup() {
    initSkeleton()
  },
  mounted() {
    // this.getGroomingTickets(true)
    this.tryGetLoggedInUser()
    this.tryGetLocalSession()
    console.log(this.user)
  },
  updated() {
    if (
      this.session &&
      !this.sessionRefreshInterval &&
      !this.getGroomingTicketsInterval
    ) {
      if (this.triggerSessionRefreshInterval) {
        this.triggerSessionRefreshInterval()
      }
      // if (this.tiggerGetGroomingTicketsInterval) {
      //   this.tiggerGetGroomingTicketsInterval()
      // }
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

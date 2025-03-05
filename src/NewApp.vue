<template>
    <nav-sidebar-new />
    <router-view />

    <!--
    <div v-if="showCreateGame()"><CreateGame :userLoggedIn="userLoggedIn" :onSessionCreated="onSessionCreated" /></div>

    <initiate-game-create v-if="showInitiateGameCreate()" :onStartGameClick="onStartGameClick" />

    <game-session v-if="showGameSession()" :user="user" :session="session"/> -->

    <!-- <div v-if="!gameCreateStarted" class="mx-auto max-w-screen-lg px-3 py-6">
        <div class="flex flex-col gap-6 items-center">
            <div
                class="flex flex-col gap-x-8 rounded-md bg-slate-800 p-10 md:flex-row"
            >
                <div>
                    <div class="flex flex-col gap-y-2 md:flex-row">
                        <button
                        @click="onStartGameClick"
                            class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        >
                            Start new game
                        </button>
                    </div>
                    <p class="mt-3 text-gray-400">
                        Begin a new estimation session and invite players to
                        join you!
                    </p>
                </div>
            </div>
        </div>
    </div> -->
</template>

<script>
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader'

// import NavSidebar from '@/navigation/components/NavSidebar'
// import GroomingTicket from '@/default-grooming-tickets-provider/components/GroomingTicket'
// import NoSession from '@/session/components/NoSession'
// import CreateSession from '@/session/components/CreateSession'
// import JoinSession from '@/session/components/JoinSession'

import userService from '@/user/services/user-service'
// import logUserOut from '@/user/services/log-user-out'

// import getLocalSession from '@/session/services/get-local-session'
// import getSession from '@/session/services/get-session'

import NavSidebarNew from '@/navigation/components/NavSidebarNew.vue'
// import CreateGame from '@/game/create/CreateGame'

// import GameSession from '@/game/GameSession.vue'
// import InitiateGameCreate from './game/create/initiate/InitiateGameCreate.vue'

import { userStore } from '@/store/user-store'

export default {
    name: 'App',
    components: {
        NavSidebarNew
        //         CreateGame,
        // GameSession,
        // InitiateGameCreate,
        // GroomingTicket,

        // NoSession,
        // CreateSession,
        // JoinSession,
        // NavSidebar
    },
    data() {
        return {
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
    setup() {
        initSkeleton()
    },
    mounted() {
        const user = userService.getLoggedInUser()
        userStore.setUser(user)
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

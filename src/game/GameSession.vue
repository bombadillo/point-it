<template>
    <!-- Potentially split this to have an entry point that then redirects you to a game? -->
    <div v-if="!gameStore.game || startingNewGame">
        <div class="mx-auto max-w-screen-lg px-3 py-6">
            <div class="rounded-md bg-slate-800 p-10 font-bold">
                <div class="w-full">
                    <h1>Loading...</h1>
                </div>
            </div>
        </div>
    </div>

    <div v-if="!this.userStore.user" class="mx-auto max-w-screen-lg px-3 py-6">
        <div class="flex flex-col gap-6 items-center">
            <div
                class="flex flex-col gap-x-8 rounded-md bg-slate-800 shadow-2xl p-10 md:flex-row"
            >
                <form @submit.prevent="onNewUserSubmit">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm mb-4">
                        <div>
                            <label for="username" class="sr-only"
                                >User name</label
                            >
                            <input
                                v-model="username"
                                name="username"
                                type="text"
                                required
                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Your name"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" :class="stylingConstants.button">
                            Enter game
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div v-if="gameStore.game && this.userStore.user && !startingNewGame">
        <div class="mx-auto max-w-screen-lg px-3 py-6">
            <div class="rounded-md bg-slate-800 shadow-2xl p-10">
                <div class="w-full">
                    <div class="flex space-x-4 min-w-max py-2 justify-center">
                        <button
                            class="py-2 px-4 border border-transparent text-sm rounded-md text-white font-bold disabled:bg-slate-400 bg-cyan-500 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            @click="revealPoints()"
                            :disabled="
                                noUsersPointed() || gameStore.game.revealPoints
                            "
                        >
                            Reveal points
                        </button>
                    </div>
                    <div
                        class="flex flex-wrap p-3 justify-center gap-x-4 gap-y-4"
                    >
                        <div
                            v-for="user in gameStore.game.users"
                            :key="user.name"
                            class="font-semibold mr-2 text-center"
                        >
                            {{ user.name }}
                            <!-- maybe move this into the grooming card -->
                            <div
                                v-if="
                                    !gameStore.game.revealPoints ||
                                    !getLocalUserPoints(user)
                                "
                                :class="generateUserCardClass(user)"
                            >
                                ?
                            </div>

                            <grooming-card
                                v-if="
                                    gameStore.game.revealPoints &&
                                    getLocalUserPoints(user)
                                "
                                :cardKey="
                                    pointOptions.indexOf(
                                        getLocalUserPoints(user)
                                    )
                                "
                            />
                        </div>
                    </div>
                    <!-- move if checks and skeleton into game-result -->
                    <game-result
                        v-if="gameStore.game.revealPoints"
                        :disableGameResult="disableGameResult"
                        :onGameRestart="onGameRestart"
                    />
                </div>
            </div>
        </div>

        <div class="mx-auto max-w-screen-lg px-3 py-6">
            <div
                class="fixed md:relative bottom-0 left-0 right-0 rounded-none md:rounded-md bg-slate-800 shadow-2xl"
            >
                <div class="overflow-x-auto w-full">
                    <div class="flex space-x-4 min-w-max p-10 justify-center">
                        <grooming-card
                            v-for="(point, index) in pointOptions"
                            :key="index"
                            :point="point"
                            :cardKey="index"
                            :pointIt="pointIt"
                            :selectedPoint="selectedPoint"
                            animate="true"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import GroomingCard from '@/card/components/GroomingCard'
import GameResult from '@/game/result/GameResult'

import addPointsToActiveTicket from '@/session/services/add-points-to-active-ticket'
import revealPointsService from '@/session/services/reveal-points'
import getSession from '@/session/services/get-session'
import getLocalSession from '@/session/services/get-local-session'

import stylingConstants from '@/constants/styling'

import { userStore } from '@/store/user-store'
import { gameStore } from '@/store/game-store'

import joinSession from '@/session/services/join-session'
import groomNextTicket from '@/session/services/groom-next-ticket'

export default {
    components: {
        GroomingCard,
        GameResult
    },
    data() {
        return {
            pointOptions: [1, 2, 3, 5, 8, 13, 20, 40],
            selectedPoint: null,
            disableGameResult: false,
            gameRefreshInterval: undefined,
            startingNewGame: false,
            userStore,
            gameStore,
            stylingConstants
        }
    },
    methods: {
        pointIt(points) {
            this.points = points
            this.pointSubmitted(this.points)
        },
        pointSubmitted(points) {
            console.log(this.userStore.user)
            this.selectedPoint = points

            // move to service
            const newUsers = this.gameStore.game.users.map((x) => {
                if (x.name === userStore.user.name) x.points = points
                return x
            })

            const updatedGame = this.gameStore.game
            updatedGame.users = newUsers
            console.log(JSON.stringify(updatedGame))

            this.disableGameResult = true

            this.gameStore.setGame(updatedGame)

            const user = { ...userStore.user, localPoints: points }
            userStore.setUser(user)

            addPointsToActiveTicket(
                gameStore.game.name,
                this.userStore.user,
                points,
                gameStore.game.activeTicketId
            )
        },
        getLocalUserPoints(user) {
            if (user.name !== userStore.user.name) return user.points
            return userStore.user.localPoints ?? user.points
        },
        revealPoints() {
            revealPointsService(gameStore.game?.name)
        },
        generateUserCardClass(user) {
            const cardColour = user.points ? 'cyan' : 'slate'
            let classString = `hidden-points-card max-w-sm rounded overflow-hidden shadow-lg p-7 text-4xl border-4 bg-${cardColour}-700 border-${cardColour}-500`

            return classString
        },
        async triggerGameRefreshInterval() {
            this.getLatestSession()
            this.gameRefreshInterval = setInterval(async () => {
                this.getLatestSession()
            }, 3000)
        },
        async getLatestSession() {
            const game = getLocalSession()
            const gameName = game ? game.name : this.$route.params.name

            if (!gameName) this.$router.push('/game/not-found')

            if (game.users.find((x) => x.name === userStore.name)) {
                this.username = userStore.username;
                this.onNewUserSubmit();
                return;
            }

            const latestGame = await getSession(gameName)
            gameStore.setGame(latestGame)

            this.disableGameResult = false
            this.startingNewGame = false

            if (!gameStore.game) this.$router.push('/game/not-found')
        },
        noUsersPointed() {
            const usersPointed = gameStore.game.users.filter((x) => x.points)

            return usersPointed.length === 0
        },
        async onNewUserSubmit() {
            const user = { name: this.username }
            userStore.setUser(user)
            await joinSession(gameStore.game.name, userStore.user)
        },
        async onGameRestart() {
            this.selectedPoint = null
            this.startingNewGame = true
            await groomNextTicket(this.gameStore.game.name)
        }
    },
    mounted() {
        this.triggerGameRefreshInterval()
    },

    unmounted() {
        clearInterval(this.gameRefreshInterval)
    }
}
</script>

<style></style>

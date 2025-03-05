<template>
    <!-- Potentially split this to have an entry point that then redirects you to a game? -->
    <div v-if="!gameStore.game || startingNewGame">
        <div class="mx-auto max-w-screen-lg px-3 py-6">
            <div class="rounded-md bg-slate-800 p-10 font-bold">
                <div class="w-full flex items-center justify-center">
                    <skeleton-loader />
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
                            <template v-if="showRevealPointsLoading">
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    class="inline w-4 h-4 me-3 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    />
                                </svg>
                                Gathering points...
                            </template>
                            <template v-else> Reveal points </template>
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
    </div>

    <div v-if="gameStore.game && this.userStore.user">
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

import stylingConstants from '@/constants/styling'

import { userStore } from '@/store/user-store'
import { gameStore } from '@/store/game-store'

import joinSession from '@/session/services/join-session'
import groomNextTicket from '@/session/services/groom-next-ticket'
import SkeletonLoader from '@/skeleton/components/SkeletonLoader'

export default {
    components: {
        GroomingCard,
        GameResult,
        SkeletonLoader
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
            stylingConstants,
            showRevealPointsLoading: false
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
            console.log(user.name)
            console.log(userStore.user.name)
            console.log(user.points)
            console.log(this.selectedPoint)
            if (user.name !== userStore.user.name) return user.points
            return this.selectedPoint ?? userStore.user.localPoints
        },
        async revealPoints() {
            this.showRevealPointsLoading = true
            console.log(this.showRevealPointsLoading)
            console.log(
                !gameStore.game ||
                    this.startingNewGame ||
                    this.showRevealPointsLoading
            )
            await revealPointsService(gameStore.game?.name)
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
            const gameName = this.$route.params.name

            if (!gameName) this.$router.push('/game/not-found')

            const latestGame = await getSession(gameName)
            gameStore.setGame(latestGame)

            if (!gameStore.game) this.$router.push('/game/not-found')

            this.disableGameResult = false
            this.startingNewGame = false

            if (gameStore.game.users.find((x) => x.name === userStore.name)) {
                this.username = userStore.username
                this.onNewUserSubmit()
            }

            this.showRevealPointsLoading = false
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

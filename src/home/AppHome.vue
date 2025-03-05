<template>
<app-test />
    <create-game v-if="showCreateGame()" :onGameCreated="onGameCreated" />

    <initiate-game-create
        v-if="showInitiateGameCreate()"
        :onStartGameClick="onStartGameClick"
    />

    <!-- <game-session v-if="showGameSession()" :user="user" :session="session"/> -->
</template>

<script>
import CreateGame from '@/game/create/CreateGame.vue'
import InitiateGameCreate from '@/game/create/initiate/InitiateGameCreate.vue'

export default {
    components: { CreateGame, InitiateGameCreate },
    data() {
        return {
            gameCreateStarted: false
        }
    },
    methods: {
        showInitiateGameCreate() {
            console.log(this.gameCreateStarted)
            return !this.gameCreateStarted
        },
        showCreateGame() {
            return this.gameCreateStarted
        },
        onGameCreated(game) {
            console.log('game created')
            this.$router.push({ path: `/game/${game.name}` })
        },
        onStartGameClick() {
            this.gameCreateStarted = true
        }
    }
}
</script>

<style></style>

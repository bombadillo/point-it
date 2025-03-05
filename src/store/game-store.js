import { reactive } from 'vue'

export const gameStore = reactive({
    game: null,
    getGame() {
        const localGame = localStorage.getItem('session')

        return this.game ?? localGame
    },
    setGame(newGame) {
        this.game = newGame
        console.log('setting game in store')
    },
    clearGame() {
        this.game = null
    }
})

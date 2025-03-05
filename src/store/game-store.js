import { reactive } from 'vue';

export const gameStore = reactive({
  game: null,
  setGame(newGame) {
    this.game = newGame;
    console.log('setting game in store')
  },
  clearGame() {
    this.game = null;
  },
});
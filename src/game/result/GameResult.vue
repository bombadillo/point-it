<template>
    <div v-if="disableGameResult" class="flex justify-center items-center py-2">
        <div role="status" class="max-w-sm animate-pulse">
            <div
                class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"
            ></div>
            <div
                class="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-4"
            ></div>
            <div
                class="w-3/4 h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"
            ></div>
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    <div v-else class="flex flex-wrap justify-center py-2 justify-center">
        <div class="w-full text-center">
            <h2>
                Estimation was
                <span :class="`text-${getFontColour()}-500 font-bold`">{{
                    getGameResultText()
                }}</span>
            </h2>
        </div>
        <div v-if="gameStore.game.groomingSuccessful">
            <div class="w-full text-center pt-4">
                <span
                    :class="`text-3xl text-${getFontColour()}-500 font-bold`"
                    >{{ gameStore.game.agreedPoints }}</span
                >
            </div>
            <div class="w-full text-center">Points</div>
            <div class="w-full text-center mt-4"><button @click="onGameRestart()" :class="stylingConstants.button">Restart</button></div>
        </div>
        <div v-else>
            <div class="w-full text-center pt-4">
                <span class="text-3xl"> 🗣️ </span>
                Discuss and repoint
            </div>
        </div>
    </div>
</template>

<script>
import { gameStore } from '@/store/game-store'
import stylingConstants from '@/constants/styling'


export default {
    props: ['disableGameResult', 'onGameRestart'],
    data() {
        return {
            gameStore,
            stylingConstants
        }
    },
    methods: {
        getGameResultText() {
            return this.gameStore.game.groomingSuccessful
                ? 'successful'
                : 'unsuccessful'
        },
        getFontColour() {
            return this.gameStore.game.groomingSuccessful ? 'green' : 'red'
        }
    }
}
</script>

<style></style>

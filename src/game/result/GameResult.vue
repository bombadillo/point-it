<template>
    <div v-if="disableGameResult" class="flex justify-center items-center py-2">
        <skeleton-loader />
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
            <div class="w-full text-center mt-4">
                <button
                    @click="onGameRestart()"
                    :class="stylingConstants.button"
                >
                    Restart
                </button>
            </div>
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
import SkeletonLoader from '@/skeleton/components/SkeletonLoader'

export default {
    props: ['disableGameResult', 'onGameRestart'],
    components: { SkeletonLoader },
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

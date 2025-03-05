<template>
      <div  class="mx-auto max-w-screen-lg px-3 py-6">
        <div class="flex flex-col gap-6 items-center">
            <div
                class="flex flex-col gap-x-8 rounded-md bg-slate-800 p-10 md:flex-row"
            >
                <div>
                    <div class="flex flex-col gap-y-2 md:flex-row">
                        <button
                        @click="onStartGameClick"
                            :class="stylingConstants.button"
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
    </div>
</template>

<script>
import stylingConstants from '@/constants/styling'

export default {
    props: ['onStartGameClick'],
    data() {
        return {
            stylingConstants
        }
    }
}
</script>

<style>

</style>
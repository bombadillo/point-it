<template>
    <div class="mx-auto max-w-screen-lg px-3 py-6">
        <div class="flex flex-col gap-6 items-center">
            <div
                class="flex flex-col gap-x-8 rounded-md bg-slate-800 p-10 md:flex-row"
            >
                <form @submit.prevent="onSubmit">
                    <input type="hidden" name="remember" value="true" />
                    <div class="rounded-md shadow-sm mb-4">
                        <div>
                            <label for="username" class="sr-only"
                                >Email address</label
                            >
                            <input
                                v-model="username"
                                name="username"
                                type="text"
                                required
                                class="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                placeholder="Your name"
                            />
                        </div>
                    </div>

                    <div>
                        <button type="submit" :class="stylingConstants.button">
                            Create game
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import createSession from '@/session/services/create-session'
import stylingConstants from '@/constants/styling'
import { userStore } from '@/store/user-store';

export default {
    props: ['onGameCreated'],
    data() {
        return {
            username: '',
            stylingConstants
        }
    },
    methods: {
        async onSubmit() {
            this.createUser()
            const game = await createSession(this.sessionName, userStore.user)
            this.onGameCreated(game)
        },

        createUser() {
            const user = { name: this.username }
            localStorage.setItem('user', JSON.stringify(user))
            userStore.setUser(user);
        }
    }
}
</script>

<style scoped>
.center {
    justify-content: center;
}

.container {
    margin-top: 100px;
}
</style>

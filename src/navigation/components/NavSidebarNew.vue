<template>
    <div class="mx-auto max-w-screen-lg px-3 py-6">
        <div
            class="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between"
        >
            <RouterLink to="/"
                ><div
                    class="flex items-center bg-gradient-to-br bg-clip-text text-3xl font-bold"
                >
                    <img :src="headerImage" class="header-img" /> PointIt!
                </div></RouterLink
            >
            <nav>
                <ul v-if="userStore.user" class="flex gap-x-3 font-medium text-gray-200">
                    <li class="hover:text-white">
                        <a href="javascript:void(0)" @click="logout">Logout</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>

<script>
import headerImage from '@/assets/images/cards.png'
import logUserOut from '@/user/services/log-user-out'
import { userStore } from '@/store/user-store';

export default {
    data() {
        return {
            headerImage,
            user: undefined,
            userRefreshInterval: undefined,
            userStore
        }
    },
    methods: {
        logout() {
            logUserOut()
            this.user = undefined
            this.session = undefined
            this.userStore.clearUser();
            this.$router.push('/')
        }
    }
}
</script>

<style>
.header-img {
    width: 100px;
}
</style>

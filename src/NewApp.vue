<template>
    <nav-sidebar-new />
    <router-view />
</template>

<script>
import { defineCustomElements as initSkeleton } from 'skeleton-webcomponent-loader/loader'
import userService from '@/user/services/user-service'
import NavSidebarNew from '@/navigation/components/NavSidebarNew.vue'
import { userStore } from '@/store/user-store'

export default {
    name: 'App',
    components: {
        NavSidebarNew
    },
    data() {
        return {
            selectedTicket: undefined,
            groomingSuccessful: false,
            showCreateSession: false,
            showJoinSession: false,
            repointRequired: false,
            loadingGroomingTickets: true,
            sessionRefreshInterval: undefined,
            groomingTickets: []
        }
    },
    setup() {
        initSkeleton()
    },
    mounted() {
        const user = userService.getLoggedInUser()
        userStore.setUser(user)
    }
}
</script>

<style scoped>
.logo {
    color: white;
    background: rgb(51, 66, 109);
    color: white;
    padding: 20px;
    margin-top: 0;
}

.user {
    color: white;
}
</style>

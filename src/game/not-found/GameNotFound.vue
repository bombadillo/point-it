<template>
    <app-card>
        <app-alert title="Game not found"
            >Join a new session or
            <RouterLink to="/" class="text-blue-300 hover:text-blue-600 "
                >create your own</RouterLink
            >.
        </app-alert>
    </app-card>
</template>

<script>
import AppAlert from '../../ux/alert/AppAlert.vue'
import AppCard from '../../ux/card/AppCard.vue'

export default {
    components: { AppCard, AppAlert }
}
</script>

<style></style>

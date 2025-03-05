import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '@/home/AppHome.vue'
import AppTest from '@/test/AppTest.vue'
import GameSession from '@/game/GameSession'
import GameNotFound from '@/game/not-found/GameNotFound'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: AppHome
    },
    {
        path: '/test',
        name: 'Test',
        component: AppTest
    },
    {
        path: '/game/:name',
        name: 'Game session',
        component: GameSession
    },
    {
        path: '/game/not-found',
        name: 'Game session not found',
        component: GameNotFound
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

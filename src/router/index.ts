import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'showpage',
        component: () => import('../pages/ShowPage.vue')
    },
    ]
})

export default router

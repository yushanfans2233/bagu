import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },{
        path: '/add',
        name:'addpage',
        component: () => import('../views/AddTemplate.vue')
    },
    {
        path: '/show',
        name: 'showpage',
        component: () => import('../views/ShowTemplate.vue')
    },
    ]
})

export default router

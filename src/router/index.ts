import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [{
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/practice/:id',
        name: 'Practice',
        component: () => import('../views/PracticeView.vue')
    },
    {
        path: '/practice/:id/records',
        name: 'PracticeRecords',
        component: () => import('../views/PracticeRecordsView.vue')
    }
    ]
})

export default router

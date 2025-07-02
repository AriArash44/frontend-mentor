import { createRouter, createWebHistory } from 'vue-router';
import CFView from "../views/CFView.vue";

const routes = [
    { path: '/', component: CFView },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
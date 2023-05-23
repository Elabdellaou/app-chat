import Home from "../views/Home.vue"
import Register from "../views/Auth/Register.vue"
import Login from "../views/Auth/Login.vue"
import RoomChat from "../views/RoomChat.vue"
import NotFound from "../views/NotFound.vue"
import Users from "../views/Users.vue"

export const routes = [
    {
        path: "/",
        redirect: to => {
            return { path: '/home' }
        },
    },
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
        meta: { requiresNotAuth: true },
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
        meta: { requiresNotAuth: true },
    },
    {
        path: "/users",
        name: "Users",
        component: Users,
        meta: { requiresAuth: true },
    },
    {
        path: "/room-chat/:id(\\d+)",
        name: "Room Chat",
        component: RoomChat,
        meta: { requiresAuth: true },
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound,
    },
];

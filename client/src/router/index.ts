import { createRouter, createWebHistory, RouteComponent } from "vue-router";

const routes = [
    {
        name: "homepage",
        path: "/",
        component: (): Promise<RouteComponent> => import("../views/HomePage.vue"),
    },
    {
        name: "login",
        path: "/users/login",
        component: (): Promise<RouteComponent> => import("../views/users/Login"),
    },
    {
        name: "signup",
        path: "/users/signup",
        component: (): Promise<RouteComponent> => import("../views/users/Signup"),
    },
    {
        name: "forgotPassword",
        path: "/users/forgot-password",
        component: (): Promise<RouteComponent> => import("../views/users/ForgotPassword"),
    },
    {
        name: "passwordReset",
        path: "/users/password-reset/:code",
        component: (): Promise<RouteComponent> => import("../views/users/PasswordReset"),
    },
    {
        name: "forgotUsername",
        path: "/users/forgot-username",
        component: (): Promise<RouteComponent> => import("../views/users/ForgotUsername"),
    },
    {
        name: "logout",
        path: "/users/logout",
        component: (): Promise<RouteComponent> => import("../views/users/Logout.vue"),
    },
    { path: "/:pathMatch(.*)", redirect: "/" },
];
const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
    const { VITE_DISCORD_OAUTH2_URL, VITE_PROJECT_TITLE } = import.meta.env;
    const userData = JSON.parse(localStorage.getItem("user_data") ?? "{}");

    document.title = VITE_PROJECT_TITLE;

    const authReq = [""];
    const authNotReq = ["homepage"];

    if (
        !userData?.access_token &&
        authReq.includes(to.name as string) &&
        !authNotReq.includes(to.name as string)
    )
        location.href = VITE_DISCORD_OAUTH2_URL;

    next();
});

export default router;

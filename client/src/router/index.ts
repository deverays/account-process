/**Vue */
import { createRouter, createWebHistory, RouteComponent } from "vue-router";

const routes = [
    {
        name: "homepage",
        path: "/",
        component: (): Promise<RouteComponent> => import("../views/HomePage.vue"),
    },
    /**Auth */
    {
        name: "login",
        path: "/auth/login",
        component: (): Promise<RouteComponent> => import("../views/auth/Login"),
    },
    {
        name: "signup",
        path: "/auth/signup",
        component: (): Promise<RouteComponent> => import("../views/auth/Signup"),
    },
    {
        name: "forgotPassword",
        path: "/auth/forgot-password",
        component: (): Promise<RouteComponent> =>
            import("../views/auth/ForgotPassword"),
    },
    {
        name: "passwordReset",
        path: "/auth/password-reset/:code",
        component: (): Promise<RouteComponent> =>
            import("../views/auth/PasswordReset"),
    },
    {
        name: "forgotUsername",
        path: "/auth/forgot-username",
        component: (): Promise<RouteComponent> =>
            import("../views/auth/ForgotUsername"),
    },
    {
        name: "logout",
        path: "/auth/logout",
        component: (): Promise<RouteComponent> =>
            import("../views/auth/Logout.vue"),
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
    ) {
        location.href = VITE_DISCORD_OAUTH2_URL;
    } else {
        next();
    }
});

export default router;

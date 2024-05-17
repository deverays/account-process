import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    routes: [],
    history: createWebHistory(),
});

router.addRoute({
    name: "homepage",
    path: "/",
    component: () => import("../views/HomePage.vue"),
});

router.addRoute({
    name: "auth",
    path: "/auth",
    children: [
        {
            name: "login",
            path: "login",
            component: () => import("../views/auth/Login"),
        },
        {
            name: "signup",
            path: "signup",
            component: () => import("../views/auth/Signup"),
        },
        {
            name: "forgotPassword",
            path: "forgot-password",
            component: () => import("../views/auth/ForgotPassword"),
        },
        {
            name: "passwordReset",
            path: "password-reset/:code",
            component: () => import("../views/auth/PasswordReset"),
        },
        {
            name: "forgotUsername",
            path: "forgot-username",
            component: () => import("../views/auth/ForgotUsername"),
        },
        {
            name: "logout",
            path: "logout",
            component: () => import("../views/auth/Logout.vue"),
        },
    ],
});

router.replace(router.currentRoute.value.fullPath);

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

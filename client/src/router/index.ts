import { createRouter, createWebHistory, RouteComponent } from "vue-router";

const routes = [
    {
        name: "homepage",
        path: "/",
        component: (): Promise<RouteComponent> => import("../views/HomePage"),
    },
    {
        name: "login",
        path: "/login",
        component: (): Promise<RouteComponent> => import("../views/Login"),
    },
    {
        name: "signup",
        path: "/signup",
        component: (): Promise<RouteComponent> => import("../views/Signup"),
    },
    {
        name: "forgotPassword",
        path: "/forgot-password",
        component: (): Promise<RouteComponent> => import("../views/ForgotPassword"),
    },
    {
        name: "passwordReset",
        path: "/password-reset/:code",
        component: (): Promise<RouteComponent> => import("../views/PasswordReset"),
    },
    {
        name: "forgotUsername",
        path: "/forgot-username",
        component: (): Promise<RouteComponent> => import("../views/ForgotUsername"),
    },
    {
        name: "recovery",
        path: "/recovery",
        component: (): Promise<RouteComponent> => import("../views/Recovery"),
    },
    {
        name: "logout",
        path: "/logout",
        component: (): Promise<RouteComponent> => import("../views/Logout"),
    },
    { path: "/:pathMatch(.*)", redirect: "/" },
];
const router = createRouter({
    routes,
    history: createWebHistory(),
});

router.beforeEach(async (to, from, next) => {
    console.log(from);
    const authReq = [""];
    const authNotReq = ["login", "signup"];
    const userData = JSON.parse(localStorage.user_data ?? "{}");
    if (
        (authNotReq.includes(to.name as string) && userData?.access_token) ||
        (authReq.includes(to.name as string) && !userData?.access_token)
    )
        return next("/");
    next();
});

export default router;

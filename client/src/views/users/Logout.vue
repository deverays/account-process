<template>
    <Loading />
</template>

<script setup lang="ts">
import imports from "../../utils/imports";
import { Loading } from "../../components/shared/Loader";

const { router, store } = imports();

store._isLogin = false;
store.getters._getUser = null;

const userData = JSON.parse(localStorage.getItem("user_data") ?? "{}");
delete userData.access_token;

localStorage.setItem("user_data", JSON.stringify(userData));

router.push({
    path: "/",
});
</script>

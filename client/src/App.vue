<template>
  <Progress :value="store._isProgress" />
  <Loading v-if="store._isLoading" />
  <RouterView v-else />
</template>

<script setup lang="ts">
import imports from "./utils/imports";
import { RouterView } from "vue-router";
import { Progress, Loading } from "./components/shared/Loader";

const { store } = imports();

store._isProgress = 20;

store.initUser().then(() => {
  store._isProgress = 100;
  store._isLoading = false;
});
</script>

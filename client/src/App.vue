<script setup lang="ts">
import imports from './utils/imports'
import { Preloader, ProgressBar } from './components/ui/loader'
import { onMounted } from 'vue'
const { store } = imports()

const localUserData = JSON.parse(localStorage.getItem('user_data') ?? '{}')

onMounted(() => {
  store._isLoading = true
  store._isWorked = 40

  if (!localUserData.access_token) {
    store._isLoading = false
    store._isWorked = 100
  } else {
    store.initUser().then(() => {
      store._isWorked = 100
      store._isLoading = false
    })
  }
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <ProgressBar :value="store._isWorked" />
    <Preloader v-if="store._isLoading" />
    <component v-else :is="Component" />
  </router-view>
</template>

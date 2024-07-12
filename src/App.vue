<template>
  <template>
    <div class="flex justify-center items-center px-16 mx-auto" style="height: 100vh; width: 100vw"
      v-show="bootstrapping">
      <ProgressBar mode="indeterminate" style="height: 6px" class="w-full" />
    </div>
  </template>
  <div v-show="!bootstrapping">
    <ToolBar />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'

import ProgressBar from 'primevue/progressbar'
import { onMounted, ref } from 'vue'
import { RouterView } from 'vue-router'

import { bootstrapper } from '@/core/bootstrap'

import ToolBar from './components/ToolBar.vue'

const bootstrapping = ref(true)

onMounted(async () => {
  await bootstrapper.run()

  bootstrapping.value = false
})
</script>

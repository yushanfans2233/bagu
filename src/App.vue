<template>
  <ToolBar />
  <RouterView />
</template>

<script setup lang="ts">
import 'primeicons/primeicons.css'

import { RouterView } from 'vue-router'

import ToolBar from './components/ToolBar.vue'
</script>

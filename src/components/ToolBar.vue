<template>
  <Menubar :model="items">
    <template #start>
      <div class="pl-16"></div>
    </template>
    <template #item="{ item }">
      <Button :icon="item.icon" :label="item.label" @click="item.action" />
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const items = ref([
  {
    icon: 'pi pi-home',
    action: () => {
      router.push('/')
    },
  }
])
</script>

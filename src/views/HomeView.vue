<template>
  <Menubar :model="items">
    <template #item="{ item, hasSubmenu, root }">
      <a class="flex items-center" @click="item.action">
        <span :class="item.icon" />
        <span class="ml-2">{{ item.label }}</span>
        <Badge v-if="item.badge" :class="{ 'ml-auto': !root, 'ml-2': root }" :value="item.badge" />
        <span v-if="item.shortcut"
          class="ml-auto border border-surface-200 dark:border-surface-500 rounded-md bg-surface-100 dark:bg-surface-800 text-xs p-1">{{
            item.shortcut }}</span>
        <i v-if="hasSubmenu"
          :class="['pi pi-angle-down text-primary', { 'pi-angle-down ml-2': root, 'pi-angle-right ml-auto': !root }]"></i>
      </a>
    </template>
  </Menubar>
  <main>
    <ShowPage />
  </main>

</template>

<script setup lang="ts">
import Badge from 'primevue/badge'
import Menubar from 'primevue/menubar'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import ShowPage from './ShowTemplate.vue'

const router = useRouter()
const items = ref([
  {
    label: '添加模板',
    icon: 'pi pi-file-plus',
    action: () => {
      router.push('/add')
    },
  },
])
</script>

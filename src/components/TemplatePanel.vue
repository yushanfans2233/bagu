<template>
  <Panel class="hover:cursor-pointer">
    <template #header>
      {{ template.title }}
    </template>
    <p class="m-0">
      {{ template.content }}
    </p>
    <template #icons>
      <button class="p-panel-header-icon p-link mr-2" @click="toggle">
        <span class="pi pi-cog"></span>
      </button>
      <Menu ref="menu" :model="items" popup />
    </template>
  </Panel>
</template>

<script setup lang="ts">
import Menu from 'primevue/menu'
import Panel from 'primevue/panel'
import { Template } from '@/stores/modules/template/types'
import { ref } from 'vue'


defineProps({
  template: Template
})

const menu = ref(null)

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}

const items = ref([
  {
    label: 'Refresh',
    icon: 'pi pi-refresh'
  },
  {
    label: 'Search',
    icon: 'pi pi-search'
  },
  {
    separator: true
  },
  {
    label: 'Delete',
    icon: 'pi pi-times'
  }
])
</script>

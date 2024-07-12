<template>
  <Card class="overflow-hidden" style="width: 360px; height: 320px;">
    <template #title>
      <span>{{ template.title }}</span>
    </template>
    <template #content>
      <p class="m-0 overflow-hidden h-48 gradient-fade">
        {{ template.content }}
      </p>
    </template>
    <template #footer>
      <div class="flex mt-1">
        <Button label="Practice" class="w-full mr-1" @click="practice" />
        <Button severity="secondary" icon="pi pi-bars" @click="toggle" aria-haspopup="true"
          aria-controls="overlay_menu" />
        <Menu ref="menu" id="overlay_menu" :model="items" popup />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Menu from 'primevue/menu'
import { ref } from 'vue'

import { Template } from '@/core/type/Template'

const props = defineProps({
  template: { type: Template, required: true }
})

const emit = defineEmits(['practice', 'delete', 'edit', 'view', 'records'])

function practice() {
  emit('practice', props.template)
}

const menu = ref()

const toggle = (event: MouseEvent) => {
  menu.value.toggle(event)
}

const items = ref([
  {
    label: 'History',
    icon: 'pi pi-history',
    command: () => emit('records', props.template)
  },
  {
    label: 'View',
    icon: 'pi pi-eye',
    command: () => emit('view', props.template)
  },
  {
    separator: true
  },
  {
    label: 'Edit',
    icon: 'pi pi-pen-to-square',
    command: () => emit('edit', props.template)
  },
  {
    separator: true
  },
  {
    label: 'Delete',
    icon: 'pi pi-times',
    command: () => emit('delete', props.template)
  }
])
</script>

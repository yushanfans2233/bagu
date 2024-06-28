<template>
  <Menubar :model="items">
    <template #item="{ item, props, hasSubmenu, root }">
      <a class="flex items-center" @click="item.action">
        <span :class="item.icon" />
        <span class="ml-2" @click="updateVisible">{{ item.label }}</span>
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
import Avatar from 'primevue/avatar';
import Badge from 'primevue/badge';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Menubar from 'primevue/menubar';
import { useExerciseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { Exercise } from '@/stores/modules/exercise/types'
import { nanoid } from 'nanoid'

import ShowPage from '../pages/ShowPage.vue'
import { ref } from 'vue'

const store = useExerciseStore()
var { exercises } = storeToRefs(store)



const items = ref([
  {
    label: '添加模板',
    icon: 'pi pi-file-plus',
    action: () => {
      store.addExercise(new Exercise(nanoid(), '新卡片', '新卡片内容'))
    }
  },
]);
</script>

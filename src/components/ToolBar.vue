<template>
  <Menubar :model="items">
    <template #start>
      <div class="pl-16"></div>
    </template>
    <template #item="{ item }">
      <Button :icon="item.icon" :label="item.label" @click="item.action" outlined />
    </template>
    <template #end>
      <div class="pr-16">
        <Button type="button" label="模板库" icon="pi pi-shop" :badge="templateLibraryNotificationBadgeValue"
          badgeSeverity="danger" outlined @click="openTemplateLibrary" />
      </div>
    </template>
  </Menubar>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Menubar from 'primevue/menubar'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import { NotificationBadgeKeys, notificationBadgeManager } from '@/core/storage/Notification'

const router = useRouter()
const items = ref([
  {
    icon: 'pi pi-home',
    action: () => {
      router.push('/')
    },
  }
])

const templateLibraryNotificationBadgeValue = ref<string | undefined>(undefined)

function openTemplateLibrary() {
  templateLibraryNotificationBadgeValue.value = undefined
  notificationBadgeManager.clear(NotificationBadgeKeys.TemplateLibrary)
  router.push({ name: 'TemplateLibrary' })
}

onMounted(async () => {
  const value = await notificationBadgeManager.get(NotificationBadgeKeys.TemplateLibrary) ?? undefined
  if (!value) {
    return
  }

  templateLibraryNotificationBadgeValue.value = String(value)
})
</script>

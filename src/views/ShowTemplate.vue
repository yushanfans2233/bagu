<template>
  <div>
    <Toast />
    <ConfirmDialog></ConfirmDialog>
    <ul>
      <li v-for="(item, index) in templates" :key="index">
        <TemplatePanel :template="item" @delete="onDeleteTemplate" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import ConfirmDialog from 'primevue/confirmdialog'
import Toast from 'primevue/toast'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'

import TemplatePanel from '@/components/TemplatePanel.vue'
import { useTemplateStore } from '@/stores'
import { Template } from '@/stores/modules/template/types'

const store = useTemplateStore()
var { templates } = storeToRefs(store)

const confirm = useConfirm()
const toast = useToast()

const onDeleteTemplate = (template: Template) => {
  confirm.require({
    message: 'Do you want to delete this record?',
    header: 'Danger Zone',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancel',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger'
    },
    accept: () => {
      store.deleteTemplate(template.id)

      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    }
  })
}


</script>

<style scoped>
ul {
  max-width: 800px;
  margin: 0 auto;
}

li {
  display: block;
  margin: 10px;
}
</style>

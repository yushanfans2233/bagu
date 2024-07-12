<template>
  <div class="flex justify-center">
    <div class="flex flex-wrap justify-start px-16" style="width: 100vw;">
      <div class="mt-8 ml-4">
        <Card style="width: 360px; height: 320px;">
          <template #content>
            <div style="width: 320px; height: 280px;" class="flex flex-col justify-center items-center"
              @click="onNewTemplate">
              <i class="pi pi-file-plus" style="font-size: 40px;color: var(--p-surface-400);"></i>
              <p class="mt-1">create a new template</p>
            </div>
          </template>
        </Card>
      </div>
      <div class="mt-8 ml-4" v-for="(item, index) in orderedTemplates" :key="index">
        <TemplateCard :template="item" @practice="onPracticeTemplate" @records="onViewTemplatePracticeRecords"
          @view="onViewTemplate" @edit="onEditTemplate" @delete="onDeleteTemplate" />
      </div>
    </div>
  </div>
  <ConfirmDialog />
  <TemplateEditorDialog v-model:visible="showTemplateEditorDialog" v-model:tempalte="selectedTemplate"
    :operation="operation" />
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Card from 'primevue/card'
import ConfirmDialog from 'primevue/confirmdialog'
import { useConfirm } from 'primevue/useconfirm'
import { useToast } from 'primevue/usetoast'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

import TemplateCard from '@/components/TemplateCard.vue'
import TemplateEditorDialog from '@/components/TemplateEditorDialog.vue'
import { Operation } from '@/core/type/Operation'
import { Template } from '@/core/type/Template'
import { useTemplateStore } from '@/stores/Template'

const router = useRouter()

const store = useTemplateStore()
const { templates } = storeToRefs(store)
const orderedTemplates = computed(() => templates.value.map(x => x).sort((a, b) => b.timeStamp - a.timeStamp))

const confirm = useConfirm()
const toast = useToast()

function onPracticeTemplate(template: Template) {
  router.push({ name: 'Practice', params: { id: template.id } })
}


const operation = ref<Operation>(Operation.view)

function onViewTemplatePracticeRecords(template: Template) {
  router.push({ name: 'PracticeRecords', params: { id: template.id } })
}

const showTemplateEditorDialog = ref(false)
const selectedTemplate = ref<Template | undefined>(undefined)

function onViewTemplate(template: Template) {
  operation.value = Operation.view
  showTemplateEditorDialog.value = true
  selectedTemplate.value = template
}

function onNewTemplate() {
  operation.value = Operation.create
  showTemplateEditorDialog.value = true
  selectedTemplate.value = undefined
}

function onEditTemplate(template: Template) {
  operation.value = Operation.edit
  showTemplateEditorDialog.value = true
  selectedTemplate.value = template
}

function onDeleteTemplate(template: Template) {
  confirm.require({
    message: 'Do you want to delete this template?',
    header: 'Are you sure?',
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
      store.remove(template.id)

      toast.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted', life: 3000 })
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
    }
  })
}
</script>

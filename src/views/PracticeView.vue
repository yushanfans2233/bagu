<template>
  <div class=" flex flex-col justify-center items-center px-20 mt-8 ">
    <div class="flex flex-col justify-center w-1/2">
      <span>{{ template?.title }}</span>
      <Textarea v-model="value" class="mt-1 h-96" :disabled="completed" />
      <Button class="mt-2 self-center" @click="complete" :disabled="completed">完成</Button>
    </div>
  </div>
  <div class="flex justify-center w-full h-96 px-20 mt-8">
    <div ref="diffEditorContainer" class="flex-1" style="border: 1px solid var(--p-surface-200);"></div>
  </div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import { usePracticeRecordStore } from '@/stores/PracticeRecord'
import { useTemplateStore } from '@/stores/Template'


const route = useRoute()
const templateId = route.params.id

const templateStore = useTemplateStore()
const { templates } = storeToRefs(templateStore)

const template = computed(() => templates.value.find((t) => t.id === templateId))

const originalText = computed(() => template.value?.content ?? '')

const value = ref('')

const diffEditorContainer = ref<HTMLElement>()

const completed = ref(false)

const practiceRecordStore = usePracticeRecordStore()

function complete() {
  if (!(diffEditorContainer.value)) {
    throw new Error('diffEditor is not defined')
  }

  if (!template.value) {
    throw new Error('template is not defined')

  }

  completed.value = true

  const diffEditor = monaco.editor.createDiffEditor(diffEditorContainer.value, {
    enableSplitViewResizing: false,
    readOnly: true,
    minimap: { enabled: false },
    wordWrap: 'on',
  })

  const originalModel = monaco.editor.createModel(originalText.value, 'text/plain')
  const modifiedModel = monaco.editor.createModel(value.value, 'text/plain')

  diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel,
  })

  practiceRecordStore.add(template.value, value.value)
}
</script>

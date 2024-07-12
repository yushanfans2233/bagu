<template>
  <div class="px-16 mt-8">
    <Splitter style="height: 80vh">
      <SplitterPanel class="flex justify-center" :size="20" :min-size="20">
        <Listbox striped v-model="selectedPracticeRecord" :options="currentTemplatePracticeRecords"
          optionLabel="template.title" class="w-full">
          <template #option="slotProps">
            <div class="flex justify-between w-full">
              <span>
                <i class="pi pi-check" style="color: var(--p-green-600)"
                  v-if="slotProps.option.originalContent === slotProps.option.actualContent"></i>
                <i class="pi pi-exclamation-circle" style="color: var(--p-yellow-600)" v-else></i>
                {{ slotProps.option.template.title }}
              </span>
              <span>{{ dateTimeFormatter.format(slotProps.option.timeStamp) }}</span>
            </div>
          </template>
        </Listbox>
      </SplitterPanel>
      <SplitterPanel class="flex items-center justify-center" :size="80" :min-size="80">
        <div ref="diffEditorContainer" class="flex-1 h-full"></div>
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api'
import { storeToRefs } from 'pinia'
import Listbox from 'primevue/listbox'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import type { PracticeRecord } from '@/core/type/PracticeRecord'
import { usePracticeRecordStore } from '@/stores/PracticeRecord'


const route = useRoute()
const templateId = route.params.id

const selectedPracticeRecord = ref<PracticeRecord | undefined>(undefined)

const practiceRecordStore = usePracticeRecordStore()
const { practiceRecords } = storeToRefs(practiceRecordStore)

const currentTemplatePracticeRecords = computed(() => practiceRecords.value.filter((record) => record.template.id === templateId))

const dateTimeFormatter = new Intl.DateTimeFormat()

const diffEditorContainer = ref<HTMLElement>()
onMounted(() => {
  if (!diffEditorContainer.value) {
    throw new Error('diffEditor is not defined')

  }

  const diffEditor = monaco.editor.createDiffEditor(diffEditorContainer.value, {
    enableSplitViewResizing: false,
    readOnly: true,
    minimap: { enabled: false },
    wordWrap: 'on',
  })

  const originalModel = monaco.editor.createModel('', 'text/plain')
  const modifiedModel = monaco.editor.createModel('', 'text/plain')

  diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel,
  })

  watch(
    selectedPracticeRecord,
    (newValue) => {
      originalModel.setValue(newValue?.originalContent ?? '')
      modifiedModel.setValue(newValue?.actualContent ?? '')
    }
  )

  watch(currentTemplatePracticeRecords, (newValue) => {
    if (selectedPracticeRecord.value) {
      return
    }

    if (newValue.length === 0) {
      return
    }

    selectedPracticeRecord.value = newValue[0]
  })
})
</script>

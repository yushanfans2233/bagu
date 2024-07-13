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
        <DiffPanel :left="left" :right="right" />
      </SplitterPanel>
    </Splitter>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Listbox from 'primevue/listbox'
import Splitter from 'primevue/splitter'
import SplitterPanel from 'primevue/splitterpanel'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import DiffPanel from '@/components/DiffPanel.vue'
import type { PracticeRecord } from '@/core/type/PracticeRecord'
import { usePracticeRecordStore } from '@/stores/PracticeRecord'

const route = useRoute()
const templateId = route.params.id

const selectedPracticeRecord = ref<PracticeRecord | undefined>(undefined)

const practiceRecordStore = usePracticeRecordStore()
const { practiceRecords } = storeToRefs(practiceRecordStore)

const currentTemplatePracticeRecords = computed(() => practiceRecords.value.filter((record) => record.template.id === templateId))

const dateTimeFormatter = new Intl.DateTimeFormat()

const left = computed(() => selectedPracticeRecord.value?.originalContent ?? '')
const right = computed(() => selectedPracticeRecord.value?.actualContent ?? '')

onMounted(() => {
  watch(
    currentTemplatePracticeRecords,
    (newValue) => {
      if (selectedPracticeRecord.value) {
        return
      }

      if (newValue.length === 0) {
        return
      }

      selectedPracticeRecord.value = newValue[0]
    },
    { once: true }
  )
})
</script>

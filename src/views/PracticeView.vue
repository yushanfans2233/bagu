<template>
  <div class=" flex flex-col justify-center items-center px-20 mt-8 ">
    <div class="flex flex-col justify-center w-1/2">
      <span>{{ template?.title }}</span>
      <Textarea v-model="userInputText" class="mt-1 h-96" :disabled="completed" />
      <Button class="mt-2 self-center" @click="complete" :disabled="completed">完成</Button>
    </div>
  </div>
  <div class="flex justify-center w-full h-96 px-20 mt-8" v-if="completed">
    <DiffPanel :left="originalText" :right="userInputText" />
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import Button from 'primevue/button'
import Textarea from 'primevue/textarea'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

import DiffPanel from '@/components/DiffPanel.vue'
import { usePracticeRecordStore } from '@/stores/PracticeRecord'
import { useTemplateStore } from '@/stores/Template'


const route = useRoute()
const templateId = route.params.id

const templateStore = useTemplateStore()
const { templates } = storeToRefs(templateStore)

const template = computed(() => templates.value.find((t) => t.id === templateId))

const originalText = computed(() => template.value?.content ?? '')

const userInputText = ref('')

const completed = ref(false)

const practiceRecordStore = usePracticeRecordStore()

function complete() {
  if (!template.value) {
    throw new Error('template is not defined')

  }

  completed.value = true

  practiceRecordStore.add(template.value, userInputText.value)
}
</script>

<template>
  <Toast position="top-center" />
  <div class="px-16 mt-8" v-for="(template, index) in templates" :key="index">
    <Card>
      <template #title>
        <div class="flex flex-row justify-between">
          <div class="flex items-center">
            <p>{{ template.title }}</p>
          </div>
          <Button label="添加" @click="add(template)"></Button>
        </div>
      </template>
      <template #content>
        <p class="m-0">
          {{ template.content }}
        </p>
        <div v-if="template.note && template.note !== ''" class="border-t mt-4">
          <Editor v-model="template.note" :readonly="true" :pt:toolbar:class="'hidden'">
            <template v-slot:toolbar>
              <div>
              </div>
            </template>
          </Editor>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import Card from 'primevue/card'
import Editor from 'primevue/editor'
import Toast from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import { ref } from 'vue'

import templateLibrary from '@/data/templateLibrary.json'
import { useTemplateStore } from '@/stores/Template'

interface Payload { title: string, content: string, note?: string }
const templates = ref<Payload[]>(templateLibrary)

const store = useTemplateStore()

const toast = useToast()

function add(payload: Payload) {
  store.add(payload.title, payload.content, payload.note)

  toast.add({ severity: 'info', summary: 'Info', detail: '添加成功，可点击左上角 Home 按钮回到首页查看', life: 3000 })
}

</script>

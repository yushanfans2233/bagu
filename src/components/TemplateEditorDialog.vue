<template>
  <Dialog modal maximizable v-model:visible="visible" :header="header">
    <div class="flex flex-col">
      <label for="title" class="font-semibold w-24 p-1">Title</label>
      <InputText id="title" class="flex-auto" autocomplete="off" v-model="title" :readonly="readonly" />
    </div>
    <div class="flex flex-col mt-4">
      <label for="context" class="font-semibold w-24 p-1">Context</label>
      <Textarea id="context" class="flex-auto" autocomplete="off" rows="10" cols="100" v-model="content"
        :readonly="readonly" />
    </div>
    <div class="flex flex-col mt-4">
      <label class="font-semibold w-24 p-1">Note</label>
      <div v-if="!readonly">
        <Editor v-model="note" editorStyle="height: 100px" :readonly="readonly">
          <template v-slot:toolbar>
            <span class="ql-formats">
              <select class="ql-header" defaultValue="0">
                <option value="1">Heading</option>
                <option value="2">Subheading</option>
                <option value="0">Normal</option>
              </select>
            </span>
            <span class="ql-formats">
              <button v-tooltip.bottom="'Bold'" class="ql-bold"></button>
              <button v-tooltip.bottom="'Italic'" class="ql-italic"></button>
              <button v-tooltip.bottom="'Underline'" class="ql-underline"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-list" value="ordered" type="button"></button>
              <button class="ql-list" value="bullet" type="button"></button>
              <select class="ql-align">
                <option defaultValue></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
              </select>
            </span>
            <span class="ql-formats">
              <button class="ql-link" type="button"></button>
            </span>
            <span class="ql-formats">
              <button class="ql-clean" type="button"></button>
            </span>

          </template>
        </Editor>
      </div>
      <div class="border-t" v-else>
        <Editor v-model="note" editorStyle="height: 220px" :readonly="readonly" :pt:toolbar:class="'hidden'">
          <template v-slot:toolbar>
            <div></div>
          </template>
        </Editor>
      </div>
    </div>
    <div class="flex justify-end gap-2 mt-4" v-if="!readonly">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="onSave"></Button>
    </div>
  </Dialog>
</template>


<script setup lang="ts">
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Editor from 'primevue/editor'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import { computed, ref, watch } from 'vue'

import { Operation } from '@/core/type/Operation'
import { Template } from '@/core/type/Template'
import { useTemplateStore } from '@/stores/Template'

const visible = defineModel('visible', { required: true })
const template = defineModel<Template | undefined>('tempalte')

const props = defineProps({
  operation: { type: Number, required: true }
})

const header = computed<string>(() => {
  switch (props.operation) {
    case Operation.edit:
      return 'Edit Template'
    case Operation.view:
      return 'View Template'
    case Operation.create:
      return 'New Template'
  }

  throw new Error('Invalid operation')
})

const readonly = computed<boolean>(() => props.operation === Operation.view)

const title = ref('')
const content = ref('')
const note = ref('')

function clear() {
  title.value = ''
  content.value = ''
  note.value = ''
}

watch(template, (newValue: Template | undefined) => {
  if (!newValue) {
    clear()
    return
  }

  title.value = newValue.title
  content.value = newValue.content
  note.value = newValue.note
})

const store = useTemplateStore()

function onSave() {
  if (props.operation === Operation.create) {
    store.add(title.value, content.value, note.value)
  } else if (props.operation === Operation.edit && template.value) {
    store.update(template.value.id, { title: title.value, content: content.value, note: note.value })
  }

  visible.value = false
  template.value = undefined
  clear()
}
</script>

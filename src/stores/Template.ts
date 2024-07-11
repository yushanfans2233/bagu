import localforage from 'localforage'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Template } from '@/types/Template'

const name = 'Template'

export const useTemplateStore = defineStore(name, () => {
  const storage = localforage.createInstance({ storeName: name })

  const templates = ref<Template[]>([])

  storage.iterate((template: Template) => {
    templates.value.push(new Template(template.id, template.title, template.content, template.note, template.timeStamp))
  })

  function add(title: string = '', content: string = '', note: string = '') {
    const templateId = nanoid()
    if (templates.value.find((x) => x.id === templateId)) {
      throw new Error('id conflict')
    }
    const template = new Template(templateId, title, content, note, Date.now())

    templates.value.push(template)
    storage.setItem(template.id, template)
  }

  function update(id: string, payload: { title?: string, content?: string, note?: string }) {
    const targetTempalte = templates.value.find((x) => x.id === id)

    if (!targetTempalte) {
      throw new Error('template not found')
    }

    if (payload.title) {
      targetTempalte.title = payload.title
    }

    if (payload.content) {
      targetTempalte.content = payload.content
    }

    if (payload.note) {
      targetTempalte.note = payload.note
    }

    templates.value = templates.value.map((x) => x.id === id ? targetTempalte : x)
    storage.setItem(id, new Template(targetTempalte.id, targetTempalte.title, targetTempalte.content, targetTempalte.note, targetTempalte.timeStamp))
  }

  function remove(id: string) {
    templates.value = templates.value.filter((x) => x.id !== id)
    storage.removeItem(id)
  }

  return { templates, add, update, remove }

})

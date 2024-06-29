import localforage from 'localforage'
import { nanoid } from 'nanoid'
import { defineStore } from 'pinia'
import { ref } from 'vue'

import { Template } from './types'

const name = 'templates'

export const useTemplateStore = defineStore(name, () => {
  const storage = localforage.createInstance({ storeName: name })

  const templates = ref<Template[]>([])

  storage.iterate((template: Template) => {
    templates.value.push(new Template(template.id, template.title, template.content))
  })

  function addTemplate(title: string, content: string) {
    const templateId = nanoid()
    if (templates.value.find((x) => x.id === templateId)) {
      throw new Error('id conflict')
    }
    const template = new Template(templateId, title, content)
    templates.value.push(template)
    storage.setItem(template.id, template)
  }

  function updateTemplate(template: Template) {
    templates.value = templates.value.map((x) => x.id === template.id ? template : x)
    storage.setItem(template.id, template)
  }

  function deleteTemplate(id: string) {
    templates.value = templates.value.filter((x) => x.id !== id)
    storage.removeItem(id)
  }

  return { templates: templates, addTemplate, updateTemplate, deleteTemplate }
})

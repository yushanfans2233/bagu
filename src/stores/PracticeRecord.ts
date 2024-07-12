import localforage from 'localforage'
import { nanoid } from 'nanoid'
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

import { PracticeRecord, PracticeRecordPO } from '@/core/type/PracticeRecord'
import { Template } from '@/core/type/Template'

import { useTemplateStore } from './Template'

const name = 'PracticeRecord'

export const usePracticeRecordStore = defineStore(name, () => {
  const templateStore = useTemplateStore()
  const { templates } = storeToRefs(templateStore)

  const storage = localforage.createInstance({ storeName: name })

  const practiceRecordPOList = ref<PracticeRecordPO[]>([])

  const practiceRecords = computed<PracticeRecord[]>(() =>
    practiceRecordPOList.value
      .map(po => {
        const template = templates.value.find(t => t.id === po.templateId)
        if (!template) {
          return undefined
        }

        return PracticeRecord.from(template, po)
      })
      .filter((x): x is PracticeRecord => !!x)
      .sort((a, b) => b.timeStamp - a.timeStamp)
  )

  storage.iterate((practiceRecordPO: PracticeRecordPO) => {
    practiceRecordPOList.value.push(new PracticeRecordPO(practiceRecordPO.id, practiceRecordPO.templateId, practiceRecordPO.originalContent, practiceRecordPO.actualContent, practiceRecordPO.timeStamp))
  })

  function add(template: Template, actualContent: string) {
    const id = nanoid()
    if (practiceRecordPOList.value.find((x) => x.id === id)) {
      throw new Error('id conflict')
    }

    const practiceRecordPO = new PracticeRecordPO(id, template.id, template.content, actualContent, Date.now())
    practiceRecordPOList.value.push(practiceRecordPO)
    storage.setItem(id, practiceRecordPO)
  }

  function deleteById(id: string) {
    const targetPracticeRecord = practiceRecordPOList.value.find((x) => x.id === id)
    if (!targetPracticeRecord) {
      throw new Error('practice record not found')
    }

    practiceRecordPOList.value = practiceRecordPOList.value.filter((x) => x.id !== id)
    storage.removeItem(id)
  }

  return { practiceRecordPOList, practiceRecords, add, deleteById }
})

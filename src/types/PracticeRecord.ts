import type { Template, TemplateId } from './Template'

export type PracticeRecordId = string

export class PracticeRecordPO {
  constructor(id: PracticeRecordId, templateId: TemplateId, originalContent: string, actualContent: string, timeStamp: number) {
    this.id = id
    this.templateId = templateId
    this.originalContent = originalContent
    this.actualContent = actualContent
    this.timeStamp = timeStamp
  }

  id: PracticeRecordId
  templateId: TemplateId
  originalContent: string
  actualContent: string
  timeStamp: number
}

export class PracticeRecord {
  private constructor(public template: Template, public id: PracticeRecordId, public originalContent: string, public actualContent: string, public timeStamp: number) {
  }

  static from(template: Template, practiceRecordPO: PracticeRecordPO) {
    return new PracticeRecord(template, practiceRecordPO.id, practiceRecordPO.originalContent, practiceRecordPO.actualContent, practiceRecordPO.timeStamp)
  }
}

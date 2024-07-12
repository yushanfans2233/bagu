export type TemplateId = string

export class Template {
  constructor(public id: TemplateId, public title: string = '', public content: string = '', public note: string = '', public timeStamp: number) { }
}

import { Version } from '@/core/type/Version'

import { SetTemplateLibraryBadgeToOne } from './SetTemplateLibraryBadgeToOne'

export const migrations: [Version, () => Promise<void>][] = [
  [new Version(0, 1, 1), SetTemplateLibraryBadgeToOne]
]


export { SetTemplateLibraryBadgeToOne } from './SetTemplateLibraryBadgeToOne'

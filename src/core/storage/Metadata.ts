import localforage from 'localforage'

import type { Version } from '../type/Version'

const storeName = 'Metadata'
const storage = localforage.createInstance({ storeName })


class VersionManager {
  static readonly key = 'version'

  localVersion: Version | undefined | null


  async getLocalVersion(): Promise<Version | undefined> {
    if (this.localVersion === null) {
      this.localVersion = await storage.getItem<Version>(VersionManager.key) ?? undefined
    }

    return this.localVersion
  }

  async setLocalVersion(version: Version) {
    this.localVersion = version

    await storage.setItem(VersionManager.key, this.localVersion)
  }
}

export const versionManager = new VersionManager()

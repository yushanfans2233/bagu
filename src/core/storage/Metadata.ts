import localforage from 'localforage'

import { Version } from '../type/Version'

const storeName = 'Metadata'
const storage = localforage.createInstance({ storeName })


class VersionManager {
  static readonly key = 'version'

  localVersion: Version | undefined | null = null


  async getLocalVersion(): Promise<Version | undefined> {
    if (this.localVersion === null) {
      const value = await storage.getItem<Version>(VersionManager.key)
      this.localVersion = value ? new Version(value.major, value.minor, value.patch, value.prerelease, value.meta) : undefined
    }

    return this.localVersion
  }

  async setLocalVersion(version: Version) {
    this.localVersion = version

    await storage.setItem(VersionManager.key, this.localVersion)
  }
}

export const versionManager = new VersionManager()

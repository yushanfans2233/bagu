import { version } from '../Metadata'
import { versionManager } from '../storage/Metadata'

export async function install() {
  const localVersion = await versionManager.getLocalVersion()

  if (localVersion) {
    return
  }

  await versionManager.setLocalVersion(version)
}

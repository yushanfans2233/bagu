import { version } from '../Metadata'
import { versionManager } from '../storage/Metadata'

export async function upgrade() {
  const localVersion = await versionManager.getLocalVersion()

  if (!localVersion) {
    throw new Error('Version not found')
  }

  if (localVersion.equals(version)) {
    return
  }
}

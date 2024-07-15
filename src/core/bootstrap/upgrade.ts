import { version } from '../Metadata'
import { versionManager } from '../storage/Metadata'
import { migrations } from './migrations'

export async function upgrade() {
  const localVersion = await versionManager.getLocalVersion()

  if (!localVersion) {
    throw new Error('Version not found')
  }

  if (localVersion.equals(version)) {
    return
  }

  for (const [targetVersion, run] of migrations) {
    if (localVersion.lessThan(targetVersion)) {
      await run()
      await versionManager.setLocalVersion(targetVersion)
    }
  }
}

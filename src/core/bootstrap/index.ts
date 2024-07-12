import { install } from './install'
import { upgrade } from './upgrade'

export const bootstrapper = {
  async run() {
    await install()
    await upgrade()
  }
}

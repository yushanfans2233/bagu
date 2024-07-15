import localforage from 'localforage'

const storeName = 'Notification'
const storage = localforage.createInstance({ storeName })

export const NotificationBadgeKeys = {
  TemplateLibrary: 'TemplateLibrary',
}

class NotificationBadgeManager {
  static readonly prefix = 'badge_'

  buildKey(key: string): string {
    return `${NotificationBadgeManager.prefix}${key}`
  }

  async get(key: string): Promise<number | undefined> {
    return await storage.getItem<number>(this.buildKey(key)) ?? undefined
  }

  async set(key: string, value: number) {
    return await storage.setItem(this.buildKey(key), value)
  }

  async clear(key: string) {
    return await storage.removeItem(this.buildKey(key))
  }
}

export const notificationBadgeManager = new NotificationBadgeManager()

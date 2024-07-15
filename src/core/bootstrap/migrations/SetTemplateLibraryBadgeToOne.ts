import { NotificationBadgeKeys, notificationBadgeManager } from '@/core/storage/Notification'

export async function SetTemplateLibraryBadgeToOne() {
  notificationBadgeManager.set(NotificationBadgeKeys.TemplateLibrary, 1)
}

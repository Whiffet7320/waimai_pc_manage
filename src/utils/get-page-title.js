import defaultSettings from '@/settings'
import i18n from '@/lang'

const title = defaultSettings.title || '后台管理系统'

export default function getPageTitle(key) {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    if (/^[\u4e00-\u9fa5]+$/.test(key)) {
      var pageName = key
    } else {
      var pageName = i18n.t(`route.${key}`)
    }
    //const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${title}`
  }
  return `${title}`
}

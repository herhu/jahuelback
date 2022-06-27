
import { notification } from 'antd'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const openNotificationWithIcon = (type: NotificationType, text: string) => {
    notification[type]({
      message: 'Ha ocurrido un Error',
      description: text
    })
  }
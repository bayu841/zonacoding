import { ref } from 'vue'

const isAlertOpen = ref(false)
const alertTitle = ref('')
const alertMessage = ref('')
const alertType = ref('success') // 'success' | 'error' | 'warning' | 'info' | 'confirm'
const onConfirmCallback = ref(null)

export function useAlert() {
  const showAlert = (title, message, type = 'success', onConfirm = null) => {
    alertTitle.value = title
    alertMessage.value = message
    alertType.value = type
    onConfirmCallback.value = onConfirm
    isAlertOpen.value = true
  }

  const closeAlert = () => {
    isAlertOpen.value = false
    onConfirmCallback.value = null
  }

  const confirmAlert = () => {
    if (onConfirmCallback.value) onConfirmCallback.value()
    closeAlert()
  }

  return {
    isAlertOpen,
    alertTitle,
    alertMessage,
    alertType,
    showAlert,
    closeAlert,
    confirmAlert
  }
}

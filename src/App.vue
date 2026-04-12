<script setup>
import BaseModal from './components/shared/BaseModal.vue'
import { useAlert } from './composables/useAlert'

const { isAlertOpen, alertTitle, alertMessage, alertType, closeAlert, confirmAlert } = useAlert()
</script>

<template>
  <router-view></router-view>
  
  <!-- Global Alert System using BaseModal -->
  <BaseModal
    :is-open="isAlertOpen"
    :title="alertTitle"
    :message="alertMessage"
    :type="alertType === 'confirm' ? 'info' : (alertType === 'error' ? 'danger' : alertType)"
    :confirm-text="alertType === 'confirm' ? 'Ya, Lanjutkan' : 'Mengerti'"
    :cancel-text="'Batalkan'"
    :show-cancel="alertType === 'confirm'"
    @close="closeAlert"
    @confirm="alertType === 'confirm' ? confirmAlert() : closeAlert()"
  />
</template>

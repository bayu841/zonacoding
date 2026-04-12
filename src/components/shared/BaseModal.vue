<script setup>
import { X } from 'lucide-vue-next'

defineProps({
  isOpen: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: 'Pemberitahuan'
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info' // 'info', 'success', 'warning', 'danger'
  },
  confirmText: {
    type: String,
    default: 'Tutup'
  },
  cancelText: {
    type: String,
    default: 'Batal'
  },
  showCancel: {
    type: Boolean,
    default: false
  },
  size: {
    type: String,
    default: 'md' // 'md', 'xl', '3xl', '5xl'
  }
})

defineEmits(['close', 'confirm'])
</script>

<template>
  <transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="$emit('close')"></div>

      <!-- Modal Content -->
      <transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 scale-95 translate-y-4"
        enter-to-class="opacity-100 scale-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 scale-100 translate-y-0"
        leave-to-class="opacity-0 scale-95 translate-y-4"
      >
        <div 
          class="relative bg-white rounded-2xl shadow-xl w-full mx-4 overflow-hidden border border-gray-100 flex flex-col items-center text-center transition-all duration-300 max-h-[90vh] overflow-y-auto"
          :class="{
            'max-w-md p-6': size === 'md',
            'max-w-xl p-8': size === 'xl',
            'max-w-3xl p-8': size === '3xl',
            'max-w-5xl p-8': size === '5xl',
          }"
        >
          <!-- Icon Banner -->
          <div
            class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
            :class="{
              'bg-blue-100 text-blue-600': type === 'info',
              'bg-emerald-100 text-emerald-600': type === 'success',
              'bg-amber-100 text-amber-600': type === 'warning',
              'bg-red-100 text-red-600': type === 'danger',
            }"
          >
            <!-- Add custom icons or just use general styling -->
            <svg v-if="type === 'success'" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="type === 'warning' || type === 'danger'" class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <svg v-else class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>

          <h3 class="text-xl font-bold text-gray-900 mb-2">{{ title }}</h3>
          
          <slot>
            <p v-if="message" class="text-gray-500 mb-8">{{ message }}</p>

            <div class="flex space-x-3 w-full">
              <button
                v-if="showCancel"
                @click="$emit('close')"
                class="flex-1 py-3 px-4 bg-gray-50 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 border border-gray-200 transition-colors"
              >
                {{ cancelText }}
              </button>
              <button
                v-if="confirmText"
                @click="$emit('confirm')"
                class="flex-1 py-3 px-4 font-semibold rounded-xl text-white transition-colors shadow-sm"
                :class="{
                  'bg-blue-600 hover:bg-blue-700': type === 'info',
                  'bg-emerald-600 hover:bg-emerald-700': type === 'success',
                  'bg-amber-600 hover:bg-amber-700': type === 'warning',
                  'bg-red-600 hover:bg-red-700': type === 'danger',
                }"
              >
                {{ confirmText }}
              </button>
            </div>
          </slot>
        </div>
      </transition>
    </div>
  </transition>
</template>

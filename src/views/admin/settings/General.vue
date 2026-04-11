<script setup>
import { ref } from 'vue'

const form = ref({
   platformName: 'NextSkill',
   shortDescription: 'Platform E-Learning terbaik dan terlengkap untuk Upgrade Skill kamu.',
   logo: null,
   favicon: null,
   contactEmail: 'support@nextskill.com',
   contactPhone: '+62 812-3456-7890'
})

const submitSettings = () => {
    console.log('Menyimpan pengaturan:', form.value)
    alert('Pengaturan berhasil disimpan!')
}
</script>

<template>
  <div class="max-w-4xl mx-auto space-y-6 bg-white p-8 rounded-lg shadow border border-gray-200">
    <div class="border-b border-gray-200 pb-5 mb-5 mt-2">
      <h2 class="text-2xl font-bold leading-6 text-gray-900">Pengaturan Umum Platform</h2>
      <p class="mt-2 text-sm text-gray-500">Konfigurasi info dasar dan aset utama dari frontend platform NextSkill.</p>
    </div>
    
    <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        <div class="sm:col-span-4">
           <label class="block text-sm font-medium text-gray-700">Nama Platform</label>
           <div class="mt-1 flex shadow-sm">
              <input v-model="form.platformName" type="text" class="flex-1 min-w-0 block w-full px-3 py-2 rounded-md sm:text-sm border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900" />
           </div>
        </div>

        <div class="sm:col-span-6">
           <label class="block text-sm font-medium text-gray-700">Deskripsi Singkat</label>
           <div class="mt-1">
              <textarea v-model="form.shortDescription" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md p-3 text-gray-900"></textarea>
           </div>
           <p class="mt-2 text-sm text-gray-500">Muncul di meta tag dan footer situs.</p>
        </div>

        <!-- File Upload placeholders -->
        <div class="sm:col-span-3">
           <label class="block text-sm font-medium text-gray-700">Logo Platform</label>
           <div class="mt-1 flex items-center">
              <span class="h-12 w-24 rounded-md overflow-hidden bg-gray-100 border border-gray-300 flex items-center justify-center text-sm text-gray-500 font-bold tracking-widest uppercase">
                  LOGO
              </span>
              <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Ubah File
              </button>
           </div>
        </div>

        <div class="sm:col-span-3">
           <label class="block text-sm font-medium text-gray-700">Favicon</label>
           <div class="mt-1 flex items-center">
              <span class="h-10 w-10 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center text-xs text-gray-500 border border-gray-300">
                  ICO
              </span>
              <button type="button" class="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Ubah File
              </button>
           </div>
        </div>

        <div class="sm:col-span-3">
           <label class="block text-sm font-medium text-gray-700">Email Kontak</label>
           <input v-model="form.contactEmail" type="email" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 text-gray-900 border" />
        </div>

        <div class="sm:col-span-3">
           <label class="block text-sm font-medium text-gray-700">Telepon / WhatsApp</label>
           <input v-model="form.contactPhone" type="text" class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 text-gray-900 border" />
        </div>
    </div>

    <div class="pt-5 border-t border-gray-200 mt-8 flex justify-end">
        <button @click="submitSettings" type="button" class="ml-3 inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            Simpan Pengaturan
        </button>
    </div>
  </div>
</template>

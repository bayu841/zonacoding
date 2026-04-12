<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  LayoutDashboard,
  Compass,
  BookOpen,
  Award,
  Trophy,
  Settings,
  Menu,
  LogOut,
  X
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

// State 
const isSidebarOpen = ref(true)
const isMobileDrawerOpen = ref(false)

const navigationGroups = [
  {
    title: 'Utama',
    items: [
      { name: 'Dashboard', to: '/student', icon: LayoutDashboard, exact: true },
      { name: 'Papan Peringkat', to: '/student/leaderboard', icon: Trophy }
    ]
  },
  {
    title: 'Pembelajaran',
    items: [
      { name: 'Eksplorasi Kursus', to: '/student/explore', icon: Compass },
      { name: 'Kursus Saya', to: '/student/courses', icon: BookOpen }
    ]
  },
  {
    title: 'Pencapaian & Akun',
    items: [
      { name: 'Sertifikat', to: '/student/certificates', icon: Award },
      { name: 'Pengaturan', to: '/student/settings', icon: Settings }
    ]
  }
]

const showDropdown = ref(false)

const toggleMobileDrawer = () => {
  isMobileDrawerOpen.value = !isMobileDrawerOpen.value
}

const closeMobileDrawer = () => {
  isMobileDrawerOpen.value = false
}

const toggleDropdown = () => {
  showDropdown.value = !showDropdown.value
}

const handleLogout = () => {
  showDropdown.value = false
  closeMobileDrawer()
  router.push('/')
}

const isActiveRoute = (item) => {
  if (item.exact) {
    return route.path === item.to
  }
  return route.path.startsWith(item.to)
}
</script>

<template>
  <div class="min-h-screen bg-gray-50/50 flex">
    <!-- Overlay untuk mobile drawer -->
    <div
      v-if="isMobileDrawerOpen"
      class="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 md:hidden"
      @click="closeMobileDrawer"
    ></div>

    <!-- Sidebar / Drawer -->
    <aside
      class="bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out h-screen top-0 fixed md:sticky z-[100] md:z-auto shadow-2xl md:shadow-none"
      :class="[
        isMobileDrawerOpen ? 'translate-x-0' : '-translate-x-full',
        'md:translate-x-0',
        isSidebarOpen ? 'md:w-64' : 'md:w-20',
        'w-64'
      ]"
    >
      <!-- Header Sidebar -->
      <div class="h-16 flex items-center justify-between px-5 border-b border-gray-200/60">
        <h1
          class="font-extrabold text-xl bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent transition-all"
          :class="{ 'md:hidden': !isSidebarOpen }"
        >
          NextSkill
        </h1>
        <h1 class="font-extrabold text-xl bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent hidden" :class="{ 'md:block': !isSidebarOpen }">
          NS
        </h1>

        <!-- Tombol close di mobile -->
        <button
          @click="closeMobileDrawer"
          class="p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all md:hidden"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <nav class="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
        <div v-for="(group, gIdx) in navigationGroups" :key="gIdx" class="mb-6 last:mb-0">
          <h3 class="px-4 text-[11px] font-extrabold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-2" :class="{ 'md:hidden': !isSidebarOpen }">
            {{ group.title }}
          </h3>
          <div class="h-4 w-full flex items-center justify-center mb-3 hidden" :class="{ 'md:flex': !isSidebarOpen }">
            <div class="w-1 h-1 rounded-full bg-gray-300"></div>
          </div>
          
          <ul class="space-y-1.5">
            <li v-for="item in group.items" :key="item.name">
              <router-link
                :to="item.to"
                :title="!isSidebarOpen ? item.name : ''"
                @click="closeMobileDrawer"
                class="flex items-center px-4 py-2.5 rounded-xl text-gray-600 hover:bg-indigo-50/80 hover:text-indigo-600 transition-all duration-200 group"
                :class="[
                  { 'md:justify-center': !isSidebarOpen },
                  isActiveRoute(item)
                    ? 'bg-indigo-50 text-indigo-700 font-medium shadow-[0_2px_8px_rgba(79,70,229,0.08)]'
                    : ''
                ]"
              >
                <component :is="item.icon" class="w-5 h-5 flex-shrink-0 transition-transform group-hover:scale-105" />
                <span class="ml-3 whitespace-nowrap text-[15px]" :class="{ 'md:hidden': !isSidebarOpen }">
                  {{ item.name }}
                </span>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>

      <!-- Footer sidebar opsional -->
      <div class="p-3 border-t border-gray-200/60"></div>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0">
      <!-- Header -->
      <header
        class="h-16 bg-white/80 backdrop-blur-sm border-b border-gray-200/60 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30"
      >
        <div class="flex items-center">
          <!-- Tombol untuk mobile drawer -->
          <button
            class="p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all mr-1 md:hidden"
            @click="toggleMobileDrawer"
          >
            <Menu class="w-5 h-5" />
          </button>

          <!-- Tombol collapse/expand untuk desktop -->
          <button
            class="p-2 rounded-xl text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all hidden md:block"
            @click="isSidebarOpen = !isSidebarOpen"
          >
            <Menu class="w-5 h-5" />
          </button>

          <!-- Page title / breadcrumb -->
          <div class="ml-3 sm:ml-5 font-medium text-gray-700 text-[15px] flex items-center gap-2">
            <span class="inline-block w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            Area Siswa
          </div>
        </div>

        <!-- Avatar dengan Dropdown -->
        <div class="relative">
          <button
            @click="toggleDropdown"
            class="flex items-center gap-2 focus:outline-none group"
          >
            <div
              class="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-white flex items-center justify-center font-bold text-sm shadow-[0_2px_8px_rgba(79,70,229,0.3)] ring-2 ring-white/80 group-hover:ring-indigo-200 transition-all"
            >
              U
            </div>
            <div class="hidden sm:block text-left ml-1">
              <p class="text-sm font-semibold text-gray-700 leading-tight">Student User</p>
              <p class="text-xs text-indigo-600 font-medium">Level 12</p>
            </div>
          </button>

          <!-- Dropdown Menu -->
          <transition
            enter-active-class="transition ease-out duration-150"
            enter-from-class="transform opacity-0 scale-95 -translate-y-1"
            enter-to-class="transform opacity-100 scale-100 translate-y-0"
            leave-active-class="transition ease-in duration-100"
            leave-from-class="transform opacity-100 scale-100 translate-y-0"
            leave-to-class="transform opacity-0 scale-95 -translate-y-1"
          >
            <div
              v-if="showDropdown"
              class="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_-5px_rgba(0,0,0,0.05)] border border-gray-200/60 py-1 z-50"
            >
              <button
                @click="handleLogout"
                class="w-full flex items-center px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors rounded-lg mx-1"
              >
                <LogOut class="w-4 h-4 mr-3" />
                Logout
              </button>
            </div>
          </transition>
        </div>
      </header>

      <!-- Main Section -->
      <main class="flex-1 p-6 overflow-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>

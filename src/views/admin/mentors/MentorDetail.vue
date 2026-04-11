<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Calendar, 
  Star, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Award
} from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const mentorId = route.params.mentorId

const mentor = ref({
  id: mentorId,
  name: 'Andi Setiawan',
  email: 'andi@example.com',
  phone: '+62 812-3456-7890',
  joinDate: '2025-06-15',
  status: 'Verified',
  bio: 'Mentor berpengalaman dengan expertise lebih dari 8 tahun di Frontend Development. Spesialisasi dalam Vue.js ecosystem dan Performance Optimization.',
  rating: 4.8,
  totalStudents: 250,
  courses: [
    { id: 1, title: 'Mastering Vue 3: Architecture & Patterns', students: 120, rating: 4.8, status: 'Published' },
    { id: 2, title: 'React Fundamentals for Enterprise', students: 89, rating: 4.7, status: 'Published' },
    { id: 3, title: 'TypeScript Basics for JS Developers', students: 41, rating: 4.6, status: 'Draft' }
  ]
})
</script>

<template>
  <div class="space-y-8 animate-in fade-in duration-700">
    <!-- Header with Back Button -->
    <div class="flex items-center justify-between">
      <button 
        @click="router.push('/admin/mentors')" 
        class="group flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-indigo-600 transition-all"
      >
        <div class="p-2 rounded-xl bg-white border border-gray-100 shadow-sm group-hover:border-indigo-100 group-hover:bg-indigo-50 transition-all">
          <ArrowLeft class="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        </div>
        Kembali ke Daftar
      </button>
      
      <div class="flex items-center gap-3">
        <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-xs font-bold border border-emerald-100 shadow-sm">
          <ShieldCheck class="w-4 h-4" />
          {{ mentor.status }}
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Left Column: Profile Card -->
      <div class="lg:col-span-1 space-y-6">
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
          <div class="px-6 pb-6 text-center">
            <div class="relative -mt-12 mb-4 flex justify-center">
              <div class="w-24 h-24 rounded-3xl bg-white p-1.5 shadow-xl">
                 <div class="w-full h-full rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-3xl border border-indigo-100">
                    {{ mentor.name.charAt(0) }}
                 </div>
              </div>
              <div class="absolute bottom-1 right-1/2 translate-x-12 translate-y-1 bg-emerald-500 text-white p-1 rounded-full border-4 border-white shadow-lg">
                <CheckCircle2 class="w-4 h-4" />
              </div>
            </div>
            <h3 class="text-2xl font-extrabold text-gray-900 tracking-tight">{{ mentor.name }}</h3>
            <p class="text-sm font-medium text-gray-400 mt-1">Senior Frontend Engineer</p>
            
            <div class="mt-6 p-4 bg-gray-50/80 rounded-2xl border border-gray-100 text-sm text-gray-600 italic leading-relaxed">
              "{{ mentor.bio }}"
            </div>

            <div class="mt-8 space-y-4 text-left">
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <div class="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-sm">
                   <Mail class="w-4 h-4" />
                </div>
                {{ mentor.email }}
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <div class="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-sm">
                   <Phone class="w-4 h-4" />
                </div>
                {{ mentor.phone }}
              </div>
              <div class="flex items-center gap-3 text-sm text-gray-600">
                <div class="w-9 h-9 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-sm">
                   <Calendar class="w-4 h-4" />
                </div>
                Bergabung {{ mentor.joinDate }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Column: Stats & Courses -->
      <div class="lg:col-span-2 space-y-8">
        <!-- Stats Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-indigo-100 transition-all">
            <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-600 shadow-sm group-hover:scale-110 transition-transform">
              <Star class="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Rating</div>
              <div class="text-xl font-extrabold text-gray-900">{{ mentor.rating }} / 5.0</div>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-indigo-100 transition-all">
            <div class="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm group-hover:scale-110 transition-transform">
              <Users class="w-6 h-6" />
            </div>
            <div>
              <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Siswa</div>
              <div class="text-xl font-extrabold text-gray-900">{{ mentor.totalStudents }}</div>
            </div>
          </div>

          <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4 group hover:border-indigo-100 transition-all">
            <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 shadow-sm group-hover:scale-110 transition-transform">
              <BookOpen class="w-6 h-6" />
            </div>
            <div>
              <div class="text-xs font-bold text-gray-400 uppercase tracking-widest">Kursus</div>
              <div class="text-xl font-extrabold text-gray-900">{{ mentor.courses.length }}</div>
            </div>
          </div>
        </div>

        <!-- Course List Card -->
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/30">
            <h3 class="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Award class="w-5 h-5 text-indigo-500" />
              Kontribusi Kursus
            </h3>
            <button class="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors uppercase tracking-widest">
              Lihat Semua
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-100">
              <thead class="bg-gray-50/50">
                <tr>
                  <th scope="col" class="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Judul Kursus</th>
                  <th scope="col" class="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Metrik</th>
                  <th scope="col" class="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wider">Status</th>
                  <th scope="col" class="px-8 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-50 bg-white">
                <tr v-for="course in mentor.courses" :key="course.id" class="hover:bg-indigo-50/20 transition-colors duration-200 group">
                  <td class="px-8 py-5 whitespace-nowrap">
                    <div class="text-sm font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">{{ course.title }}</div>
                  </td>
                  <td class="px-8 py-5 whitespace-nowrap">
                    <div class="flex items-center gap-4">
                      <div class="flex items-center gap-1 text-xs font-medium text-gray-500">
                        <Users class="w-3.5 h-3.5 text-gray-400" />
                        {{ course.students }}
                      </div>
                      <div class="flex items-center gap-1 text-xs font-medium text-amber-600">
                        <Star class="w-3.5 h-3.5 fill-amber-500" />
                        {{ course.rating }}
                      </div>
                    </div>
                  </td>
                  <td class="px-8 py-5 whitespace-nowrap">
                    <span :class="[
                      'inline-flex items-center px-2 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider',
                      course.status === 'Published' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-gray-50 text-gray-500 border-gray-100'
                    ]">
                      {{ course.status }}
                    </span>
                  </td>
                  <td class="px-8 py-5 whitespace-nowrap text-right">
                    <button class="p-2 text-gray-400 hover:text-indigo-600 bg-gray-50 rounded-xl transition-all group-hover:bg-white shadow-sm">
                      <ExternalLink class="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

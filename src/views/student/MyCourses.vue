<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import MyCourseCard from "../../components/student/MyCourseCard.vue";
import { getMyCourses } from "@/api/course";

const router = useRouter();
const myCourses = ref([]);
const loading = ref(false);

const fetchMyCourses = async () => {
  loading.value = true;
  try {
    const response = await getMyCourses();
    const coursesData = response.data?.courses || [];

    // Map response ke struktur card
    myCourses.value = coursesData.map((course) => ({
      id: course.id,
      course_id: course.course_id,
      title: course.course_title,
      mentor: course.mentor_name,
      category: course.category_name,
      progress: course.progress_percentage || 0,
      status: course.status === "active" ? "ongoing" : course.status,
      cover:
        course.thumbnail ||
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600&h=400",
      enrolled_at: course.enrolled_at,
      is_completed: course.is_completed,
      has_certificate: course.has_certificate,
      // Untuk progress materi, gunakan progress_percentage sebagai guide
      completedLessons: Math.ceil((course.progress_percentage || 0) / 5), // Asumsi default 20 lessons
      totalLessons: 20,
      color: ["indigo", "pink", "emerald", "blue", "amber"][
        Math.floor(Math.random() * 5)
      ],
    }));
  } catch (err) {
    console.error("Failed to fetch my courses:", err);
    myCourses.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchMyCourses();
});

const enterLearningRoom = (course) => {
  // Get last viewed lesson from localStorage
  const lastLessonKey = `last_lesson_${course.course_id}`;
  const lastLessonId = localStorage.getItem(lastLessonKey);
  
  // Navigate to learning room with optional last lesson ID
  let url = "/student/courses/" + course.course_id + "/learn";
  if (lastLessonId) {
    url += `?lessonId=${lastLessonId}`;
  }
  router.push(url);
};
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Kursus Saya</h2>
        <p class="text-gray-500 text-sm mt-1">
          Lanjutkan progres belajarmu dan pantau kursus yang telah diselesaikan.
        </p>
      </div>
      <div>
        <router-link
          to="/student/explore"
          class="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
        >
          Cari Kursus Baru
        </router-link>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="space-y-6">
      <div>
        <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-2 h-6 bg-amber-400 rounded-full inline-block"></span>
          Sedang Berlangsung
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="i in 3"
            :key="i"
            class="bg-gray-100 animate-pulse rounded-2xl h-[320px]"
          ></div>
        </div>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else-if="myCourses.length === 0" class="text-center py-12">
      <p class="text-gray-500 mb-4">Belum ada kursus yang diambil</p>
      <router-link
        to="/student/explore"
        class="inline-flex items-center px-5 py-2.5 bg-indigo-600 text-white text-sm font-bold rounded-xl hover:bg-indigo-700 transition-colors"
      >
        Jelajahi Kursus
      </router-link>
    </div>

    <!-- Grouped Ongoing vs Completed -->
    <template v-else>
      <!-- Ongoing Courses -->
      <div>
        <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-2 h-6 bg-amber-400 rounded-full inline-block"></span>
          Sedang Berlangsung
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MyCourseCard
            v-for="course in myCourses.filter((c) => c.status === 'ongoing')"
            :key="course.id"
            :course="course"
            @click="enterLearningRoom(course)"
          />
        </div>
      </div>

      <!-- Completed Courses -->
      <div class="pt-8">
        <h3 class="font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="w-2 h-6 bg-emerald-400 rounded-full inline-block"></span>
          Telah Diselesaikan
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <MyCourseCard
            v-for="course in myCourses.filter((c) => c.status === 'completed')"
            :key="'completed-' + course.id"
            :course="course"
            @click="enterLearningRoom(course)"
          />
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import {
  ArrowLeft,
  PlayCircle,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Maximize,
  Volume2,
  X,
  Send,
  UploadCloud,
  ExternalLink,
  Award,
  Lock,
  Unlock,
  AlertTriangle,
  Calendar,
  ChevronRight,
  HelpCircle,
  ClipboardList,
} from "lucide-vue-next";
import BaseModal from "../../components/shared/BaseModal.vue";
import { useAlert } from "../../composables/useAlert";
import {
  getTasks,
  getQuizDetail,
  markLessonComplete,
  updateLessonProgress,
  getCourseLessonsWithProgress,
} from "@/api/course";

// Modular Components
import VideoLesson from "../../components/student/learning/VideoLesson.vue";
import TextLesson from "../../components/student/learning/TextLesson.vue";
import ProjectSubmission from "../../components/student/learning/ProjectSubmission.vue";
import SyllabusSidebar from "../../components/student/learning/SyllabusSidebar.vue";
import DiscussionDrawer from "../../components/student/learning/DiscussionDrawer.vue";
import QuizLesson from "../../components/student/learning/QuizLesson.vue";
import FileLesson from "../../components/student/learning/FileLesson.vue";

const { showAlert } = useAlert();
const router = useRouter();
const route = useRoute();

// Data State
const courseId = ref(route.params.courseId);
const lessons = ref([]);
const tasks = ref([]);
const quizzes = ref([]);
const loading = ref(false);
const quizLoading = ref(false);
const currentLessonId = ref(null);

// Fetch lessons and tasks
const fetchCourseContent = async () => {
  loading.value = true;
  try {
    // Fetch all lessons, quizzes, and progress in single API call
    const contentResponse = await getCourseLessonsWithProgress(courseId.value);
    const {
      lessons: lessonsData,
      embeddedQuizzes,
      unrelatedQuizzes,
      courseProgress: courseProgressPercentage,
      completedLessons,
    } = contentResponse.data;

    // Fetch tasks separately
    const tasksResponse = await getTasks(courseId.value);
    const tasksData = tasksResponse.data?.tasks || [];

    // Combine all quizzes
    const allQuizzes = [...embeddedQuizzes, ...unrelatedQuizzes];

    console.log("Lessons:", lessonsData);
    console.log("Tasks:", tasksData);
    console.log("All Quizzes (embedded + unrelated):", allQuizzes);
    console.log("Completed Lessons:", completedLessons);
    console.log("Course Progress:", courseProgressPercentage + "%");

    // Transform data ke struktur container
    lessons.value = lessonsData;
    tasks.value = tasksData;
    quizzes.value = allQuizzes;
    finishedLessons.value = completedLessons;
    courseProgress.value = courseProgressPercentage;

    // Set current lesson
    // Priority: route query param > localStorage > first lesson
    const queryLessonId = route.query.lessonId;
    if (queryLessonId) {
      currentLessonId.value = queryLessonId;
      console.log("Set to query lesson:", queryLessonId);
    } else if (lessonsData.length > 0) {
      currentLessonId.value = lessonsData[0].id;
      console.log("Set to first lesson:", lessonsData[0].id);
    }
  } catch (err) {
    console.error("Failed to fetch course content:", err);
    showAlert("error", "Gagal memuat konten kursus");
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchCourseContent();
});

// 1. Progress State
const finishedLessons = ref([]);
const courseProgress = ref(0);

// 2. Assignment State
const assignmentLink = ref("");
const isSubmitted = ref(false);
const assignmentScore = ref(null);
const assignmentStatus = ref("Unsubmitted"); // 'Unsubmitted', 'Pending', 'Graded'

// Today is 11 April 2026. Let's set deadline to 13 April 2026
const deadline = new Date("2026-04-13T23:59:59");
const timeRemaining = ref("");

const updateCountdown = () => {
  const now = new Date();
  const diff = deadline - now;
  if (diff <= 0) {
    timeRemaining.value = "WAKTU HABIS";
    return;
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  timeRemaining.value = `${days}h ${hours}j tersisa`;
};
updateCountdown();
setInterval(updateCountdown, 60000);

// Computed syllabus dari lessons API
const syllabus = computed(() => {
  if (lessons.value.length === 0) return [];

  // Map lessons
  const lessonItems = lessons.value.map((lesson) => {
    // Determine type based on content
    let type = "text";
    if (lesson.vidio_url) {
      type = "video";
    } else if (lesson.file_path) {
      type = "file";
    }

    return {
      id: lesson.id,
      title: lesson.title,
      type: type,
      duration: lesson.duration_in_minutes
        ? `${lesson.duration_in_minutes}m`
        : "",
      readTime: lesson.file_path ? "File tersedia" : "",
      isCompleted: false,
      // Store full API data untuk diakses di lesson components
      lessonData: {
        ...lesson,
        // Map vidio_url to videoUrl untuk component
        videoUrl: lesson.vidio_url,
        content: lesson.content,
        fileUrl: lesson.file_path,
      },
    };
  });

  // Map tasks
  const taskItems = tasks.value.map((task) => ({
    id: task.id,
    title: task.title,
    type: "task",
    readTime: `Tenggat: ${new Date(task.due_date).toLocaleDateString("id-ID")}`,
    isCompleted:
      task.submission_status === "submitted" ||
      task.submission_status === "graded",
    taskData: task,
  }));

  // Map quizzes (especially those at lesson level or course level)
  const quizItems = quizzes.value.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    type: "quiz",
    readTime: `${quiz.time_limit} menit`,
    isCompleted: false,
    quizData: quiz,
  }));

  // Combine lessons, tasks, dan quizzes
  const allItems = [...lessonItems, ...quizItems, ...taskItems];

  // Organize menjadi 1 module
  return [
    {
      id: "m1",
      title: "Materi Pembelajaran",
      isOpen: true,
      lessons: allItems,
    },
  ];
});

const currentLesson = computed(() => {
  for (const mod of syllabus.value) {
    for (const lesson of mod.lessons) {
      if (lesson.id === currentLessonId.value) return lesson;
    }
  }
  return null;
});

const checkLessonLocked = (lessonId) => {
  const flatLessons = syllabus.value.flatMap((m) => m.lessons);
  const idx = flatLessons.findIndex((l) => l.id === lessonId);
  if (idx <= 0) return false;
  return !finishedLessons.value.includes(flatLessons[idx - 1].id);
};

const selectLesson = async (id) => {
  if (checkLessonLocked(id)) {
    showAlert(
      "Akses Terkunci",
      "Selesaikan materi sebelumnya terlebih dahulu untuk membuka bagian ini.",
      "warning",
    );
    return;
  }

  // Find the lesson to check if it's a quiz
  let selectedItem = null;
  for (const mod of syllabus.value) {
    const found = mod.lessons.find((l) => l.id === id);
    if (found) {
      selectedItem = found;
      break;
    }
  }

  // If it's a quiz, fetch detail quiz first (only if questions not already embedded)
  if (selectedItem && selectedItem.type === "quiz") {
    // Check if quiz already has questions embedded
    if (!selectedItem.quizData?.questions || selectedItem.quizData.questions.length === 0) {
      try {
        quizLoading.value = true;
        console.log("Fetching quiz detail for ID:", id);
        
        const quizDetailResponse = await getQuizDetail(id);
        const quizDetail = quizDetailResponse.data || quizDetailResponse;
        
        // Transform questions to match component expectations
        const transformedQuestions = (quizDetail.questions || quizDetail.data?.questions || []).map((q, idx) => {
          // Extract text options from option objects
          const textOptions = q.options?.map((opt) => {
            if (typeof opt === 'string') return opt;
            if (opt.option_text) return opt.option_text;
            return String(opt);
          }) || [];

          return {
            ...q,
            // Transform options array to strings
            options: textOptions,
            // Map correct answer - use correct_answer_id or generate from backend if available
            correctIndex: q.correct_answer !== undefined 
              ? q.correct_answer 
              : (q.correct_answer_id ? q.options?.findIndex(o => o.id === q.correct_answer_id) : 0),
            // Ensure text field exists (quiz API uses 'question', component expects 'text')
            text: q.text || q.question || q.question_text || "",
            // Type defaults to multiple-choice
            type: q.type?.toLowerCase() === 'matching' ? 'matching' : 'multiple-choice',
          };
        });
        
        console.log("Quiz detail fetched and transformed:", transformedQuestions);

        // Find and update the quiz in quizzes.value array directly
        const quizIndex = quizzes.value.findIndex((q) => q.id === id);
        if (quizIndex !== -1) {
          quizzes.value[quizIndex] = {
            ...quizzes.value[quizIndex],
            ...quizDetail,
            // Store questions for QuizLesson component
            questions: transformedQuestions,
          };
          console.log("Quiz updated with transformed questions:", quizzes.value[quizIndex].questions.length);
        }
      } catch (err) {
        console.error("Failed to fetch quiz detail:", err);
        showAlert("error", "Gagal memuat detail ujian");
        return;
      } finally {
        quizLoading.value = false;
      }
    } else {
      console.log("Quiz already has questions, skipping detail fetch");
    }
  }

  currentLessonId.value = id;
  
  // Save to localStorage untuk resume next time
  localStorage.setItem(`last_lesson_${courseId.value}`, id);
  console.log("Saved last lesson:", id);
};

const markAsComplete = async () => {
  try {
    // Call API to mark lesson as complete
    await markLessonComplete(currentLessonId.value);

    // Get progress from lesson object (no API call needed, embedded in lesson)
    const currentLesson = lessons.value.find(
      (l) => l.id === currentLessonId.value
    );
    if (currentLesson) {
      updateLessonProgress(currentLesson);
    }

    // Update local state
    if (!finishedLessons.value.includes(currentLessonId.value)) {
      finishedLessons.value.push(currentLessonId.value);
    }

    const flatLessons = syllabus.value.flatMap((m) => m.lessons);
    const idx = flatLessons.findIndex((l) => l.id === currentLessonId.value);
    if (idx < flatLessons.length - 1) {
      currentLessonId.value = flatLessons[idx + 1].id;
      // Save to localStorage
      localStorage.setItem(`last_lesson_${courseId.value}`, currentLessonId.value);
    }

    showAlert("success", "Materi berhasil diselesaikan!");
  } catch (err) {
    console.error("Failed to mark lesson complete:", err);
    showAlert("error", "Gagal menandai materi sebagai selesai");
  }
};

const toggleModule = (modId) => {
  const mod = syllabus.value.find((m) => m.id === modId);
  if (mod) mod.isOpen = !mod.isOpen;
};

const isDiscussionOpen = ref(false);
const newComment = ref("");

const discussions = ref([
  {
    id: 1,
    author: "Budi Santoso",
    isMentor: true,
    text: "Halo semuanya! Ada yang kesulitan mengatur environment variable di Next.js?",
    time: "1 jam lalu",
    avatar: "B",
  },
  {
    id: 2,
    author: "Andi Saputra",
    isMentor: false,
    text: "Iya kak, kadang process.env.NEXT_PUBLIC undefined saat di client-side.",
    time: "45 menit lalu",
    avatar: "A",
  },
]);

const postComment = () => {
  if (!newComment.value.trim()) return;
  discussions.value.push({
    id: Date.now(),
    author: authStore.user?.name || "Student User",
    isMentor: false,
    text: newComment.value,
    time: "Baru saja",
    avatar: authStore.user?.name?.charAt(0).toUpperCase() || "S",
  });
  newComment.value = "";
};

const submitAssignment = () => {
  if (!assignmentLink.value.trim()) return;
  isSubmitted.value = true;
  assignmentStatus.value = "Pending";

  // Simulate grading after 3 seconds for demonstration
  setTimeout(() => {
    assignmentStatus.value = "Graded";
    assignmentScore.value = 92;
  }, 4000);
};

const goBack = () => {
  router.push("/student/courses");
};

// Dummy Article Content (shown when type === 'text')
const articleContent = `
  <p class="mb-4 text-gray-700 leading-relaxed">
    Dalam pelajaran ini, kita akan membahas ekosistem styling modern. Berbeda dengan pendekatan klasik, penggunaan framework utility-first seperti Tailwind CSS atau pre-processor seperti SASS membuat arsitektur UI kita menjadi jauh lebih konsisten.
  </p>
  <img src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?auto=format&fit=crop&q=80&w=1200&h=600" alt="Code Screenshot" class="w-full rounded-2xl shadow-md my-6" />
  <h3 class="text-xl font-bold text-gray-900 mb-3 mt-8">Mengapa Utility-First?</h3>
  <p class="mb-4 text-gray-700 leading-relaxed">
    Utility-first paradigm memungkinkan developer untuk tetap berada dalam dokumen HTML (markup) tanpa perlu terus menerus melakukan context-switching ke file CSS. Meskipun pada pandangan pertama terlihat seperti inline-styles, utility class menyimpan sistem desain terpusat (design tokens).
  </p>
  <div class="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-xl my-6">
    <p class="text-indigo-800 font-medium"><strong>Catatan Mentor:</strong> Pastikan Anda telah menginstal ekstensi Intellisense di VSCode Anda agar pengalaman menggunakan utility classes ini lebih mulus.</p>
  </div>
`;
</script>

<template>
  <div class="h-[calc(100vh-64px)] flex flex-col md:flex-row -m-6">
    <!-- Negative margin to break out of Layout standard padding -->

    <!-- Left Panel : Main Content Area (70%) -->
    <div class="flex-1 flex flex-col h-full bg-gray-50 overflow-y-auto">
      <!-- Top Action Bar -->
      <div
        class="bg-white px-6 py-4 border-b border-gray-200 flex items-center justify-between sticky top-0 z-20"
      >
        <button
          @click="goBack"
          class="flex items-center text-sm font-bold text-gray-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft class="w-4 h-4 mr-2" />
          Kembali ke Kursus
        </button>
        <div class="flex items-center gap-3">
          <button
            @click="isDiscussionOpen = true"
            class="flex items-center text-sm font-bold text-gray-500 hover:text-gray-900 transition-colors"
          >
            <MessageSquare class="w-4 h-4 mr-1.5" /> Diskusi
          </button>
        </div>
      </div>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto p-4 md:p-8">
        <div
          class="max-w-4xl mx-auto bg-white rounded-3xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden"
        >
          <VideoLesson
            v-if="currentLesson?.type === 'video'"
            :lesson="currentLesson"
          />

          <TextLesson
            v-else-if="currentLesson?.type === 'text'"
            :lesson="currentLesson"
            :content="currentLesson?.lessonData?.content || articleContent"
          />

          <ProjectSubmission
            v-else-if="currentLesson?.type === 'project'"
            :lesson="currentLesson"
            v-model:assignmentLink="assignmentLink"
            :assignment-status="assignmentStatus"
            :assignment-score="assignmentScore"
            :time-remaining="timeRemaining"
            @submit="submitAssignment"
            @view-certificates="router.push('/student/certificates')"
          />

          <!-- Quiz Loading State -->
          <div
            v-if="currentLesson?.type === 'quiz' && quizLoading"
            class="bg-white min-h-[600px] rounded-3xl flex items-center justify-center"
          >
            <div class="text-center">
              <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p class="text-gray-600 font-medium">Memuat soal ujian...</p>
            </div>
          </div>

          <QuizLesson
            v-else-if="currentLesson?.type === 'quiz' && !quizLoading"
            :lesson="currentLesson"
            @complete="markAsComplete"
          />

          <FileLesson
            v-else-if="currentLesson?.type === 'file'"
            :lesson="currentLesson"
          />

          <!-- Task Submission -->
          <div v-else-if="currentLesson?.type === 'task'" class="p-6 md:p-10">
            <div class="flex items-center gap-2 mb-4">
              <span
                class="bg-purple-100 text-purple-700 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider"
                >Tugas</span
              >
              <span class="text-sm text-gray-500"
                >Tenggat:
                {{
                  new Date(
                    currentLesson?.taskData?.due_date,
                  ).toLocaleDateString("id-ID")
                }}</span
              >
            </div>

            <h1
              class="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight"
            >
              {{ currentLesson?.title }}
            </h1>
            <p class="text-gray-600 leading-relaxed mb-6">
              {{ currentLesson?.taskData?.description }}
            </p>

            <!-- Submission Status -->
            <div
              :class="[
                'p-6 rounded-2xl border-2 mb-6',
                currentLesson?.taskData?.submission_status === 'submitted' ||
                currentLesson?.taskData?.submission_status === 'graded'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-amber-50 border-amber-200',
              ]"
            >
              <div class="flex items-start gap-3">
                <CheckCircle2
                  v-if="currentLesson?.taskData?.submission_status === 'graded'"
                  class="w-6 h-6 text-emerald-600 flex-shrink-0 mt-1"
                />
                <AlertTriangle
                  v-else
                  class="w-6 h-6 text-amber-600 flex-shrink-0 mt-1"
                />
                <div>
                  <p
                    :class="[
                      'font-bold mb-1',
                      currentLesson?.taskData?.submission_status ===
                        'submitted' ||
                      currentLesson?.taskData?.submission_status === 'graded'
                        ? 'text-emerald-900'
                        : 'text-amber-900',
                    ]"
                  >
                    {{
                      currentLesson?.taskData?.submission_status === "graded"
                        ? `Nilai: ${currentLesson?.taskData?.score}`
                        : currentLesson?.taskData?.submission_status ===
                            "submitted"
                          ? "Tugas sudah dikumpulkan"
                          : "Tugas belum dikumpulkan"
                    }}
                  </p>
                  <p
                    :class="[
                      currentLesson?.taskData?.submission_status === 'graded'
                        ? 'text-emerald-700'
                        : 'text-amber-700',
                    ]"
                  >
                    Status: {{ currentLesson?.taskData?.submission_status }}
                  </p>
                </div>
              </div>
            </div>

            <button
              class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors"
            >
              Buat Submission
            </button>
          </div>
          <!-- Disabled for API-driven lessons. Will enable when quiz endpoints integrated -->
          <!-- <div 
            v-if="currentLesson?.type !== 'quiz' && syllabus[0]?.lessons[2]?.id === 'q1' && !syllabus[0]?.lessons[2]?.isCompleted"
            class="p-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <div class="flex items-center gap-4">
              <div class="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <HelpCircle class="w-6 h-6" />
              </div>
              <div>
                <p class="text-xs font-bold text-indigo-100 uppercase tracking-widest">Selanjutnya</p>
                <h4 class="text-lg font-black uppercase tracking-tight">Kuis: Basic Web Development</h4>
              </div>
            </div>
            <button 
              @click="selectLesson('q1')"
              class="px-5 py-2.5 bg-white text-indigo-600 font-black rounded-xl hover:bg-indigo-50 transition-all flex items-center gap-2 shadow-lg"
            >
              Mulai Kuis
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
          -->
        </div>

        <!-- Navigation Buttons -->
        <div class="max-w-4xl mx-auto mt-8 flex items-center justify-between">
          <button
            class="px-6 py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
          >
            Materi Sebelumnya
          </button>
          <button
            @click="markAsComplete"
            class="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200"
          >
            Selesai & Lanjut
          </button>
        </div>
      </div>
    </div>

    <!-- Right Panel : Syllabus Sidebar -->
    <SyllabusSidebar
      :syllabus="syllabus"
      :current-lesson-id="currentLessonId"
      :finished-lessons="finishedLessons"
      :check-lesson-locked="checkLessonLocked"
      @select-lesson="selectLesson"
      @toggle-module="toggleModule"
    />

    <!-- Forum Diskusi Drawer -->
    <DiscussionDrawer
      :is-open="isDiscussionOpen"
      :current-lesson="currentLesson"
      :discussions="discussions"
      v-model:new-comment="newComment"
      @close="isDiscussionOpen = false"
      @post="postComment"
    />

    <!-- Overlay Desktop/Mobile -->
    <transition
      enter-active-class="ease-in-out duration-500"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="ease-in-out duration-500"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isDiscussionOpen"
        @click="isDiscussionOpen = false"
        class="fixed inset-0 bg-black/20 backdrop-blur-[2px] transition-opacity z-40"
      ></div>
    </transition>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #e5e7eb;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #d1d5db;
}
</style>

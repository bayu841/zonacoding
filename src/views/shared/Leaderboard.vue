<script setup>
import { ref } from "vue";
import { Trophy } from "lucide-vue-next";
import LeaderboardTable from "../../components/shared/LeaderboardTable.vue";

// DUMMY LEADERBOARD DATA
const topStudents = ref([
  {
    id: 1,
    rank: 1,
    name: "Budi Santoso",
    points: 15400,
    courses: ["React 18", "Tailwind CSS"],
  },
  {
    id: 2,
    rank: 2,
    name: "Andi Suryono",
    points: 12550,
    courses: ["Python Dasar", "Data Science"],
  },
  {
    id: 3,
    rank: 3,
    name: "Siti Rahma",
    points: 11200,
    courses: ["UI/UX Design", "Figma"],
  },
  {
    id: 4,
    rank: 4,
    name: "Kevin Anggara",
    points: 9800,
    courses: ["Node.js API"],
  },
  {
    id: 5,
    rank: 5,
    name: "Dewi Lestari",
    points: 8650,
    courses: ["Vue 3 Composition"],
  },
  {
    id: 6,
    rank: 6,
    name: "Raditya Dika",
    points: 7400,
    courses: ["Public Speaking", "Copywriting"],
  },
  {
    id: 7,
    rank: 7,
    name: "Arief Muhammad",
    points: 6200,
    courses: ["Digital Marketing"],
  },
]);
</script>

<template>
  <div class="space-y-6 max-w-5xl mx-auto pb-10">
    <!-- Header Page -->
    <div
      class="flex items-start justify-between bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 relative overflow-hidden shadow-lg"
    >
      <div class="relative z-10 text-white">
        <h1
          class="text-3xl font-extrabold mb-2 tracking-tight flex items-center gap-3"
        >
          <Trophy class="w-8 h-8 text-amber-300" />
          Papan Peringkat
        </h1>
        <p class="text-blue-100 max-w-xl">
          Pantau siswa dengan perolehan poin (XP) tertinggi di platform
          ZonaCoding. Medali emas menanti mereka yang pantang menyerah!
        </p>
      </div>
      <!-- Background decoration -->
      <div
        class="absolute right-0 top-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"
      ></div>
      <div
        class="absolute left-1/2 bottom-0 w-48 h-48 bg-amber-400 opacity-10 rounded-full blur-2xl translate-y-1/2"
      ></div>
    </div>

    <!-- Leaderboard Table Section -->
    <div
      class="bg-white rounded-2xl border border-gray-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] overflow-hidden"
    >
      <!-- Feature Header inside card -->
      <div
        class="px-6 py-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center"
      >
        <h2 class="font-bold text-gray-800">Top Learner Bulan Ini</h2>
        <span
          class="text-xs font-bold text-gray-500 uppercase tracking-wider bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm"
        >
          April 2026
        </span>
      </div>

      <LeaderboardTable :students="topStudents" />
    </div>
  </div>
</template>

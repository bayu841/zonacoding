<template>
  <footer class="bg-gray-800 text-gray-300 font-poppins">
    <div
      class="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8"
    >
      <!-- Logo & Deskripsi -->
      <div>
        <h2 class="text-white text-xl font-bold mb-4">ZonaCoding</h2>
        <p class="text-sm text-gray-400">
          Platform pembelajaran online untuk membantu kamu belajar coding dengan
          mudah, cepat, dan menyenangkan.
        </p>
      </div>

      <!-- Menu -->
      <div>
        <h3 class="text-white font-semibold mb-4">Menu</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2">
            <!-- Home Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M3 10L12 3l9 7v10a1 1 0 0 1-1 1h-6v-6H10v6H4a1 1 0 0 1-1-1z"
              />
            </svg>
            <RouterLink to="/" class="hover:text-white transition"
              >Beranda</RouterLink
            >
          </li>

          <li class="flex items-center gap-2">
            <!-- Book Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
              <path d="M20 22V2H6.5A2.5 2.5 0 0 0 4 4.5v15z" />
            </svg>
            <RouterLink to="/class" class="hover:text-white transition"
              >Kelas</RouterLink
            >
          </li>

          <li class="flex items-center gap-2">
            <!-- Info Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <RouterLink to="/news" class="hover:text-white transition"
              >Berita</RouterLink
            >
          </li>

          <li class="flex items-center gap-2">
            <!-- Contact Icon -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-4 h-4"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              viewBox="0 0 24 24"
            >
              <path
                d="M21 15a4 4 0 0 1-4 4H7l-4 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"
              />
            </svg>
            <RouterLink to="/faq" class="hover:text-white transition"
              >FAQ</RouterLink
            >
          </li>
        </ul>
      </div>

      <!-- Fitur -->
      <div>
        <h3 class="text-white font-semibold mb-4">Fitur</h3>
        <ul class="space-y-3 text-sm">
          <li class="flex items-center gap-2">
            ✔ <span>Belajar Interaktif</span>
          </li>
          <li class="flex items-center gap-2">
            ✔ <span>Materi Terstruktur</span>
          </li>
          <li class="flex items-center gap-2">
            ✔ <span>Progress Tracking</span>
          </li>
          <li class="flex items-center gap-2">✔ <span>Sertifikat</span></li>
        </ul>
      </div>

      <!-- Sosial Media -->
      <div>
        <h3 class="text-white font-semibold mb-4">Follow Us</h3>
        <div class="flex space-x-4">
          <!-- Facebook -->
          <a href="#" class="hover:text-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M22 12a10 10 0 1 0-11.5 9.9v-7h-3v-3h3v-2.3c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3h-2.9v7A10 10 0 0 0 22 12z"
              />
            </svg>
          </a>

          <!-- Instagram -->
          <a href="#" class="hover:text-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm6.5-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z"
              />
            </svg>
          </a>

          <!-- LinkedIn -->
          <a href="#" class="hover:text-white transition">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M6.94 6.5a1.94 1.94 0 1 1 0-3.88 1.94 1.94 0 0 1 0 3.88zM4.5 8h5v12h-5zM14.5 8h4.7v1.7h.1c.7-1.3 2.4-2.7 4.9-2.7 5.2 0 6.2 3.4 6.2 7.8V20h-5v-6.2c0-1.5 0-3.3-2-3.3s-2.3 1.6-2.3 3.2V20h-5z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Bottom -->
    <div
      class="border-t border-gray-700 text-center py-4 text-sm text-gray-400"
    >
      © 2026 ZonaCoding. All rights reserved.
    </div>
  </footer>
</template>

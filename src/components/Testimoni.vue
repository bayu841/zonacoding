<template>
  <section class="py-16 bg-[url('/src/assets/images/testimoni.webp')] bg-cover bg-center p-5 md:p-20 mt-5">
    
    <div class="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
      
      <!-- TEXT (KIRI) -->
      <div class="text-center md:text-left">
        <p class="text-blue-500 font-medium mb-2">Testimoni</p>
        
        <h2 class="text-3xl md:text-4xl font-semibold text-gray-800 mb-4 font-poppins">
          Apa Kata Pengguna <br>
          <span class="text-blue-500">NextSkill?</span>
        </h2>

        <p class="text-gray-600 mb-6">
          Banyak pengguna telah merasakan kemudahan belajar coding bersama kami. Berikut pengalaman mereka.
        </p>
      </div>

      <!-- TESTIMONI CARD -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        <!-- Card 1 -->
        <div class="bg-white/80 backdrop-blur p-5 rounded-xl shadow hover:shadow-lg transition">
          <div class="flex items-center gap-3 mb-3">
            <img src="https://i.pravatar.cc/40?img=1" class="w-10 h-10 rounded-full" />
            <div>
              <p class="font-semibold text-sm">Andi</p>
              <p class="text-xs text-gray-500">Mahasiswa</p>
            </div>
          </div>
          <p class="text-sm text-gray-600">
            Belajar di NextSkill jadi lebih mudah dipahami. Materinya jelas dan step by step!
          </p>
          <div class="text-yellow-400 mt-2">⭐⭐⭐⭐⭐</div>
        </div>

        <!-- Card 2 -->
        <div class="bg-white/80 backdrop-blur p-5 rounded-xl shadow hover:shadow-lg transition">
          <div class="flex items-center gap-3 mb-3">
            <img src="https://i.pravatar.cc/40?img=2" class="w-10 h-10 rounded-full" />
            <div>
              <p class="font-semibold text-sm">Siti</p>
              <p class="text-xs text-gray-500">Pelajar</p>
            </div>
          </div>
          <p class="text-sm text-gray-600">
            Platformnya interaktif dan nggak membosankan. Cocok banget buat pemula.
          </p>
          <div class="text-yellow-400 mt-2">⭐⭐⭐⭐⭐</div>
        </div>

        <!-- Card 3 -->
        <div class="bg-white/80 backdrop-blur p-5 rounded-xl shadow hover:shadow-lg transition sm:col-span-2">
          <div class="flex items-center gap-3 mb-3">
            <img src="https://i.pravatar.cc/40?img=3" class="w-10 h-10 rounded-full" />
            <div>       
              <p class="font-semibold text-sm">Rizky</p>
              <p class="text-xs text-gray-500">Freelancer</p>
            </div>
          </div>
          <p class="text-sm text-gray-600">
            Sangat membantu meningkatkan skill coding saya. Sekarang lebih percaya diri ambil project!
          </p>
          <div class="text-yellow-400 mt-2">⭐⭐⭐⭐⭐</div>
        </div>

      </div>

    </div>

  </section>
</template>
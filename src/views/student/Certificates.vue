<script setup>
import { ref, onMounted } from "vue";
import { Award } from "lucide-vue-next";
import { useAlert } from "../../composables/useAlert";
import { getMyCertificates } from "@/api/course";
import CertificateCard from "../../components/student/CertificateCard.vue";
import CertificateViewer from "../../components/student/CertificateViewer.vue";

const { showAlert } = useAlert();
const certificates = ref([]);
const loading = ref(false);
const isDownloadModalOpen = ref(false);
const selectedCert = ref(null);

const fetchCertificates = async () => {
  loading.value = true;
  try {
    const response = await getMyCertificates();
    // Response structure: { status, message, code, data: { certificates: [...] } }
    const rawCertificates = response.data?.certificates || [];

    // Map API fields to component structure
    certificates.value = rawCertificates.map(cert => ({
      id: cert.id,
      title: cert.course_title,
      issueDate: cert.issued_at_formatted,
      credentialID: cert.certificate_number,
      studentName: cert.student_name,
      mentorName: cert.mentor_name,
      categoryName: cert.category_name,
      pdfLink: cert.pdf_url || '#'
    }));

    console.log("Certificates fetched:", certificates.value);
  } catch (err) {
    console.error("Failed to fetch certificates:", err);
    showAlert("error", "Gagal memuat sertifikat");
  } finally {
    loading.value = false;
  }
};

const openViewer = (cert) => {
  selectedCert.value = cert;
  isDownloadModalOpen.value = true;
};

onMounted(() => {
  fetchCertificates();
});
</script>

<template>
  <div class="space-y-6 max-w-7xl mx-auto pb-10">
    <!-- Header -->
    <div
      class="flex flex-col md:flex-row md:items-center justify-between gap-4"
    >
      <div>
        <h2 class="text-2xl font-bold text-gray-900">Sertifikat Saya</h2>
        <p class="text-gray-500 text-sm mt-1">
          Kelola dan unduh sertifikat kelulusan dari kursus yang telah Anda
          selesaikan.
        </p>
      </div>
    </div>

    <!-- Certificate Grid -->
    <div
      v-if="loading"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <div
        v-for="i in 3"
        :key="i"
        class="bg-white rounded-2xl border border-gray-100 h-64 animate-pulse shadow-sm"
      ></div>
    </div>

    <div
      v-else-if="certificates.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      <CertificateCard
        v-for="cert in certificates"
        :key="cert.id"
        :cert="cert"
        @view="openViewer"
      />
    </div>

    <!-- Empty State -->
    <div
      v-else
      class="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm"
    >
      <div
        class="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-gray-100"
      >
        <Award class="w-8 h-8 text-gray-400" />
      </div>
      <h3 class="text-lg font-bold text-gray-900 mb-1">Belum Ada Sertifikat</h3>
      <p class="text-gray-500 max-w-sm mx-auto">
        Selesaikan setidaknya satu kursus hingga 100% untuk mendapatkan
        sertifikat kelulusan pertama Anda.
      </p>
    </div>

    <!-- Immersive Visual Viewer Modal -->
    <CertificateViewer
      :is-open="isDownloadModalOpen"
      :cert="selectedCert"
      @close="isDownloadModalOpen = false"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import {
  CreditCard,
  Smartphone,
  Wallet,
  Building,
  ChevronRight,
  ArrowLeft,
  X,
  CheckCircle2,
  Lock,
  Loader2,
} from "lucide-vue-next";

const props = defineProps({
  isOpen: { type: Boolean, default: false },
  amount: { type: String, required: true },
  orderId: { type: String, default: "ORDER-10293" },
});

const emit = defineEmits(["close", "success"]);

const step = ref("methods"); // methods, processing, success
const selectedMethod = ref(null);

const methods = [
  {
    id: "va",
    name: "Virtual Account",
    icon: Building,
    desc: "BCA, Mandiri, BNI, BRI, dll.",
  },
  {
    id: "qris",
    name: "QRIS",
    icon: Smartphone,
    desc: "GoPay, OVO, Dana, LinkAja, BCA Mobile",
  },
  { id: "ewallet", name: "E-Wallet", icon: Wallet, desc: "GoPay, ShopeePay" },
  {
    id: "card",
    name: "Credit/Debit Card",
    icon: CreditCard,
    desc: "Visa, Mastercard, JCB",
  },
];

const close = () => {
  if (step.value === "processing") return; // Cannot close while processing
  emit("close");
  // Reset after transition
  setTimeout(() => {
    step.value = "methods";
    selectedMethod.value = null;
  }, 300);
};

const selectMethod = (method) => {
  selectedMethod.value = method;

  // Directly simulate processing for now instead of complex sub-menus
  processPayment();
};

const processPayment = () => {
  step.value = "processing";

  // Simulate API handshake latency 2.5s
  setTimeout(() => {
    step.value = "success";

    // Auto emit success and close after 2s
    setTimeout(() => {
      emit("success");
    }, 2000);
  }, 2500);
};

// Reset state if opened again
watch(
  () => props.isOpen,
  (newVal) => {
    if (newVal) {
      step.value = "methods";
      selectedMethod.value = null;
    }
  },
);
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
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm sm:p-0"
    >
      <!-- Modal Container mimicking Midtrans iFrame -->
      <transition
        enter-active-class="transition duration-300 ease-out transform"
        enter-from-class="opacity-0 translate-y-8 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition duration-200 ease-in transform"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-8 sm:scale-95"
      >
        <div
          v-if="isOpen"
          class="relative w-full max-w-sm bg-gray-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          <!-- Header -->
          <div class="bg-indigo-600 px-5 pt-6 pb-8 relative flex-shrink-0">
            <!-- Close button -->
            <button
              v-if="step !== 'processing' && step !== 'success'"
              @click="close"
              class="absolute top-4 right-4 text-white/70 hover:text-white transition-colors"
            >
              <X class="w-5 h-5" />
            </button>

            <div class="text-center text-white mb-2">
              <h2 class="font-extrabold text-lg tracking-wide">ZonaCoding</h2>
              <p class="text-indigo-200 text-xs mt-1">
                Order ID: {{ orderId }}
              </p>
            </div>

            <!-- Amount Card Overlap -->
            <div
              class="absolute bottom-0 inset-x-5 translate-y-1/2 bg-white rounded-xl shadow-lg p-4 text-center border border-gray-100 flex items-center justify-between"
            >
              <span class="text-gray-500 font-semibold text-sm">Total</span>
              <span class="text-xl font-black text-indigo-700">{{
                amount
              }}</span>
            </div>
          </div>

          <!-- Spacer for the overlapping card -->
          <div class="h-10 flex-shrink-0"></div>

          <!-- Body Content Area -->
          <div class="p-5 overflow-y-auto custom-scrollbar flex-1 relative">
            <!-- STEP 1: Method Selection -->
            <div v-if="step === 'methods'" class="space-y-4 pb-2">
              <h3 class="text-sm font-bold text-gray-900 mb-3 px-1">
                Pilih Metode Pembayaran
              </h3>

              <button
                v-for="method in methods"
                :key="method.id"
                @click="selectMethod(method)"
                class="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center text-left hover:border-indigo-300 hover:shadow-md transition-all group"
              >
                <div
                  class="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors"
                >
                  <component
                    :is="method.icon"
                    class="w-5 h-5 text-gray-600 group-hover:text-indigo-600"
                  />
                </div>
                <div class="flex-1">
                  <h4
                    class="font-bold text-gray-900 text-sm group-hover:text-indigo-700"
                  >
                    {{ method.name }}
                  </h4>
                  <p class="text-xs text-gray-500 mt-0.5">{{ method.desc }}</p>
                </div>
                <ChevronRight
                  class="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors"
                />
              </button>
            </div>

            <!-- STEP 2: Processing Payment -->
            <div
              v-else-if="step === 'processing'"
              class="flex flex-col items-center justify-center py-12"
            >
              <div class="relative w-20 h-20 mb-6">
                <!-- Outer spinning ring -->
                <div
                  class="absolute inset-0 border-4 border-indigo-100 rounded-full"
                ></div>
                <div
                  class="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"
                ></div>
                <!-- Inner icon -->
                <div
                  class="absolute inset-0 flex items-center justify-center text-indigo-600"
                >
                  <Lock class="w-6 h-6" />
                  <!-- Security indication -->
                </div>
              </div>
              <h3 class="text-lg font-bold text-gray-900 mb-2 text-center">
                Memproses Tranksaksi...
              </h3>
              <p class="text-sm text-gray-500 text-center max-w-[250px]">
                Mohon jangan menutup jendela ini selagi kami memverifikasi
                pembayaran Anda dengan Bank/Penyedia.
              </p>
            </div>

            <!-- STEP 3: Success Screen -->
            <div
              v-else-if="step === 'success'"
              class="flex flex-col items-center justify-center py-10 animate-[fadeIn_0.5s_ease-out]"
            >
              <div
                class="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mb-6 animate-[bounce_1s_ease-in-out]"
              >
                <CheckCircle2 class="w-10 h-10" />
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">
                Pembayaran Berhasil!
              </h3>
              <p class="text-sm text-gray-500">Redirecting ke platform...</p>
            </div>
          </div>

          <!-- Mock Footer -->
          <div
            class="bg-gray-100 px-5 py-3 border-t border-gray-200 text-center flex-shrink-0"
          >
            <p
              class="text-[10px] uppercase tracking-widest font-bold text-gray-400 flex items-center justify-center gap-1.5"
            >
              Powered by <span class="text-indigo-900">midtrans</span>
            </p>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
</style>

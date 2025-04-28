<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  question: string;
  options: string[];
}>();

const emit = defineEmits<{
  (e: 'select', value: string): void;
}>();

const selectedOption = ref<string | null>(null);

const handleSelect = (option: string) => {
  selectedOption.value = option;
  emit('select', option);
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-[#FAF9F7] px-4 py-8">
    <div class="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-4 md:p-8 flex flex-col items-center">
      <!-- Logo -->
      <img 
        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp" 
        alt="Logo Gisele Galvão" 
        class="w-32 md:w-40 h-auto mb-2" 
      />

      <!-- Barra de carregamento dourada animada -->
      <div class="relative w-full max-w-md h-[4px] bg-[#f1e8db] rounded-full overflow-hidden mb-6">
        <div class="absolute inset-0 w-1/3 bg-[#b29670] animate-loading-bar rounded-full"></div>
      </div>

      <div class="quiz-question w-full">
        <h2 class="font-playfair text-xl md:text-2xl font-bold text-center mb-8 leading-snug text-gray-950">
          {{ question }}
        </h2>
        
        <div class="grid gap-4">
          <button
            v-for="option in options"
            :key="option"
            @click="handleSelect(option)"
            :class="[
              'p-4 text-left rounded-lg border-2 transition-all duration-300 ease-in-out transform',
              selectedOption === option
                ? 'border-[#B89B7A] bg-[#B89B7A] bg-opacity-10 shadow-lg'
                : 'border-gray-200 hover:border-[#B89B7A] hover:-translate-y-1 hover:shadow-lg'
            ]"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes loading {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(400%); }
}

.animate-loading-bar {
  animation: loading 2s infinite linear;
}

/* Fonte Playfair Display */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.font-playfair {
  font-family: 'Playfair Display', serif;
}

.quiz-question {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 
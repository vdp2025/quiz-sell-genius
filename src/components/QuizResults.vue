<script setup lang="ts">
interface Result {
  category: string;
  score: number;
  description: string;
}

defineProps<{
  results: Result[];
  totalScore: number;
}>();
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

      <h1 class="font-playfair text-2xl md:text-3xl font-bold text-center mb-8 text-gray-950">
        Seu Resultado
      </h1>

      <div class="total-score w-full max-w-md mb-12">
        <h2 class="font-playfair text-xl text-center mb-4 text-[#B89B7A]">Pontuação Total</h2>
        <div class="text-4xl font-bold text-center text-[#B89B7A]">{{ totalScore }}</div>
      </div>

      <div class="categories-grid w-full">
        <div 
          v-for="(result, index) in results" 
          :key="index" 
          class="category-card"
        >
          <h3 class="font-playfair text-xl font-bold text-[#B89B7A] mb-4">{{ result.category }}</h3>
          <div class="category-score text-3xl font-bold text-[#B89B7A] mb-4">{{ result.score }}</div>
          <p class="category-description text-gray-600">{{ result.description }}</p>
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

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.category-card {
  background-color: white;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease-in-out;
}

.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.category-description {
  line-height: 1.6;
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

.results-container {
  animation: fadeIn 0.5s ease-out;
}
</style> 
<script setup lang="ts">
import { ref } from 'vue';

interface Option {
  text: string;
  imageUrl?: string;
  id?: string;
}

interface Props {
  question: string;
  options: Option[];
  stageNumber?: number;
  totalStages?: number;
  displayType?: 'text' | 'image' | 'both';
  imageSize?: 'small' | 'medium' | 'large';
}

const props = withDefaults(defineProps<Props>(), {
  stageNumber: 1,
  totalStages: 1,
  displayType: 'text',
  imageSize: 'medium'
});

const emit = defineEmits<{
  (e: 'select', value: Option): void;
}>();

const selectedOption = ref<Option | null>(null);

const handleSelect = (option: Option) => {
  selectedOption.value = option;
  emit('select', option);
};

const getImageSize = () => {
  switch (props.imageSize) {
    case 'small': return { height: '100px', ratio: '16/9' };
    case 'large': return { height: '250px', ratio: '4/3' };
    default: return { height: '180px', ratio: '4/3' }; // Medium
  }
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
        
        <div class="options-grid" :class="displayType">
          <button
            v-for="option in options"
            :key="option.id || option.text"
            class="option"
            :class="{ selected: selectedOption === option }"
            @click="handleSelect(option)"
          >
            <template v-if="displayType !== 'text'">
              <div class="image-container" :style="getImageSize()">
                <img
                  v-if="option.imageUrl"
                  :src="option.imageUrl"
                  :alt="option.text"
                  class="option-image"
                  @error="$event.target.src = 'https://placehold.co/400x300?text=Imagem+não+encontrada'"
                />
                <div v-else class="image-placeholder">
                  <span>Sem imagem</span>
                </div>
              </div>
            </template>
            
            <div v-if="displayType !== 'image'" class="option-text">
              {{ option.text }}
            </div>
          </button>
        </div>

        <div class="progress">
          <span class="progress-text">Pergunta {{ stageNumber }} de {{ totalStages }}</span>
          <div class="progress-bar">
            <div 
              class="progress-fill"
              :style="{ width: `${(stageNumber / totalStages) * 100}%` }"
            ></div>
          </div>
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

.quiz-question {
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #FFFAF0;
  border-radius: 8px;
}

.question-title {
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
  color: #432818;
  margin-bottom: 1.5rem;
}

.options-grid {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.options-grid.text {
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .options-grid.image, .options-grid.both {
    grid-template-columns: repeat(2, 1fr);
  }
}

.option {
  position: relative;
  width: 100%;
  text-align: left;
  background: white;
  border: 2px solid transparent;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.option:hover {
  border-color: rgba(184, 155, 122, 0.6);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.option.selected {
  border-color: #B89B7A;
  background-color: rgba(184, 155, 122, 0.1);
}

.image-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.option-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background-color: #f3f4f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9ca3af;
}

.option-text {
  padding: 1rem;
  color: #432818;
}

.progress {
  margin-top: 2rem;
}

.progress-text {
  display: block;
  text-align: center;
  font-size: 0.875rem;
  color: rgba(67, 40, 24, 0.6);
  margin-bottom: 0.5rem;
}

.progress-bar {
  width: 100%;
  height: 4px;
  background-color: rgba(184, 155, 122, 0.2);
  border-radius: 9999px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: #B89B7A;
  transition: width 0.3s ease;
}
</style> 
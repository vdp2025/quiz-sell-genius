<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits<{
  (e: 'start', name: string): void
}>();

const userName = ref('');
const error = ref('');

const handleSubmit = () => {
  if (userName.value.trim().length < 2) {
    error.value = 'Por favor, insira um nome válido (mínimo 2 caracteres)';
    return;
  }
  
  error.value = '';
  emit('start', userName.value.trim());
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

      <!-- Título -->
      <h1 class="font-playfair text-xl md:text-2xl font-bold text-center mb-4 leading-snug text-gray-950">
        Chega de um guarda-roupa lotado<br class="hidden md:block" /> e da sensação de que nada combina com você.
      </h1>

      <!-- Imagem principal -->
      <img 
        alt="Mulher elegante com roupas estilosas" 
        class="w-full max-w-xs h-auto object-cover mb-6 rounded-lg shadow-sm" 
        src="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193439/9a20446f-e01f-48f4-96d0-f4b37cc06625_ebd68o.jpg" 
      />

      <!-- Subtítulo com destaque -->
      <p class="text-sm md:text-base text-black text-center mb-6 max-w-lg">
        Em poucos minutos, descubra seu <span class="font-semibold text-[#B89B7A]">Estilo Predominante</span> — 
        e aprenda a montar looks que realmente refletem sua <span class="font-semibold text-[#b29670]">essência</span>, 
        com praticidade e <span class="font-semibold text-[#aa6b5d]">confiança</span>.
      </p>

      <!-- Formulário -->
      <form @submit.prevent="handleSubmit" class="w-full max-w-md flex flex-col gap-3">
        <div class="mb-6">
          <input
            id="name"
            v-model="userName"
            type="text"
            placeholder="Digite seu nome"
            class="w-full p-3 rounded-lg border-2 border-gray-200 focus:border-[#B89B7A] outline-none transition-colors"
            :class="{ 'border-red-500': error }"
          />
          <p v-if="error" class="mt-2 text-red-500 text-sm">
            {{ error }}
          </p>
        </div>

        <button
          type="submit"
          class="
            w-full 
            bg-[#B89B7A] 
            hover:bg-[#aa6b5d] 
            text-white 
            py-4 
            text-base 
            rounded-md 
            shadow 
            transition-all 
            duration-300 
            ease-in-out 
            transform 
            hover:-translate-y-1 
            hover:shadow-lg 
            active:scale-95 
            disabled:opacity-50 
            disabled:cursor-not-allowed
          "
          :disabled="!userName.trim()"
        >
          Continuar
        </button>
      </form>
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

.quiz-intro {
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
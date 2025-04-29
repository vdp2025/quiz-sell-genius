<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../stores/quiz';
import { analyticsService } from '../services/analyticsService';

const props = defineProps<{
  primaryStyle: {
    category: string;
    title: string;
    description: string;
    imageUrl: string;
    guideImageUrl: string;
    characteristics: string[];
  };
  secondaryStyles: {
    category: string;
    title: string;
    description: string;
    imageUrl: string;
  }[];
}>();

const userName = ref('Visitante');
const quizStore = useQuizStore();

onMounted(() => {
  const storedName = localStorage.getItem('userName');
  if (storedName) {
    userName.value = storedName;
  }
  
  // Rastrear visualização do resultado
  analyticsService.trackOfferView(props.primaryStyle.title);
});

const handleOfferClick = () => {
  analyticsService.trackOfferClick(props.primaryStyle.title, 39.00);
};
</script>

<template>
  <div class="min-h-screen bg-[#FAF9F7]">
    <div class="max-w-4xl mx-auto px-4 py-8">
      <!-- Header -->
      <header class="text-center mb-12">
        <img 
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
          alt="Logo Gisele Galvão"
          class="w-32 md:w-40 h-auto mx-auto mb-6"
        />
        <h1 class="font-playfair text-3xl md:text-4xl font-bold text-[#aa6b5d] mb-4">
          {{ userName }}, VOCÊ DESCOBRIU SEU ESTILO!
        </h1>
        <p class="text-xl mb-8 text-gray-700">
          Agora é hora de aplicar com clareza — e se vestir de você
        </p>
        <div class="inline-block bg-[#ffefec] px-4 py-2 rounded-md text-[#aa6b5d] mb-8">
          Seu estilo predominante é {{ primaryStyle.title }}
        </div>
      </header>

      <!-- Primary Style Card -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-12">
        <div class="grid md:grid-cols-2 gap-8">
          <div class="space-y-4">
            <p class="text-[#432818] leading-relaxed">
              {{ primaryStyle.description }}
            </p>
            <div class="bg-[#fff7f3] rounded-lg p-4 shadow-sm">
              <h3 class="text-lg font-medium text-[#432818] mb-3">
                Suas Características Principais
              </h3>
              <ul class="space-y-2">
                <li 
                  v-for="(characteristic, index) in primaryStyle.characteristics" 
                  :key="index"
                  class="flex items-center text-[#432818]"
                >
                  <span class="text-[#B89B7A] mr-2">•</span>
                  {{ characteristic }}
                </li>
              </ul>
            </div>
          </div>
          <div>
            <img
              :src="primaryStyle.imageUrl"
              :alt="`Estilo ${primaryStyle.title}`"
              class="w-full h-auto rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <!-- Guide Images -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <img
          :src="primaryStyle.guideImageUrl"
          :alt="`Guia de Estilo ${primaryStyle.title}`"
          class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp"
          alt="Gisele Galvão"
          class="w-full rounded-lg shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      <!-- Offer Section with tracking -->
      <div class="bg-[#fff7f3] rounded-lg p-6 mb-8">
        <h3 class="text-2xl font-playfair text-[#aa6b5d] mb-4">
          Guia de Estilo {{ primaryStyle.title }} + Bônus Exclusivos
        </h3>
        <div class="grid md:grid-cols-2 gap-6 items-center">
          <img
            src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911682/C%C3%B3pia_de_MOCKUPS_13_znzbks.webp"
            alt="Todos os produtos e bônus mockup"
            class="w-full rounded-lg"
          />
          <div class="space-y-4">
            <p class="text-[#432818]">
              Descubra como valorizar seu estilo {{ primaryStyle.title.toLowerCase() }} com nosso guia completo e personalizado.
            </p>
            <ul class="space-y-2">
              <li class="flex items-center">
                <span class="text-[#B89B7A] mr-2">✓</span>
                Guia personalizado para seu estilo
              </li>
              <li class="flex items-center">
                <span class="text-[#B89B7A] mr-2">✓</span>
                Cartela de cores específica
              </li>
              <li class="flex items-center">
                <span class="text-[#B89B7A] mr-2">✓</span>
                Combinações ideais para seu tipo
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Pricing with tracking -->
      <div class="max-w-md mx-auto bg-white rounded-lg p-6 shadow-lg border-2 border-[#aa6b5d] mb-12">
        <div class="flex flex-col md:flex-row gap-6 items-center justify-center mb-6">
          <div class="text-center md:text-right">
            <p class="text-sm text-gray-500 mb-1">Valor Total</p>
            <p class="text-lg line-through text-gray-500">R$ 175,00</p>
          </div>
          <div class="text-center">
            <p class="text-sm text-[#aa6b5d] mb-1">Oferta especial</p>
            <p class="text-3xl font-bold text-[#aa6b5d]">R$ 39,00</p>
          </div>
        </div>

        <a 
          href="https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912"
          class="inline-flex items-center justify-center w-full bg-[#aa6b5d] hover:bg-[#8f574a] text-white py-4 px-6 rounded-md text-lg transition-colors duration-300 font-medium"
          target="_blank"
          @click="handleOfferClick"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Quero meu Guia {{ primaryStyle.title }} por R$39,00
        </a>
      </div>

      <!-- Benefits -->
      <div class="grid md:grid-cols-2 gap-6 mb-12">
        <img
          src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911677/C%C3%B3pia_de_MOCKUPS_15_-_Copia_grstwl.webp"
          alt="Mockup celular peças-chave por dentro"
          class="w-full rounded-lg"
        />
        <div class="bg-white rounded-lg p-6 shadow-md">
          <h4 class="text-xl font-bold text-[#aa6b5d] mb-4">O que você vai receber:</h4>
          <ul class="space-y-3">
            <li class="flex items-start">
              <span class="text-[#B89B7A] mr-2">•</span>
              <span>Guia de Estilo {{ primaryStyle.title }} Personalizado</span>
            </li>
            <li class="flex items-start">
              <span class="text-[#B89B7A] mr-2">•</span>
              <span>Cartela de Cores Digital para seu estilo</span>
            </li>
            <li class="flex items-start">
              <span class="text-[#B89B7A] mr-2">•</span>
              <span>Planilha de Guarda-Roupa Cápsula</span>
            </li>
            <li class="flex items-start">
              <span class="text-[#B89B7A] mr-2">•</span>
              <span>Acesso ao Grupo VIP no Telegram</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Guarantee -->
      <div class="bg-[#fff7f3] rounded-lg p-6">
        <div class="flex flex-col md:flex-row items-center gap-6">
          <div class="md:w-1/4 flex justify-center">
            <div class="w-32 h-32 rounded-full bg-[#aa6b5d] flex items-center justify-center text-white">
              <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 mx-auto mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="8" r="7"></circle>
                  <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline>
                </svg>
                <span class="block font-bold text-xl">7 Dias</span>
              </div>
            </div>
          </div>
          <div class="md:w-3/4">
            <h2 class="text-2xl font-playfair text-[#aa6b5d] mb-4">
              Garantia de Satisfação
            </h2>
            <p class="mb-2">
              Se você não ficar completamente satisfeita com o seu Guia de Estilo {{ primaryStyle.title }}, 
              basta solicitar o reembolso em até 7 dias após a compra.
            </p>
            <p class="text-gray-600">
              Sem perguntas, sem complicações. Sua satisfação é nossa prioridade!
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap');

.font-playfair {
  font-family: 'Playfair Display', serif;
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

.fade-enter-active {
  animation: fadeIn 0.5s ease-out;
}
</style> 
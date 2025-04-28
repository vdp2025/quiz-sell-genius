<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useQuizStore } from '../stores/quiz';
import QuizIntro from '../components/QuizIntro.vue';
import QuizQuestion from '../components/QuizQuestion.vue';

const router = useRouter();
const quizStore = useQuizStore();
const showIntro = ref(true);
const userName = ref('');

onMounted(() => {
  quizStore.initializeQuiz();
});

const handleStart = (name: string) => {
  userName.value = name;
  quizStore.setUserName(name);
  showIntro.value = false;
};

const handleAnswer = (answer: string) => {
  quizStore.setAnswer(answer);
  
  if (quizStore.isLastQuestion) {
    quizStore.calculateResults();
    router.push('/results');
  } else {
    quizStore.nextQuestion();
  }
};

const handleBack = () => {
  if (quizStore.currentQuestionIndex === 0) {
    showIntro.value = true;
    return;
  }
  quizStore.previousQuestion();
};
</script>

<template>
  <div class="quiz-container">
    <Transition name="fade" mode="out-in">
      <QuizIntro
        v-if="showIntro"
        @start="handleStart"
      />
      <div v-else class="quiz-content">
        <div class="progress-bar">
          <div
            class="progress-fill"
            :style="{ width: `${quizStore.progress}%` }"
          />
        </div>

        <QuizQuestion
          v-if="quizStore.currentQuestion"
          :question="quizStore.currentQuestion.text"
          :options="quizStore.currentQuestion.options"
          @select="handleAnswer"
        />

        <button
          class="back-button"
          @click="handleBack"
        >
          Voltar
        </button>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.quiz-container {
  max-width: 800px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.quiz-content {
  position: relative;
  padding-top: 2rem;
}

.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: #e5e7eb;
  border-radius: 2px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: #4f46e5;
  transition: width 0.3s ease;
}

.back-button {
  margin-top: 2rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid #4f46e5;
  color: #4f46e5;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-button:hover {
  background: #4f46e5;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 
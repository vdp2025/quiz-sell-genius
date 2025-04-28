<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useQuizStore } from '../stores/quiz';
import QuizResults from '../components/QuizResults.vue';

const router = useRouter();
const quizStore = useQuizStore();

const handleRestart = () => {
  quizStore.resetQuiz();
  router.push('/');
};
</script>

<template>
  <div class="results-view">
    <QuizResults
      :results="[
        {
          category: quizStore.primaryStyle?.title || '',
          score: 100,
          description: quizStore.primaryStyle?.description || ''
        },
        ...quizStore.secondaryStyles.map(style => ({
          category: style.title,
          score: 75,
          description: style.description
        }))
      ]"
      :total-score="100"
    />

    <div class="actions">
      <button class="btn btn-primary" @click="handleRestart">
        Recomeçar Quiz
      </button>
    </div>
  </div>
</template>

<style scoped>
.results-view {
  padding: 2rem;
}

.actions {
  display: flex;
  justify-content: center;
  margin-top: 3rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #B89B7A;
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: #aa6b5d;
}
</style> 
import { createRouter, createWebHistory } from 'vue-router';
import QuizView from '../views/QuizView.vue';
import ResultsView from '../views/ResultsView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'quiz',
      component: QuizView,
      meta: {
        title: 'Descubra seu Estilo'
      }
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
      meta: {
        title: 'Seu Resultado'
      }
    }
  ]
});

// Atualizar título da página
router.beforeEach((to, _from, next) => {
  document.title = to.meta.title ? `${to.meta.title} - Quiz de Estilo` : 'Quiz de Estilo';
  next();
});

export default router; 
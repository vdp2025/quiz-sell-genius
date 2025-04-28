import { createRouter, createWebHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router';
import QuizView from '../views/QuizView.vue';
import ResultsView from '../views/ResultsView.vue';
import QuizQuestion from '../components/quiz-vue/QuizQuestion.vue';

// Lazy loading para as rotas do editor
const EditorLayout = () => import('../components/quiz-editor/QuizEditor');
const QuestionEditor = () => import('../components/quiz-editor/QuestionEditor');
const TemplateSelector = () => import('../components/quiz-editor/TemplateSelector');

const router = createRouter({
  history: createWebHistory(),
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
      path: '/question',
      name: 'question',
      component: QuizQuestion,
      meta: {
        title: 'Pergunta do Quiz'
      }
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView,
      meta: {
        title: 'Seu Resultado'
      }
    },
    // Rotas do Editor
    {
      path: '/editor',
      name: 'editor',
      component: EditorLayout,
      meta: {
        title: 'Editor de Quiz',
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: 'editor-templates',
          component: TemplateSelector,
          meta: {
            title: 'Selecionar Template'
          }
        },
        {
          path: 'question/:id',
          name: 'editor-question',
          component: QuestionEditor,
          meta: {
            title: 'Editor de Pergunta'
          }
        }
      ]
    }
  ]
});

// Atualizar título da página e verificar autenticação
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
  document.title = to.meta.title ? `${to.meta.title} - Quiz de Estilo` : 'Quiz de Estilo';
  
  // Verificar autenticação para rotas protegidas
  if (to.matched.some((record: RouteLocationNormalized) => record.meta.requiresAuth)) {
    // Aqui você pode adicionar sua lógica de verificação de autenticação
    // Por exemplo:
    // if (!isAuthenticated()) {
    //   next('/login');
    //   return;
    // }
  }
  
  next();
});

export default router; 
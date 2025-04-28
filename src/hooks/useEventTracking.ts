import { useEffect, useCallback } from 'react';
import { trackEvent } from './useMetricsData';

interface TrackingOptions {
  enablePageViews?: boolean;
  enableClickTracking?: boolean;
  enableFormSubmissions?: boolean;
  enableAbandonmentTracking?: boolean;
}

export function useEventTracking(options: TrackingOptions = {}) {
  const {
    enablePageViews = true,
    enableClickTracking = true,
    enableFormSubmissions = true,
    enableAbandonmentTracking = true
  } = options;
  
  // Gerador de sessionId
  const getSessionId = useCallback(() => {
    let sessionId = sessionStorage.getItem('quizSessionId');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
      sessionStorage.setItem('quizSessionId', sessionId);
    }
    return sessionId;
  }, []);
  
  // Função para rastrear visualização de página
  const trackPageView = useCallback(() => {
    trackEvent({
      sessionId: getSessionId(),
      eventType: 'view',
      targetType: 'page',
      targetId: window.location.pathname,
      metadata: {
        url: window.location.href,
        title: document.title,
        referrer: document.referrer
      }
    });
  }, [getSessionId]);
  
  // Função para rastrear cliques em elementos específicos
  const trackClicks = useCallback((selector: string) => {
    const elements = document.querySelectorAll(selector);
    
    elements.forEach(element => {
      element.addEventListener('click', (e) => {
        const target = e.currentTarget as HTMLElement;
        
        // Obter informações sobre o elemento
        const targetId = target.id || target.getAttribute('data-id') || 'unknown';
        const targetType = target.getAttribute('data-type') || target.tagName.toLowerCase();
        
        // Identificar se é uma pergunta e qual o número
        const questionNumber = target.getAttribute('data-question-number');
        
        trackEvent({
          sessionId: getSessionId(),
          eventType: 'click',
          targetId,
          targetType,
          questionNumber: questionNumber ? parseInt(questionNumber, 10) : undefined,
          metadata: {
            text: target.textContent?.trim() || '',
            url: window.location.pathname,
            position: {
              x: (e as MouseEvent).clientX,
              y: (e as MouseEvent).clientY
            }
          }
        });
      });
    });
  }, [getSessionId]);
  
  // Função para rastrear envios de formulário
  const trackFormSubmissions = useCallback(() => {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
      form.addEventListener('submit', (e) => {
        const target = e.currentTarget as HTMLFormElement;
        const formId = target.id || target.getAttribute('data-id') || 'unknown';
        const formType = target.getAttribute('data-type') || 'form';
        
        trackEvent({
          sessionId: getSessionId(),
          eventType: 'submit',
          targetId: formId,
          targetType: formType,
          metadata: {
            url: window.location.pathname,
            formData: Array.from(new FormData(target).entries()).reduce((acc: Record<string, any>, [key, value]) => {
              // Não incluir senhas ou dados sensíveis
              if (!key.toLowerCase().includes('password') && !key.toLowerCase().includes('token')) {
                acc[key] = typeof value === 'string' ? value : 'binary data';
              }
              return acc;
            }, {})
          }
        });
      });
    });
  }, [getSessionId]);
  
  // Função para rastrear abandonos
  const trackAbandonments = useCallback(() => {
    const handleBeforeUnload = () => {
      // Registra o evento de abandono
      trackEvent({
        sessionId: getSessionId(),
        eventType: 'abandon',
        targetId: window.location.pathname,
        targetType: 'page',
        metadata: {
          url: window.location.href,
          time: new Date().toISOString()
        }
      });
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [getSessionId]);
  
  // Rastrear progresso no quiz
  const trackQuizProgress = useCallback((questionNumber: number, totalQuestions: number) => {
    trackEvent({
      sessionId: getSessionId(),
      eventType: 'view',
      targetId: `question_${questionNumber}`,
      targetType: 'question',
      questionNumber: questionNumber,
      metadata: {
        progress: `${questionNumber}/${totalQuestions}`,
        progressPercentage: (questionNumber / totalQuestions) * 100
      }
    });
  }, [getSessionId]);
  
  // Rastrear seleção de opção em uma pergunta
  const trackOptionSelection = useCallback((questionNumber: number, optionId: string, optionText: string) => {
    trackEvent({
      sessionId: getSessionId(),
      eventType: 'click',
      targetId: optionId,
      targetType: 'option',
      questionNumber: questionNumber,
      metadata: {
        optionText,
        timestamp: new Date().toISOString()
      }
    });
  }, [getSessionId]);
  
  // Rastrear conclusão do quiz
  const trackQuizCompletion = useCallback((resultId: string, resultType: string) => {
    trackEvent({
      sessionId: getSessionId(),
      eventType: 'submit',
      targetId: 'quiz_completion',
      targetType: 'quiz',
      metadata: {
        resultId,
        resultType,
        completionTime: new Date().toISOString()
      }
    });
  }, [getSessionId]);
  
  // Configuração inicial
  useEffect(() => {
    // Rastrear visualização de página
    if (enablePageViews) {
      trackPageView();
    }
    
    // Rastrear cliques em botões e links do quiz
    if (enableClickTracking) {
      trackClicks('.quiz-button, .quiz-option, .quiz-link, [data-track="click"]');
    }
    
    // Rastrear envios de formulários
    if (enableFormSubmissions) {
      trackFormSubmissions();
    }
    
    // Rastrear abandonos
    let cleanup;
    if (enableAbandonmentTracking) {
      cleanup = trackAbandonments();
    }
    
    return () => {
      if (cleanup) cleanup();
    };
  }, [
    enablePageViews,
    enableClickTracking,
    enableFormSubmissions,
    enableAbandonmentTracking,
    trackPageView,
    trackClicks,
    trackFormSubmissions,
    trackAbandonments
  ]);
  
  // Retornar funções utilitárias para uso no componente
  return {
    trackPageView,
    trackClicks,
    trackQuizProgress,
    trackOptionSelection,
    trackQuizCompletion
  };
} 
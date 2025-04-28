import { QuizResult } from '@/types/quiz';

interface AnalyticsEvent {
  eventName: string;
  properties?: Record<string, any>;
}

class AnalyticsService {
  private static instance: AnalyticsService;
  
  private constructor() {}

  static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  private trackEvent(event: AnalyticsEvent) {
    // Enviar para Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.eventName, event.properties);
    }
    
    // Log para debug
    console.log('Analytics Event:', event);
    
    // Salvar no localStorage para análise offline
    const events = JSON.parse(localStorage.getItem('quizEvents') || '[]');
    events.push({
      ...event,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('quizEvents', JSON.stringify(events));
  }

  // Eventos do Quiz
  trackQuizStart(userName: string, utmParams: Record<string, string>) {
    this.trackEvent({
      eventName: 'quiz_start',
      properties: {
        userName,
        ...utmParams
      }
    });
  }

  trackQuestionView(questionId: number, questionText: string) {
    this.trackEvent({
      eventName: 'question_view',
      properties: {
        questionId,
        questionText
      }
    });
  }

  trackQuestionAnswer(questionId: number, answer: string) {
    this.trackEvent({
      eventName: 'question_answer',
      properties: {
        questionId,
        answer
      }
    });
  }

  trackQuizComplete(result: QuizResult) {
    this.trackEvent({
      eventName: 'quiz_complete',
      properties: {
        primaryStyle: result.primaryStyle.title,
        secondaryStyles: result.secondaryStyles.map(style => style.title),
        totalSelections: result.totalSelections
      }
    });
  }

  // Eventos da Oferta
  trackOfferView(styleType: string) {
    this.trackEvent({
      eventName: 'offer_view',
      properties: {
        styleType
      }
    });
  }

  trackOfferClick(styleType: string, price: number) {
    this.trackEvent({
      eventName: 'offer_click',
      properties: {
        styleType,
        price
      }
    });
  }

  // Métricas de Engajamento
  trackTimeSpent(questionId: number, timeInSeconds: number) {
    this.trackEvent({
      eventName: 'question_time_spent',
      properties: {
        questionId,
        timeInSeconds
      }
    });
  }

  trackQuizAbandonment(questionId: number, reason?: string) {
    this.trackEvent({
      eventName: 'quiz_abandonment',
      properties: {
        lastQuestionId: questionId,
        reason
      }
    });
  }
}

export const analyticsService = AnalyticsService.getInstance(); 
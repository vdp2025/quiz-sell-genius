import { useState, useCallback } from 'react';
import { QuizStage } from '@/types/quizBuilder';

export const useQuizStages = () => {
  const [stages, setStages] = useState<QuizStage[]>([]);
  const [activeStageId, setActiveStageId] = useState<string | null>(null);

  const initializeStages = useCallback((initialStages: QuizStage[]) => {
    setStages(initialStages);
  }, []);

  const addStage = useCallback((type: QuizStage['type']): string => {
    const stageNumber = stages.length + 1;
    let stageTitle = '';
    
    switch (type) {
      case 'cover':
        stageTitle = 'Etapa 1: Capa do Quiz';
        break;
      case 'question':
        stageTitle = `Etapa ${stageNumber}: Questão ${stages.filter(s => s.type === 'question').length + 1}`;
        break;
      case 'result':
        stageTitle = `Etapa ${stageNumber}: Página de Resultado`;
        break;
    }
    
    const newStage: QuizStage = {
      id: `stage-${Date.now()}`,
      title: stageTitle,
      order: stages.length,
      type
    };
    
    setStages(prev => [...prev, newStage]);
    return newStage.id;
  }, [stages]);

  const updateStage = useCallback((id: string, updates: Partial<QuizStage>) => {
    setStages(prev => 
      prev.map(stage => 
        stage.id === id ? { ...stage, ...updates } : stage
      )
    );
  }, []);

  const deleteStage = useCallback((id: string) => {
    setStages(prev => {
      const filteredStages = prev.filter(stage => stage.id !== id);
      return filteredStages.map((stage, index) => ({
        ...stage,
        order: index
      }));
    });
    
    if (id === activeStageId) {
      setActiveStageId(prev => {
        const remainingStages = stages.filter(stage => stage.id !== id);
        return remainingStages.length > 0 ? remainingStages[0].id : null;
      });
    }
  }, [stages, activeStageId]);

  const moveStage = useCallback((draggedId: string, targetId: string) => {
    setStages(prev => {
      const draggedIndex = prev.findIndex(s => s.id === draggedId);
      const targetIndex = prev.findIndex(s => s.id === targetId);
      
      if (draggedIndex === -1 || targetIndex === -1) return prev;
      
      const newStages = [...prev];
      const [draggedStage] = newStages.splice(draggedIndex, 1);
      newStages.splice(targetIndex, 0, draggedStage);
      
      return newStages.map((stage, index) => ({
        ...stage,
        order: index
      }));
    });
  }, []);

  return {
    stages,
    activeStageId,
    addStage,
    updateStage,
    deleteStage,
    moveStage,
    setActiveStage: setActiveStageId,
    initializeStages
  };
};


import { useState, useEffect, useCallback } from 'react';
import { ResultPageConfig } from '@/types/resultPageConfig';
import { resultPageStorage } from '@/services/resultPageStorage';
import { toast } from '@/components/ui/use-toast';

export const useResultPageConfig = (styleType: string) => {
  const [config, setConfig] = useState<ResultPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Load config on init
  useEffect(() => {
    const loadConfig = async () => {
      setLoading(true);
      try {
        const loadedConfig = resultPageStorage.loadConfig(styleType);
        setConfig(loadedConfig);
      } catch (err) {
        console.error('Error loading config:', err);
        setError(err instanceof Error ? err : new Error('Failed to load config'));
        toast({
          title: "Erro ao carregar configuração",
          description: "Não foi possível carregar a configuração da página de resultado",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadConfig();
  }, [styleType]);
  
  // Save config function
  const saveConfig = useCallback((updatedConfig: ResultPageConfig) => {
    try {
      const success = resultPageStorage.saveConfig(styleType, updatedConfig);
      if (success) {
        setConfig(updatedConfig);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Error saving config:', err);
      setError(err instanceof Error ? err : new Error('Failed to save config'));
      return false;
    }
  }, [styleType]);
  
  // Update section of the config
  const updateSection = useCallback((path: string, value: any) => {
    setConfig((prevConfig) => {
      if (!prevConfig) return null;
      
      const newConfig = { ...prevConfig };
      const pathParts = path.split('.');
      
      let current: any = newConfig;
      for (let i = 0; i < pathParts.length - 1; i++) {
        if (!current[pathParts[i]]) {
          current[pathParts[i]] = {};
        }
        current = current[pathParts[i]];
      }
      
      current[pathParts[pathParts.length - 1]] = value;
      
      resultPageStorage.saveConfig(styleType, newConfig);
      return newConfig;
    });
  }, [styleType]);
  
  return {
    config,
    loading,
    error,
    saveConfig,
    updateSection
  };
};

export default useResultPageConfig;

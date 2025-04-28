
import { useEffect, useRef, useState } from 'react';
import { toast } from '@/components/ui/use-toast';

interface UseAutosaveOptions<T> {
  data: T;
  onSave: (data: T) => Promise<boolean>;
  interval?: number;
  enabled?: boolean;
  showToast?: boolean;
}

export function useAutosave<T>({
  data,
  onSave,
  interval = 5000,
  enabled = true,
  showToast = false
}: UseAutosaveOptions<T>) {
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastDataRef = useRef<T>(data);
  const pendingSaveRef = useRef<boolean>(false);

  const save = async (forceShowToast = false) => {
    if (!enabled) return;
    
    // Compare JSON stringified versions to detect changes
    const currentDataStr = JSON.stringify(data);
    const lastDataStr = JSON.stringify(lastDataRef.current);
    
    // Don't save if the data hasn't changed
    if (currentDataStr === lastDataStr && !forceShowToast) {
      return;
    }
    
    // If already saving, mark as pending and return
    if (isSaving) {
      pendingSaveRef.current = true;
      return;
    }
    
    setIsSaving(true);
    try {
      const success = await onSave(data);
      if (success) {
        lastDataRef.current = JSON.parse(currentDataStr);
        const now = new Date();
        setLastSaved(now);
        
        if (showToast || forceShowToast) {
          toast({
            title: "Alterações salvas",
            description: `Suas alterações foram salvas às ${now.toLocaleTimeString()}`,
          });
        }
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      if (showToast || forceShowToast) {
        toast({
          title: "Erro ao salvar",
          description: "Suas alterações não puderam ser salvas. Tente novamente.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSaving(false);
      
      // If a pending save was requested during this save operation, trigger a new save
      if (pendingSaveRef.current) {
        pendingSaveRef.current = false;
        setTimeout(() => save(false), 100);
      }
    }
  };

  // Setup autosave
  useEffect(() => {
    if (!enabled) return;
    
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new timeout
    timeoutRef.current = setTimeout(() => {
      save(false);
    }, interval);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, enabled, interval]);

  // Save immediately when component unmounts
  useEffect(() => {
    return () => {
      if (enabled && JSON.stringify(data) !== JSON.stringify(lastDataRef.current)) {
        save(false);
      }
    };
  }, [data, enabled]);

  return {
    isSaving,
    lastSaved,
    saveNow: () => save(true),
  };
}

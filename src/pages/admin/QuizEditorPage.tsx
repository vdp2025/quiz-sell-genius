
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import QuizEditor from '@/components/quiz-editor/QuizEditor';
import { LoadingState } from '@/components/ui/loading-state';
import { getTemplateById } from '@/services/templates/templateService';
import { QuizTemplate } from '@/types/quizTemplate';

const QuizEditorPage = () => {
  const { templateId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [template, setTemplate] = useState<QuizTemplate | null>(null);

  useEffect(() => {
    const loadTemplate = async () => {
      if (templateId) {
        try {
          const template = await getTemplateById(templateId);
          if (!template) {
            setError('Template não encontrado');
            navigate('/admin/quiz-editor');
            return;
          }
          setTemplate(template);
        } catch (err) {
          console.error('Error loading template:', err);
          setError('Erro ao carregar template');
          navigate('/admin/quiz-editor');
        }
      }
      setLoading(false);
    };

    loadTemplate();
  }, [templateId, navigate]);

  if (loading) {
    return (
      <AdminLayout>
        <LoadingState />
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6">
          <p className="text-red-500">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="h-full bg-[#FAF9F7] p-6">
        {template && <QuizEditor initialTemplate={template} />}
      </div>
    </AdminLayout>
  );
};

export default QuizEditorPage;

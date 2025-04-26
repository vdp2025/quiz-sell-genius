
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Pencil, Copy, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface Quiz {
  id: string;
  nome: string;
  perguntas: any[];
  oferta: {
    titulo: string;
    descricao: string;
    imagem: string;
    link: string;
  };
}

export default function QuizAdminPanel() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizzes") || "[]");
    setQuizzes(saved);
  }, []);

  function saveQuizzes(newQuizzes: Quiz[]) {
    setQuizzes(newQuizzes);
    localStorage.setItem("quizzes", JSON.stringify(newQuizzes));
  }

  function handleCreate() {
    const novoQuiz: Quiz = {
      id: Date.now().toString(),
      nome: "Novo Quiz",
      perguntas: [],
      oferta: { titulo: "", descricao: "", imagem: "", link: "" }
    };
    saveQuizzes([...quizzes, novoQuiz]);
  }

  function handleDelete(id: string) {
    if (confirm("Tem certeza que deseja excluir este quiz?")) {
      saveQuizzes(quizzes.filter(q => q.id !== id));
    }
  }

  function handleDuplicate(id: string) {
    const quiz = quizzes.find(q => q.id === id);
    if (quiz) {
      const copia = { ...quiz, id: Date.now().toString(), nome: quiz.nome + " (Cópia)" };
      saveQuizzes([...quizzes, copia]);
    }
  }

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium text-[#432818]">Seus Quizzes</h2>
        <Button onClick={handleCreate} className="flex items-center gap-2">
          <Plus size={16} />
          <span>Novo Quiz</span>
        </Button>
      </div>

      {quizzes.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-[#B89B7A]/30 rounded-lg">
          <p className="text-[#8F7A6A] mb-4">Você ainda não criou nenhum quiz</p>
          <Button onClick={handleCreate}>Criar Meu Primeiro Quiz</Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-[#B89B7A]/20">
                <th className="py-3 px-4 font-medium text-[#432818]">Nome</th>
                <th className="py-3 px-4 font-medium text-[#432818]">Perguntas</th>
                <th className="py-3 px-4 font-medium text-[#432818]">Ações</th>
              </tr>
            </thead>
            <tbody>
              {quizzes.map(q => (
                <tr key={q.id} className="border-b border-[#B89B7A]/10 hover:bg-[#FAF9F7]">
                  <td className="py-3 px-4">{q.nome}</td>
                  <td className="py-3 px-4">{q.perguntas.length} perguntas</td>
                  <td className="py-3 px-4 flex gap-2">
                    <Link to={`/admin/quiz-builder?id=${q.id}`}>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Pencil size={14} />
                        <span>Editar</span>
                      </Button>
                    </Link>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDuplicate(q.id)}
                      className="flex items-center gap-1"
                    >
                      <Copy size={14} />
                      <span>Duplicar</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(q.id)}
                      className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:border-red-200"
                    >
                      <Trash2 size={14} />
                      <span>Excluir</span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

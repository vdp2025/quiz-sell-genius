
import React, { useState, useEffect } from "react";

export default function QuizEditorPage() {
  const [tab, setTab] = useState('intro'); // intro | questions | result
  const [quizData, setQuizData] = useState({
    intro: { title: "", description: "" },
    questions: [
      { id: "1", text: "Pergunta exemplo", options: ["Opção 1", "Opção 2"] }
    ],
    result: { title: "", description: "", imageUrl: "", offer: "" }
  });

  // Carregar dados salvos
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("quizData") || "null");
    if (saved) setQuizData(saved);
  }, []);

  // Salvar dados
  function handleSave() {
    localStorage.setItem("quizData", JSON.stringify(quizData));
    alert("Quiz salvo!");
  }

  // Handlers para editar cada parte
  function handleIntroChange(field, value) {
    setQuizData({ ...quizData, intro: { ...quizData.intro, [field]: value } });
  }
  
  function handleQuestionChange(idx, field, value) {
    const questions = [...quizData.questions];
    questions[idx][field] = value;
    setQuizData({ ...quizData, questions });
  }
  
  function handleOptionChange(qIdx, oIdx, value) {
    const questions = [...quizData.questions];
    questions[qIdx].options[oIdx] = value;
    setQuizData({ ...quizData, questions });
  }
  
  function handleAddQuestion() {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { id: Date.now().toString(), text: "", options: [""] }
      ]
    });
  }
  
  function handleRemoveQuestion(idx) {
    const questions = quizData.questions.filter((_, i) => i !== idx);
    setQuizData({ ...quizData, questions });
  }
  
  function handleAddOption(qIdx) {
    const questions = [...quizData.questions];
    questions[qIdx].options.push("");
    setQuizData({ ...quizData, questions });
  }
  
  function handleRemoveOption(qIdx, oIdx) {
    const questions = [...quizData.questions];
    questions[qIdx].options.splice(oIdx, 1);
    setQuizData({ ...quizData, questions });
  }
  
  function handleResultChange(field, value) {
    setQuizData({ ...quizData, result: { ...quizData.result, [field]: value } });
  }

  // Temporary mockup components for this page
  // These would be replaced with your actual components once available
  const QuizIntro = ({ onStart, title, description }) => (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }}>
      <h3>{title || "Título do Quiz"}</h3>
      <p>{description || "Descrição do quiz aqui"}</p>
      <button onClick={onStart}>Iniciar Quiz</button>
    </div>
  );

  const QuizPage = ({ quiz, modoPreview }) => (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }}>
      <p>Preview do Quiz {modoPreview ? "(Modo Preview)" : ""}</p>
      <h4>Perguntas:</h4>
      <ul>
        {quiz?.questions?.map((q, i) => (
          <li key={q.id || i}>{q.text || "Pergunta sem texto"}</li>
        ))}
      </ul>
    </div>
  );

  const QuizResult = ({ title, description, imageUrl, offer }) => (
    <div style={{ border: '1px solid #ccc', padding: '20px', marginTop: '10px' }}>
      <h3>{title || "Título do Resultado"}</h3>
      <p>{description || "Descrição do resultado aqui"}</p>
      {imageUrl && <img src={imageUrl} alt="Resultado" style={{ maxWidth: '200px' }} />}
      <p><strong>Oferta:</strong> {offer || "Nenhuma oferta definida"}</p>
    </div>
  );

  return (
    <div>
      <h2>Editor Visual do Quiz</h2>
      <div style={{ marginBottom: 16 }}>
        <button onClick={() => setTab('intro')}>Introdução</button>
        <button onClick={() => setTab('questions')}>Perguntas</button>
        <button onClick={() => setTab('result')}>Resultado</button>
      </div>

      {tab === 'intro' && (
        <div>
          <h3>Editar Introdução</h3>
          <input
            value={quizData.intro.title}
            onChange={e => handleIntroChange("title", e.target.value)}
            placeholder="Título da introdução"
          />
          <input
            value={quizData.intro.description}
            onChange={e => handleIntroChange("description", e.target.value)}
            placeholder="Descrição da introdução"
          />
          <h4>Preview</h4>
          <QuizIntro
            onStart={() => {}}
            title={quizData.intro.title}
            description={quizData.intro.description}
          />
        </div>
      )}

      {tab === 'questions' && (
        <div>
          <h3>Editar Perguntas</h3>
          {quizData.questions.map((p, idx) => (
            <div key={p.id} style={{ border: "1px solid #ccc", margin: 8, padding: 8 }}>
              <input
                value={p.text}
                onChange={e => handleQuestionChange(idx, "text", e.target.value)}
                placeholder="Texto da pergunta"
              />
              <div>
                <b>Opções:</b>
                {p.options.map((op, oIdx) => (
                  <div key={oIdx}>
                    <input
                      value={op}
                      onChange={e => handleOptionChange(idx, oIdx, e.target.value)}
                      placeholder={`Opção ${oIdx + 1}`}
                    />
                    <button onClick={() => handleRemoveOption(idx, oIdx)} disabled={p.options.length <= 1}>Remover</button>
                  </div>
                ))}
                <button onClick={() => handleAddOption(idx)}>Adicionar Opção</button>
              </div>
              <button onClick={() => handleRemoveQuestion(idx)}>Remover Pergunta</button>
            </div>
          ))}
          <button onClick={handleAddQuestion}>Adicionar Pergunta</button>
          <h4>Preview</h4>
          <QuizPage quiz={quizData} modoPreview={true} />
        </div>
      )}

      {tab === 'result' && (
        <div>
          <h3>Editar Resultado</h3>
          <input
            value={quizData.result.title}
            onChange={e => handleResultChange("title", e.target.value)}
            placeholder="Título do resultado"
          />
          <input
            value={quizData.result.description}
            onChange={e => handleResultChange("description", e.target.value)}
            placeholder="Descrição do resultado"
          />
          <input
            value={quizData.result.imageUrl}
            onChange={e => handleResultChange("imageUrl", e.target.value)}
            placeholder="URL da imagem"
          />
          <input
            value={quizData.result.offer}
            onChange={e => handleResultChange("offer", e.target.value)}
            placeholder="Texto da oferta"
          />
          <h4>Preview</h4>
          <QuizResult
            title={quizData.result.title}
            description={quizData.result.description}
            imageUrl={quizData.result.imageUrl}
            offer={quizData.result.offer}
          />
        </div>
      )}

      <br />
      <button onClick={handleSave}>Salvar Quiz</button>
    </div>
  );
}

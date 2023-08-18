"use client"
import React, { useState } from 'react';

const Question = ({ questionData, handleAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleChangeAnswer = (answerId) => {
    if (!answered) {
      setSelectedAnswer(answerId);
      handleAnswer(questionData._id, answerId);
      setAnswered(true);
    }
  };

  const answerClassName = (answerId) => {
    if (answered && answerId === questionData.respuesta) {
      return 'bg-green-600 text-white';
    } else if (answered && answerId === selectedAnswer && answerId !== questionData.respuesta) {
      return 'bg-red-600 text-white';
    } else if (answered) {
      return 'bg-gray-700 text-white';
    } else {
      return 'bg-gray-700 hover:bg-gray-600 text-white';
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold mb-2" style={{ fontSize: '1rem', color: '#EDEDED' }}>{questionData.pregunta}</h2>
      <ul>
        {questionData.respuestas.map((answer) => (
          <li
            key={answer.id}
            onClick={() => handleChangeAnswer(answer.id)}
            className={`cursor-pointer p-2 rounded ${answerClassName(answer.id)} text-sm mb-2 transition-colors duration-300`}
            style={{ pointerEvents: answered ? 'none' : 'auto' }}
          >
            {answer.contenido}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;

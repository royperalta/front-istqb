"use client"
import React, { useState, useEffect } from 'react';
import Question from './Question';


const Lista = () => {
    const [answers, setAnswers] = useState({});
    const [questions, setQuestions] = useState([]);
    

    useEffect(() => {
        // Realizar la solicitud a la API al cargar la página
        fetch('http://localhost:5000/api/listar')
            .then(response => response.json())
            .then(data => setQuestions(data))
            .catch(error => console.error('Error al obtener datos:', error));
    }, []);

    const handleAnswer = (questionId, answerId) => {
        setAnswers((prevAnswers) => ({ ...prevAnswers, [questionId]: answerId }));
    };

    const calculateResults = () => {
        let correctCount = 0;
        let incorrectCount = 0;

        questions.forEach((question) => {
            const selectedAnswerId = answers[question._id];
            if (selectedAnswerId === question.respuesta) {
                correctCount++;
            } else {
                incorrectCount++;
            }
        });

        return { correctCount, incorrectCount };
    };

    const results = calculateResults();

    const footerHeight = "110px"; // Ajusta la altura del footer

    return (
        <div className="flex flex-col min-h-screen">
            <div className="container mx-auto p-4 pb-8" style={{ marginBottom: footerHeight }}>
                <h1 className="text-2xl font-semibold mb-4">Tu Simulador de Examen ISTQB en Línea</h1>
                <div className="mt-8 flex flex-wrap">
                    {questions.map((question, index) => (
                        <div className="flex items-start mb-4" key={question._id}>
                            <span className="mr-2 font-semibold">{index + 1}.</span>
                            <div className="flex-grow">
                                <Question questionData={question} handleAnswer={handleAnswer} />                              
                            </div>                                                   
                        </div>                       
                    ))}
                </div>



            </div>
            <footer className="bg-gray-200 text-center py-4 fixed bottom-0 w-full" style={{ height: footerHeight }}>
                <div className="container mx-auto">
                    <h2 className="text-lg font-semibold">Resultados:</h2>
                    <p>Respuestas correctas: {results.correctCount}</p>
                    <p>Respuestas incorrectas: {results.incorrectCount}</p>
                </div>
            </footer>
        </div>
    );
};

export default Lista;


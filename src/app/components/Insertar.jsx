'use client'

import { useState } from 'react';

const Ingresar = () => {
    const [pregunta, setPregunta] = useState('');
    const [respuestas, setRespuestas] = useState([]);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState('');
    const [identificador, setIdentificador] = useState('')
    const [max, setMax] = useState(0)
    const [successMessage, setSuccessMessage] = useState(false)
    const agregarRespuesta = () => {
        setRespuestas([...respuestas, { id: Date.now().toString(), contenido: '' }]);
    };

    const actualizarRespuesta = (id, contenido) => {
        const nuevasRespuestas = respuestas.map(respuesta =>
            respuesta.id === id ? { ...respuesta, contenido } : respuesta
        );
        console.log(respuestas)
        setRespuestas(nuevasRespuestas);
        console.log(respuestas.length)
        setMax(respuestas.length)
    };

    const actualizarIdentificador = (numero) => {
        console.log(numero)
        if (!numero) {
            console.log('La respuesta correcta no puede estar vacía');
            return;
        }
        setRespuestaCorrecta(numero)
        setIdentificador(respuestas[numero].id)
        console.log(respuestas[numero].id)
        console.log(numero)
        console.log(identificador)
    }

    const handleSubmit = async e => {
        e.preventDefault();
        const data = {
            pregunta,
            respuestas,
            respuesta: identificador
        };
        console.log(data)

        try {
            const response = await fetch('http://localhost:5000/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log(result);
            if(response.status === 200){
                setSuccessMessage(true)
            }
        } catch (error) {
            console.error('Error al enviar los datos', error);
        }
    };

    return (

        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md lg:w-2/3 xl:w-1/2">


            <h1 className="text-2xl font-semibold mb-4">Ingresar Información</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="pregunta" className="mb-1 font-medium">Pregunta:</label>
                    <textarea
                        id="pregunta"
                        className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={pregunta}
                        onChange={e => setPregunta(e.target.value)}
                    ></textarea>

                </div>
                <div className="flex flex-col">
                    <label htmlFor="respuestas" className="mb-1 font-medium">Respuestas:</label>
                    {respuestas.map((respuesta, index) => (
                        <div key={respuesta.id} className="mb-2">
                            <div className="flex items-center">
                                <div className="flex justify-center items-center h-12 w-12 bg-green-500 rounded-l-full">
                                    <label className="text-white font-bold text-lg">{index + 1}</label>
                                </div>
                                <input
                                    type="text"
                                    className="border rounded-r-md px-3 py-2 ml-2 w-4/5 focus:outline-none focus:border-blue-500"
                                    value={respuesta.contenido}
                                    onChange={e => actualizarRespuesta(respuesta.id, e.target.value)}
                                />

                            </div>

                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={agregarRespuesta}
                        className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600"
                    >
                        Agregar Respuesta +
                    </button>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="respuestaCorrecta" className="mb-1 font-medium">Respuesta Correcta:</label>
                    <select
                        id="respuestaCorrecta"
                        className="border rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                        value={respuestaCorrecta}
                        onChange={e => actualizarIdentificador(e.target.value)}
                        required // Agregar el atributo required
                    >
                        <option value="">Selecciona una respuesta</option>
                        {respuestas.map((respuesta, index) => (
                            <option key={respuesta.id} value={index}>
                                Respuesta {index + 1}
                            </option>
                        ))}
                    </select>


                </div>

                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Enviar
                </button>
            </form>
            {successMessage !== false ? <div className=''>ENVIADO</div> : <div></div>}
        </div>



    );
};

export default Ingresar;

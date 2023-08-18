import { Question } from './components/Question'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Simulador Examen ISTQB</h1>
      <a href="/listar" className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md">
        Ir al Examen ISTQB
      </a>
    </main>
  )
}

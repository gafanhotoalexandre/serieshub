import { Link } from 'react-router'
import { Home } from 'lucide-react'

export const NotFound = () => {
  return (
    <div className="py-20 bg-gray-900 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl md:text-8xl font-bold text-white mb-4">404</h1>

      <h2 className="text-2xl md:text-4xl font-semibold text-gray-300 mb-6">
        Oops! Página não encontrada.
      </h2>

      <p className="text-lg text-gray-400 max-w-2xl mb-8">
        Parece que você se perdeu no espaço. A página que você está procurando
        não existe ou foi movida. Volte para a página inicial e tente novamente.
      </p>

      <Link
        to="/"
        className="flex items-center gap-2 px-6 py-3 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-all duration-300"
      >
        <Home size={20} />
        <span className="text-lg">Voltar para o Início</span>
      </Link>
    </div>
  )
}

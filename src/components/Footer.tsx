import { Info, Mail } from 'lucide-react'
import { Link } from 'react-router'
import { Logo } from './Logo'

export const Footer = () => {
  return (
    <footer className="border-t border-gray-800 bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Logo size="text-xl" addClasses="hover:underline" />

          <div className="flex items-center space-x-6">
            <Link
              to="/about"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Info size={18} />
              <span>Sobre</span>
            </Link>
            <Link
              to="/contact"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <Mail size={18} />
              <span>Contato</span>
            </Link>
          </div>

          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} SeriesHub. Todos os direitos
            reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

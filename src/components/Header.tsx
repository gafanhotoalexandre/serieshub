import { Link } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { LogOut, Home, Heart, LogIn } from 'lucide-react'
import { Logo } from './Logo'

export const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-xl bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Logo
            size="text-2xl"
            addClasses="hover:from-blue-300 hover:to-blue-500"
          />

          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link
                  to="/"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Home size={18} />
                  <span>Início</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/favorites"
                  className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                >
                  <Heart size={18} />
                  <span>Favoritos</span>
                </Link>
              </li>
              {user ? (
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
                  >
                    <LogOut size={18} />
                    <span>Sair</span>
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/auth"
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all"
                  >
                    <LogIn size={18} />
                    <span>Entrar</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  )
}

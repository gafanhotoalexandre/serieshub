import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router'
import { LogIn, UserPlus, Mail, Lock, User, AlertTriangle } from 'lucide-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

export const AuthPage = () => {
  const navigate = useNavigate()
  const [parent, enableAnimations] = useAutoAnimate()
  const [isLogin, setIsLogin] = useState(true)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const { login, register } = useAuth()

  const handleSetIsLogin = () => {
    setError('')
    enableAnimations(true)
    setIsLogin(!isLogin)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    enableAnimations(false)
    setError('')

    try {
      const success = isLogin
        ? await login(formData.email, formData.password)
        : await register(formData.name, formData.email, formData.password)

      if (!success) {
        setError(isLogin ? 'Credenciais inválidas' : 'E-mail já cadastrado')
        return
      }

      navigate('/')
    } catch (err) {
      setError(`Ocorreu um erro: ${err}`)
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full">
        {/* Card principal */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-xl p-6 space-y-6">
          {/* Cabeçalho */}
          <div className="space-y-1 text-center">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/10 text-blue-400 mb-3">
              {isLogin ? <LogIn size={20} /> : <UserPlus size={20} />}
            </div>
            <h2 className="text-2xl font-bold text-white">
              {isLogin ? 'Bem-vindo de volta' : 'Criar nova conta'}
            </h2>
            <p className="text-gray-400 text-sm">
              {isLogin
                ? 'Faça login para acessar sua conta'
                : 'Preencha os dados para se cadastrar'}
            </p>
          </div>

          {/* Formulário */}
          <form ref={parent} className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="text-sm font-medium text-gray-300"
                >
                  Nome completo
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <User size={16} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={!isLogin}
                    className="pl-10 w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-300"
              >
                E-mail
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={16} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Senha
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={16} />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 w-full bg-gray-900/50 border border-gray-700 rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                <AlertTriangle size={14} />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {isLogin ? <LogIn size={16} /> : <UserPlus size={16} />}
              {isLogin ? 'Entrar' : 'Criar conta'}
            </button>
          </form>

          {/* Toggle Login/Register */}
          <div className="text-center pt-3">
            <button
              onClick={handleSetIsLogin}
              className="text-blue-400 hover:text-blue-300 transition-colors text-sm"
            >
              {isLogin
                ? 'Não tem uma conta? Cadastre-se'
                : 'Já tem uma conta? Entrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

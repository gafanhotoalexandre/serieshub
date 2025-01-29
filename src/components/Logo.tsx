import { Link } from 'react-router'

interface LogoProps {
  size?: string // Define o tamanho do texto (ex: 'text-2xl', 'text-xl')
  addClasses?: string // Para classes adicionais específicas
}

export const Logo: React.FC<LogoProps> = ({
  size = 'text-2xl', // Valor padrão
  addClasses = '', // Valor padrão vazio
}) => {
  return (
    <Link
      to="/"
      className={`font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent transition-all ${size} ${addClasses}`}
    >
      SeriesHub
    </Link>
  )
}

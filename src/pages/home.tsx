import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { Search, Heart, HeartOff, Star, Filter } from 'lucide-react'

import { getTrendingSeries, getGenres } from '../utils/api'
import { useAuth } from '../context/AuthContext'
import { Genre, Series, User } from '../types'
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage'
import { SeriesSkeleton } from '../components/SeriesSkeleton'
import { GenresSkeleton } from '../components/GenresSkeleton'

const BASE_IMAGE_URL = 'https://image.tmdb.org/t/p/w500'

export const HomePage = () => {
  const [series, setSeries] = useState<Series[]>([])
  const [filteredSeries, setFilteredSeries] = useState<Series[]>([])
  const [genres, setGenres] = useState<Genre[]>([])
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)
  const { user, setUser } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('search') || ''
  const [isLoading, setIsLoading] = useState(true)
  const [parent] = useAutoAnimate()

  // Buscar gêneros
  useEffect(() => {
    const fetchGenres = async () => {
      // criar um setIsLoadingGenres() ?
      const genresList = await getGenres()
      setGenres(genresList)
    }
    fetchGenres()
  }, [])

  // Buscar séries apenas uma vez
  useEffect(() => {
    const fetchSeries = async () => {
      setIsLoading(true)
      const popularSeries = await getTrendingSeries()
      setSeries(popularSeries)
      setIsLoading(false)
    }
    fetchSeries()
  }, [])

  // Filtrar séries baseado no termo de busca e gênero selecionado
  useEffect(() => {
    const filterSeries = () => {
      let filtered = series

      // Filtrar por gênero se houver um selecionado
      if (selectedGenre !== null) {
        filtered = filtered.filter((series) =>
          series.genre_ids.includes(selectedGenre)
        )
      }

      // Filtrar por termo de busca
      if (searchTerm) {
        filtered = filtered.filter((series) =>
          series.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      }

      setFilteredSeries(filtered)
    }

    filterSeries()
  }, [searchTerm, selectedGenre, series])

  const handleFavorite = (seriesId: number) => {
    if (user) {
      const updatedFavorites = user.favorites.includes(seriesId)
        ? user.favorites.filter((id: number) => id !== seriesId)
        : [...user.favorites, seriesId]

      const updatedUser = {
        ...user,
        favorites: updatedFavorites,
      }

      saveToLocalStorage('currentUser', updatedUser)

      const users: User[] = getFromLocalStorage('users') || []
      const updatedUsers = Array.isArray(users)
        ? users.map((u: User) => (u.id === user.id ? updatedUser : u))
        : [updatedUser]
      saveToLocalStorage('users', updatedUsers)

      setUser(updatedUser)
    } else {
      alert('Faça login para favoritar uma série!')
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchParams(value ? { search: value } : {})
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section com Search e Filtros */}
      <section className="relative bg-gradient-to-b from-gray-800 to-gray-900 pt-16 pb-10">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 text-center">
            Descubra Novas Séries
          </h1>
          <div className="space-y-6">
            {/* Search input */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Pesquise entre diversas séries online..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-gray-800/50 text-white rounded-xl border border-gray-700 p-4 pl-6 pr-12 text-lg shadow-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
              />
              <Search
                size={24}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>

            {/* Filtro de gêneros */}
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <Filter size={18} className="text-gray-400" />
                <span className="text-gray-400 text-sm">
                  Filtrar por gênero:
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedGenre(null)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedGenre === null
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  Todos
                </button>
                {isLoading
                  ? Array.from({ length: 12 }).map((_, index) => (
                      <GenresSkeleton key={index} />
                    ))
                  : genres.map((genre) => (
                      <button
                        key={genre.id}
                        onClick={() => setSelectedGenre(genre.id)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedGenre === genre.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800'
                        }`}
                      >
                        {genre.name}
                      </button>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Séries */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-white mb-8">
          {searchTerm ? 'Resultados da Busca' : 'Séries Populares'}
        </h2>
        <div
          ref={parent}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {isLoading
            ? Array.from({ length: 8 }).map((_, index) => (
                <SeriesSkeleton key={index} />
              ))
            : filteredSeries.map((series) => (
                <div
                  key={series.id}
                  className="group bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={`${BASE_IMAGE_URL}/${series.poster_path}`}
                      alt={series.name}
                      className="w-full h-72 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white">
                        {series.name}
                      </h3>
                      <div className="flex items-center">
                        <Star className="text-yellow-400 w-5 h-5 mr-1" />
                        <span className="text-gray-300">
                          {series.vote_average?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                      {series.overview}
                    </p>
                    <button
                      onClick={() => handleFavorite(series.id)}
                      className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg font-medium transition-all ${
                        user?.favorites.includes(series.id)
                          ? 'bg-red-500/10 text-red-500 hover:bg-red-500/20'
                          : 'bg-blue-500/10 text-blue-500 hover:bg-blue-500/20'
                      }`}
                    >
                      {user?.favorites.includes(series.id) ? (
                        <>
                          <HeartOff size={18} />
                          Remover dos Favoritos
                        </>
                      ) : (
                        <>
                          <Heart size={18} />
                          Adicionar aos Favoritos
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </section>

      {/* Seção de Favoritos */}
      {user && user.favorites.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-3xl font-bold text-white mb-8">
            Suas Séries Favoritas
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {user.favorites.map((favoriteId: number) => {
              const favoriteSeries = series.find((s) => s.id === favoriteId)
              return (
                favoriteSeries && (
                  <div
                    key={favoriteSeries.id}
                    className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <img
                      src={`${BASE_IMAGE_URL}/${favoriteSeries.poster_path}`}
                      alt={favoriteSeries.name}
                      className="w-full h-72 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {favoriteSeries.name}
                      </h3>
                      <button
                        onClick={() => handleFavorite(favoriteSeries.id)}
                        className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 font-medium transition-all"
                      >
                        <HeartOff size={18} />
                        Remover dos Favoritos
                      </button>
                    </div>
                  </div>
                )
              )
            })}
          </div>
        </section>
      )}
    </div>
  )
}

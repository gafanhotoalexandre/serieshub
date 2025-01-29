import axios from 'axios'

const API_BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
})

export const getGenres = async () => {
  try {
    const response = await api.get('/genre/tv/list', {
      params: {
        language: 'pt-BR',
      },
    })
    return response.data.genres
  } catch (error) {
    console.error('Erro ao buscar gêneros:', error)
    throw error
  }
}

export const getTrendingSeries = async () => {
  try {
    const response = await api.get('/trending/tv/week', {
      params: {
        language: 'pt-BR',
      },
    })
    return response.data.results
  } catch (error) {
    console.error('Erro ao buscar séries em alta:', error)
    throw error
  }
}

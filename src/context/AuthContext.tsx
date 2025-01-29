import React, { createContext, useContext, useState, useEffect } from 'react'
import { saveToLocalStorage, getFromLocalStorage } from '../utils/localStorage' // Importa as funções de utils
import { User } from '../types'

interface AuthContextType {
  user: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = getFromLocalStorage('currentUser')
    if (storedUser) setUser(storedUser)
  }, [])

  const login = async (email: string, password: string) => {
    const users = getFromLocalStorage('users') || []
    const user = users.find(
      (u: User) => u.email === email && u.password === password
    )

    if (user) {
      setUser(user)
      saveToLocalStorage('currentUser', user)
      return true
    }
    return false
  }

  const register = async (name: string, email: string, password: string) => {
    const users = getFromLocalStorage('users') || []

    if (users.some((u: User) => u.email === email)) {
      return false
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      favorites: [],
    }

    users.push(newUser)
    saveToLocalStorage('users', users)
    setUser(newUser)
    saveToLocalStorage('currentUser', newUser)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth deve ser usado dentro do AuthProvider')
  return context
}

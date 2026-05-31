import type { LoginModel, RegisterModel } from '@/domain/models/Auth'
import apiClient from '@/infrastructure/utils/apiClient'

export async function Register(registerRequest: RegisterModel) {
  try {
    const response = await apiClient.post('/auth/register', registerRequest)

    const token = response.data.token
    const isAdmin = response.data.isAdmin

    localStorage.setItem('jwtToken', JSON.stringify(token).replace(/"/g, ''))
    localStorage.setItem('isAdmin', isAdmin)
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error)
    throw (
      error.response.data.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      "Erreur lors de l'inscription"
    )
  }
}

export async function Login(loginRequest: LoginModel) {
  try {
    const response = await apiClient.post('/auth/login', loginRequest)

    const token = response.data.token
    const isAdmin = response.data.isAdmin

    localStorage.setItem('jwtToken', JSON.stringify(token).replace(/"/g, ''))
    localStorage.setItem('isAdmin', isAdmin)
  } catch (error) {
    console.error('Erreur lors de la connexion :', error)
    throw (
      error.response.data.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la connexion'
    )
  }
}

export async function GetProfil(token: string) {
  try {
    const response = await apiClient.get('/auth/' + token)
    return response.data
  } catch (error) {
    console.error(
      "Erreur lors de l'identification de l'utilisateur conneté :",
      error,
    )
    throw (
      error.response.data.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      "Erreur lors de l'identification de l'utilisateur conneté"
    )
  }
}

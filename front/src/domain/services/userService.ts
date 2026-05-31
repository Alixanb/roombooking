import apiClient from '@/infrastructure/utils/apiClient'
import type { UserLog, UsersAdmin } from '@/domain/models/User'

export async function GetUsers() {
  try {
    const response = await apiClient.get('/user')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération des utilisateurs'
    )
  }
}

export async function UpdateUser(user: UserLog) {
  try {
    const response = await apiClient.put('/user', user)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de votre compte :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la modififcation de votre compte'
    )
  }
}

export async function DeleteUser(userId: number) {
  try {
    const response = await apiClient.delete(`/user/${userId}`)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la suppression de votre compte :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la suppression de votre compte'
    )
  }
}

export async function GetUsersAdmin(token: string) {
  try {
    const response = await apiClient.get(`/user/admin/${token}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération des utilisateurs'
    )
  }
}

export async function updateUsersAdmin(listUser: UsersAdmin[], token: string) {
  try {
    const response = await apiClient.put(`/user/admin/${token}`, listUser)
    return response.data.message
  } catch (error) {
    console.error(
      'Erreur lors de la modification des rôles des utilisateurs :',
      error,
    )
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la modififcation des rôles des utilisateurs'
    )
  }
}

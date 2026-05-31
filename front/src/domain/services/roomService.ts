import type {
  deleteRoomRequestModel,
  updateRoomRequestModel,
} from '@/domain/models/Room.ts'
import apiClient from '@/infrastructure/utils/apiClient'

export async function GetRooms() {
  try {
    const response = await apiClient.get('/room')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des salles :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération des salles'
    )
  }
}

export async function GetRoomsShort() {
  try {
    const response = await apiClient.get('/room/short')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des salles :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération des salles'
    )
  }
}

export async function GetRoomById(id: number) {
  try {
    const response = await apiClient.get(`/room/${id}`)
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération de la salle :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération de la salle'
    )
  }
}

export async function AddRoom(addRoomRequest: updateRoomRequestModel) {
  try {
    const response = await apiClient.post('/room', addRoomRequest)
    return response.data.id
  } catch (error) {
    console.error('Erreur lors de la création de la salle :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la création de la salle. Vérifier tous les champs obligatoires'
    )
  }
}

export async function UpdateRoom(updateRoomRequest: updateRoomRequestModel) {
  try {
    const response = await apiClient.put('/room', updateRoomRequest)
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la modification de la salle :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la modification de la salle'
    )
  }
}

export async function DeleteRoom(deleteRoomRequest: deleteRoomRequestModel) {
  try {
    const response = await apiClient.delete(`/room`, {
      params: {
        roomId: deleteRoomRequest.roomId,
        token: deleteRoomRequest.token,
      },
    })
    return response.data.message
  } catch (error) {
    console.error('Erreur lors de la suppression de la salle :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la suppression de la salle'
    )
  }
}

export async function GetRoomGroupe() {
  try {
    const response = await apiClient.get('/room/groupe')
    return response.data
  } catch (error) {
    console.error(
      'Erreur lors de la récupération des groupes de salle :',
      error,
    )
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération des groupes de salle'
    )
  }
}

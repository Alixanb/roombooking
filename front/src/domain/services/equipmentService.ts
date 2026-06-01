import apiClient from '@/infrastructure/utils/apiClient'
import { getErrorMessage } from '@/infrastructure/utils/errorUtils'

export async function GetAvailableEquipments() {
  try {
    const response = await apiClient.get('/equipment')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des équipement :', error)
    throw getErrorMessage(error, 'Erreur lors de la récupération des équipement')
  }
}

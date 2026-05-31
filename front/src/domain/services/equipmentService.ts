import apiClient from '@/infrastructure/utils/apiClient'

export async function GetAvailableEquipments() {
  try {
    const response = await apiClient.get('/equipment')
    return response.data
  } catch (error) {
    console.error('Erreur lors de la récupération des équipement :', error)
    throw (
      error?.response?.data?.message ||
      (error?.response?.data?.errors &&
        Object.values(error.response.data.errors).flat().join('. ')) ||
      'Erreur lors de la récupération des équipement'
    )
  }
}

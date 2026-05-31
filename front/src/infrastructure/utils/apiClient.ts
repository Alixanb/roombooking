import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_ROOM_BOOKING_API,
  headers: {
    'Content-Type': 'application/json',
  },
})

// ajout du token à la requete si user connecté
// Inutilisé (token passer directement de le corps des requetes)
// apiClient.interceptors.request.use(config => {
//   const token = localStorage.getItem('jwtToken')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

export default apiClient

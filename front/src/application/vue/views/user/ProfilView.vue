<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { GetProfil } from '@/infrastructure/auth/authService'
import { useRouter } from 'vue-router'

import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import type { UserLog } from '@/domain/models/User'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import UserUpdateForm from '@/application/vue/components/forms/UserUpdateForm.vue'
import UserDeleteForm from '@/application/vue/components/forms/UserDeleteForm.vue'

import ListeBookings from '@/application/vue/components/ListBookingsComp.vue'

const router = useRouter()

const isAdmin = localStorage.getItem('isAdmin') == 'true'
const loading = ref(true)
const user = ref<UserLog>()
const userError = ref<string>('')

onMounted(async () => {
  try {
    const token = localStorage.getItem('jwtToken')
    const response = await GetProfil(token)
    user.value = response
  } catch (error) {
    userError.value = error
    LogoutFunction()
  }
  loading.value = false
})

const LogoutFunction = () => {
  localStorage.removeItem('jwtToken')
  localStorage.removeItem('isAdmin')
  router.push('/login')
}
</script>

<template>
  <main v-if="!loading">
    <div v-if="user" class="mx-auto">
      <h1>Votre Profil</h1>

      <div class="flex flex-wrap justify-around gap-x-4 gap-y-20">
        <div class="flex flex-col gap-4 justify-start w-full max-w-md">
          <UserUpdateForm :user="user" class="mb-4" />

          <RouterLink
            v-if="isAdmin"
            to="/admin"
            class="mb-4 p-4 text-center bg-cyan-100 hover:bg-cyan-200 rounded-md"
          >
            Vue Administrateur
          </RouterLink>

          <button
            @click="LogoutFunction"
            class="p-4 bg-red-200 hover:bg-red-300 rounded-md"
          >
            Se déconnecter
          </button>

          <UserDeleteForm :userId="user.id" />
        </div>

        <ListeBookings :userId="user.id" />
      </div>
    </div>
    <div v-else>
      <ErrorMessage>{{ userError }} </ErrorMessage>
    </div>
  </main>

  <main v-else>
    <IconLoading />
  </main>
</template>

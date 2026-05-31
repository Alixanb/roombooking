<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { DeleteUser } from '@/domain/services/userService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const router = useRouter()

const props = defineProps<{
  userId: number
}>()

const loading = ref(false)
const userId = ref<number>(props.userId)
const deleteError = ref<string>('')
const deleteSucces = ref<string>('')
const timerNumber = ref<number>(5)

const deleteUserFunction = async () => {
  deleteError.value = ''
  loading.value = true

  try {
    const response = await DeleteUser(userId.value!)
    deleteSucces.value = response

    const timer = setInterval(() => {
      timerNumber.value -= 1
      if (timerNumber.value <= 0) {
        localStorage.removeItem('jwtToken')
        localStorage.removeItem('isAdmin')
        router.push('/register')
        clearInterval(timer)
      }
    }, 1000)
  } catch (error) {
    deleteError.value = error
  }

  loading.value = false
}
</script>

<template>
  <button
    v-if="deleteSucces.length == 0"
    @click="deleteUserFunction"
    class="p-4 bg-gray-900 hover:bg-gray-700 text-white rounded-md"
  >
    Supprimer mon compte
  </button>

  <IconLoading v-if="loading" />

  <div v-if="deleteSucces.length > 0">
    <SuccessMessage>
      {{ deleteSucces }}
      <br />
      Vous aller être rediriger vers la page d'accueil dans
      {{ timerNumber }} secondes.
    </SuccessMessage>
  </div>

  <div v-else-if="deleteError.length > 0">
    <ErrorMessage>{{ deleteError }}</ErrorMessage>
  </div>
</template>

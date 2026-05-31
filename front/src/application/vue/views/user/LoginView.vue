<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Login } from '@/infrastructure/auth/authService'
import type { LoginModel } from '@/domain/models/Auth'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '../../components/ErrorMessageComp.vue'

const router = useRouter()

const loginRequest = ref<LoginModel>({
  email: '',
  password: '',
})

const loading = ref<boolean>(false)
const logError = ref<string>('')

const loginFunction = async () => {
  logError.value = ''
  loading.value = true

  try {
    await Login(loginRequest.value)
    router.push('/profil')
  } catch (error) {
    logError.value = error
  }

  loading.value = false
}
</script>

<template>
  <main>
    <h1>Connexion</h1>

    <form
      @submit.prevent="loginFunction"
      class="flex flex-col w-80 mx-auto gap-4"
    >
      <div class="my-input">
        <label for="email">Votre adresse mail</label>
        <input type="email" id="email" v-model="loginRequest.email" />
      </div>

      <div class="my-input">
        <label for="password">Votre Mot de passe</label>
        <input type="password" id="password" v-model="loginRequest.password" />
      </div>

      <button
        v-if="!loading"
        type="submit"
        class="p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        Se connecter
      </button>

      <IconLoading v-else />

      <RouterLink to="/register" class="hover:text-blue-700">
        Je n'ai pas de compte
      </RouterLink>

      <div v-if="logError.length > 0">
        <ErrorMessage>
          {{ logError }}
        </ErrorMessage>
      </div>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Register } from '@/infrastructure/auth/authService'
import type { RegisterModel } from '@/domain/models/Auth'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'
import ErrorMessage from '../../components/ErrorMessageComp.vue'

const router = useRouter()

const registerRequest = ref<RegisterModel>({
  lastname: '',
  firstname: '',
  email: '',
  password: '',
  company: '',
  job: '',
})

const loading = ref<boolean>(false)
const resgiterError = ref<string>('')

const registerFunction = async () => {
  resgiterError.value = ''
  loading.value = true

  try {
    await Register(registerRequest.value)
    router.push('/profil')
  } catch (error) {
    resgiterError.value = error
  }

  loading.value = false
}
</script>

<template>
  <main>
    <h1>Inscription</h1>

    <form
      @submit.prevent="registerFunction"
      class="grid grid-cols-1 sm:grid-cols-2 max-w-xl mx-auto gap-4"
    >
      <div class="my-input">
        <label for="lastname">Nom de Famille *</label>
        <input
          type="text"
          id="lastname"
          v-model="registerRequest.lastname"
          required
        />
      </div>

      <div class="my-input">
        <label for="firstname">Prénom</label>
        <input type="text" id="firstname" v-model="registerRequest.firstname" />
      </div>

      <div class="my-input">
        <label for="email">Adresse Mail *</label>
        <input
          type="email"
          id="email"
          v-model="registerRequest.email"
          required
        />
      </div>

      <div class="my-input">
        <label for="password">Mot de passe *</label>
        <input
          type="password"
          id="password"
          v-model="registerRequest.password"
          required
        />
      </div>

      <div class="my-input">
        <label for="company">Votre Entreprise</label>
        <input type="text" id="company" v-model="registerRequest.company" />
      </div>

      <div class="my-input">
        <label for="job">Votre Poste</label>
        <input type="text" id="job" v-model="registerRequest.job" />
      </div>

      <button
        v-if="!loading"
        type="submit"
        class="col-span-full p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        S'inscrire
      </button>

      <IconLoading v-else />

      <div class="col-span-full">
        <RouterLink to="/login" class="hover:text-blue-700">
          J'ai déjà un compte
        </RouterLink>

        <div v-if="resgiterError.length > 0">
          <ErrorMessage>
            {{ resgiterError }}
          </ErrorMessage>
        </div>
      </div>
    </form>
  </main>
</template>

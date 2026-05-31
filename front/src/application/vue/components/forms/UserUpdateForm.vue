<script setup lang="ts">
import { ref } from 'vue'
import type { UserLog } from '@/domain/models/User'
import { UpdateUser } from '@/domain/services/userService'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const props = defineProps<{
  user: UserLog
}>()

const loading = ref(false)
const user = ref<UserLog>({ ...props.user })
const updateError = ref<string>('')
const updateSucces = ref<string>('')

const updateUserFunction = async () => {
  updateError.value = ''
  updateSucces.value = ''
  loading.value = true

  try {
    const response = await UpdateUser(user.value!)
    user.value!.password = ''
    updateSucces.value = response
  } catch (error) {
    updateError.value = error
  }

  loading.value = false
}
</script>

<template>
  <form
    @submit.prevent="updateUserFunction"
    class="grid grid-cols-1 sm:grid-cols-2 gap-4 h-fit w-full"
  >
    <div class="my-input">
      <label for="lastname">Nom de Famille *</label>
      <input
        type="text"
        id="lastname"
        v-model="user.lastname"
        placeholder="Votre Nom de famille *"
      />
    </div>

    <div class="my-input">
      <label for="firstname">Prénom</label>
      <input type="text" id="firstname" v-model="user.firstname" />
    </div>

    <div class="my-input">
      <label for="email">Adresse Mail</label>
      <input
        type="email"
        id="email"
        v-model="user.email"
        disabled
        class="text-gray-500 cursor-not-allowed"
      />
    </div>

    <div class="my-input">
      <label for="password">Nouveau mot de passe</label>
      <input type="password" id="password" v-model="user.password" />
    </div>

    <div class="my-input">
      <label for="company">Votre Entreprise</label>
      <input type="text" id="company" v-model="user.company" class="border" />
    </div>

    <div class="my-input">
      <label for="job">Votre Poste</label>
      <input type="text" id="job" v-model="user.job" class="border" />
    </div>

    <button
      v-if="!loading"
      type="submit"
      class="col-span-full p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
    >
      Enregistrer les modifications
    </button>

    <IconLoading v-else />

    <div v-if="updateSucces" class="col-span-full">
      <SuccessMessage>{{ updateSucces }}</SuccessMessage>
    </div>

    <div v-else-if="updateError" class="col-span-full">
      <ErrorMessage>{{ updateError }}</ErrorMessage>
    </div>
  </form>
</template>

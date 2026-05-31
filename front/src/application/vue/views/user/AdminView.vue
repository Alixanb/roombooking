<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { GetUsersAdmin, updateUsersAdmin } from '@/domain/services/userService'
import type { UsersAdmin } from '@/domain/models/User'
import ErrorMessage from '@/application/vue/components/ErrorMessageComp.vue'
import SuccessMessage from '@/application/vue/components/SuccessMessageComp.vue'
import IconLoading from '@/application/vue/components/icons/IconLoading.vue'

const token = localStorage.getItem('jwtToken')
const loading = ref(true)
const listUserOrigin = ref<UsersAdmin[]>()
const listUser = ref<UsersAdmin[]>()
const listUserFind = ref<boolean>()
const listUserSuccess = ref<string>('')
const listUserError = ref<string>('')

const updateUsersAdminFunction = async () => {
  listUserSuccess.value = ''
  listUserError.value = ''
  loading.value = true

  try {
    const response = await updateUsersAdmin(listUser.value!, token!)
    listUserSuccess.value = response
    listUserOrigin.value = JSON.parse(JSON.stringify(listUser.value))
  } catch (error) {
    listUserError.value = error
    listUser.value = JSON.parse(JSON.stringify(listUserOrigin.value))
  }

  loading.value = false
}

onMounted(async () => {
  try {
    listUserOrigin.value = await GetUsersAdmin(token!)
    listUser.value = JSON.parse(JSON.stringify(listUserOrigin.value))
    listUserFind.value = true
  } catch (error) {
    console.error('Erreur :', error)
    listUserError.value = error
  }
  loading.value = false
})
</script>

<template>
  <main class="max-w-screen-sm">
    <h1>Vue Administrateur</h1>

    <div v-if="listUserFind">
      <table class="border w-full mx-auto my-6">
        <thead class="bg-blue-50 text-left">
          <tr>
            <th scope="col" class="p-1 text-center">Id</th>
            <th scope="col" class="p-1">Nom</th>
            <th scope="col" class="p-1">Prénom</th>
            <th scope="col" class="p-1">Rôle</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in listUser" :key="user.id" class="border">
            <th class="p-1">{{ user.id }}</th>
            <td class="p-1 max-w-24 break-words">
              {{ user.lastname }}
            </td>
            <td class="p-1 max-w-24 break-words">
              {{ user.firstname }}
            </td>
            <td class="p-1">
              <select
                name="user-role"
                id="user-role"
                v-model="user.role"
                class="w-full cursor-pointer py-1 px-2 rounded"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        v-if="!loading"
        @click="updateUsersAdminFunction"
        class="sticky bottom-4 w-full p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        Mettre à jour
      </button>
    </div>

    <div v-if="loading">
      <IconLoading />
    </div>

    <div v-if="listUserSuccess" class="col-span-full">
      <SuccessMessage>{{ listUserSuccess }}</SuccessMessage>
    </div>

    <div v-if="listUserError" class="col-span-full">
      <ErrorMessage>{{ listUserError }} </ErrorMessage>
    </div>
  </main>
</template>

<script setup lang="ts">
import { Search } from 'lucide-vue-next'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchQuery = ref('')
const searchType = ref('all')

const isAuthenticated = ref(!!localStorage.getItem('jwtToken'))
watch(
  () => router.currentRoute.value.path,
  () => {
    isAuthenticated.value = !!localStorage.getItem('jwtToken')
  },
  { immediate: true },
)

const handleSearch = (e: Event) => {
  if (searchQuery.value.length > 0) {
    e.preventDefault()
    router.push({
      path: '/rooms-list',
      query: { search: searchQuery.value, type: searchType.value },
    })
    searchQuery.value = ''
  }
}
</script>

<template>
  <nav class="sticky top-0 p-4 border bg-blue-50">
    <ul class="flex flex-wrap justify-evenly items-center gap-x-2 gap-y-4">
      <li class="hover:text-blue-700">
        <RouterLink to="/rooms-list">Catalogue de Salles</RouterLink>
      </li>
      <li v-if="isAuthenticated" class="hover:text-blue-700">
        <RouterLink to="/profil">Mon Profil</RouterLink>
      </li>
      <li v-if="!isAuthenticated" class="p-2 hover:text-blue-700">
        <RouterLink to="/login">Connexion</RouterLink>
      </li>
      <li
        v-if="!isAuthenticated"
        class="bg-blue-200 p-2 rounded-sm hover:bg-blue-300"
      >
        <RouterLink to="/register">Inscription</RouterLink>
      </li>
      <li>
        <form @submit="handleSearch" class="flex gap-2">
          <div class="flex">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher une salle..."
              class="w-48 px-2 py-1 border rounded-l-md"
            />
            <select
              v-model="searchType"
              class="px-1 py-1 border rounded-r-md border-l-none"
            >
              <option value="all">Tout</option>
              <option value="name">Nom</option>
              <option value="location">Localisation</option>
              <option value="capacity">Capacité</option>
            </select>
          </div>
          <button
            type="submit"
            class="px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-md"
          >
            <Search class="size-4" />
          </button>
        </form>
      </li>
    </ul>
  </nav>
</template>

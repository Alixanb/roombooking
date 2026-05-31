<template>
  <div class="text-center">
    <h1 class="text-6xl font-bold text-red-500">Erreur 404</h1>
    <p class="text-xl my-4">Page non trouvée</p>
    <div>
      <RouterLink
        to="/profil"
        class="block w-fit mx-auto p-4 bg-blue-200 hover:bg-blue-300 rounded-md"
      >
        Retourner à mon profil
      </RouterLink>
    </div>
  </div>
</template>

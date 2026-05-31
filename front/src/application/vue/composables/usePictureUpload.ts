import { ref } from 'vue'

export function usePictureUpload() {
  const pictureFile = ref<string | null>()
  const errorPicture = ref<string>('')

  const handlePictureChange = (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]
    errorPicture.value = ''

    if (!file) return

    const maxSize = 2 * 1024 * 1024 // 2 Mo

    if (file.size > maxSize) {
      errorPicture.value = 'La photo est trop volumineuse (max 2 Mo).'
      input.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      pictureFile.value = reader.result?.toString().split(',')[1] || null
    }

    reader.readAsDataURL(file)
  }

  return {
    pictureFile,
    errorPicture,
    handlePictureChange,
  }
}

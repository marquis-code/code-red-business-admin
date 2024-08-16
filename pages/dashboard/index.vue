<template>
  <main class="space-y-10">
  </main>
</template>

<script setup lang="ts">
import { useLogin } from '@/composables/auth/login'
const { id } = useLogin()
const router = useRouter()
definePageMeta({
  layout: 'dashboard',
  middleware: ['auth']
});

onMounted(() => {
  router.push(`/dashboard/${id.value}`)
})
</script>
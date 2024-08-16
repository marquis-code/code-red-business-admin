<template>
  <div v-if="show" class="fixed inset-0 bg-white bg-opacity-100 flex justify-center items-center z-50">
    <div class="flex flex-col items-center">
      <img src="@/assets/img/logo.png" alt="Descriptive Alt Text" class="scale-in-out w-32 lg:h-60 lg:w-full" />
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter()
defineProps<{ show: boolean }>();
const emit = defineEmits(['update:show']);

const closeModal = () => {
  emit('update:show', false);
};

onMounted(() => {
  setTimeout(() => {
      emit('update:show');
      const newQuery = { page: "login" };
      router.push({ path: "/auth", query: newQuery });
    }, 5000)
  // window.addEventListener("load", () => {
  //   setTimeout(() => {
  //     emit('update:show', false);
  //     const newQuery = { page: "login" };
  //     router.push({ path: "/auth", query: newQuery });
  //   }, 3000)
  // });
})
</script>

<style>
.spinner {
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

@keyframes scaleInOut {

  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.1);
  }
}

.scale-in-out {
  animation: scaleInOut 3s ease-in-out infinite;
}
</style>

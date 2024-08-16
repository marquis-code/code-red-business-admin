<script setup lang="ts">
// import { ref, watch } from 'vue';
import { useCreateUserStory } from '@/composables/story/createById';
import { useFetchSearchInterest } from '@/composables/user/useSearchInterest';

// Debounce utility function
function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout>;
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  } as T;
}

const { payload } = useCreateUserStory();

const inputValue = ref<string>('');
const tags = ref<any[]>([]);
const showDropdown = ref<boolean>(false);
const maxTags = 5;
const errorMessage = ref<string>('');

const { fetchInterest, interestList, loading } = useFetchSearchInterest();

// Debounced fetchInterest function
const debouncedFetchInterest = debounce(fetchInterest, 300);

watch(inputValue, (newValue: any) => {
  if (newValue.trim()) {
    debouncedFetchInterest(newValue.trim());
    showDropdown.value = true;
  } else {
    showDropdown.value = false;
  }
});

const emit = defineEmits(['content']);

const selectResult = (result: any) => {
  if (tags.value.length >= maxTags) {
    useNuxtApp().$toast.error("You cannot have more than 5 tags", {
      autoClose: 5000,
      dangerouslyHTMLString: true,
    });
    return;
  }

  if (tags.value.some((tag: any) => tag.id === result.id)) {
    return;
  }

  tags.value.push(result);
  emit('content', tags);
  inputValue.value = '';
  showDropdown.value = false;
  errorMessage.value = '';
};

const selectFirstResult = () => {
  if (interestList.value.length > 0) {
    selectResult(interestList.value[0]);
  }
};

const removeTag = (index: number) => {
  tags.value.splice(index, 1);
  if (tags.value.length < maxTags) {
    errorMessage.value = '';
  }
};
</script>

<template>
    <div class="">
        <div class="mb-4 relative">
            <div class="flex justify-between items-center">
                <label for="title" class="text-xs md:text-sm font-medium">Add Tag</label>
                <div class="mb-2 text-sm text-gray-500">
                    Tags: {{ tags.length }} / {{ maxTags }}
                </div>
            </div>
            <input type="text" v-model="inputValue" @keyup.enter="selectFirstResult" :disabled="tags.length >= maxTags"
                placeholder="Search and select a tag"
                class="w-full px-3 py-3 border border-gray-300 rounded outline-none" />
            <ul v-if="showDropdown && interestList.length > 0"
                class="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 max-h-48 overflow-y-auto">
                <li v-for="(result, index) in interestList" :key="index" @click="selectResult(result)"
                    class="px-3 py-2 hover:bg-blue-200 cursor-pointer">
                    {{ result.name }}
                </li>
            </ul>
        </div>
        <div v-if="loading && !interestList.length" class="h-20 bg-slate-100 rounded"></div>
        <div v-if="!loading && !interestList.length" class="text-gray-600 text-sm font-medium">Search results not found
        </div>
        <div class="flex flex-wrap gap-2">
            <div v-for="(tag, index) in tags" :key="index"
                class="flex items-center px-2 py-2 bg-[#0BA9B9] text-white rounded-lg">
                <span class="mr-2 text-sm">{{ tag.name }}</span>
                <button type="button" @click="removeTag(index)" class="text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                        stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        </div>
        <div v-if="errorMessage" class="mt-2 text-red-500">
            {{ errorMessage }}
        </div>
    </div>
</template>

<style scoped>
/* Add custom styles if needed */
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>

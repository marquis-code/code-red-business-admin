<template>
  <main>
    <nav
      class="flex items-center justify-between border-x px-4 sm:px-3 border-gray-100 border-b rounded-b-lg p-2.5">
      <div class="-mt-px flex w-0 flex-1">
        <button @click.prevent="previousPage" :disabled="currentPage === 1"
          class="inline-flex items-center pr-1 pt-4 text-sm disabled:cursor-not-allowed disabled:opacity-50 font-medium text-gray-500  hover:text-gray-700">
          <svg class="mr-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
              clip-rule="evenodd" />
          </svg>
          Previous
        </button>
      </div>
      <div class="hidden md:-mt-px md:flex">
        <button v-for="page in pageNumbers" :key="page" @click="changePage(page)"
          :class="['px-6 py-2 rounded font-semibold', currentPage === page ? 'text-indigo-600' : 'text-gray-500']">
          {{ page }}
        </button>
      </div>
      <div class="-mt-px flex w-0 flex-1 justify-end">
        <button @click.prevent="nextPage" :disabled="currentPage === totalPages"
          class="inline-flex font-bold disabled:opacity-50 disabled:cursor-not-allowed items-center  pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700">
          Next
          <svg class="ml-3 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd"
              d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
              clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </nav>
  </main>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

interface Props {
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

const props = defineProps<Props>();
const emit = defineEmits(['page-changed']);

const currentPage = computed(() => props.page);
const totalPages = computed(() => props.pages);

const pageNumbers = computed(() => {
  const maxPagesToShow = 5;
  const halfRange = Math.floor(maxPagesToShow / 2);
  let startPage = Math.max(1, currentPage.value - halfRange);
  let endPage = Math.min(totalPages.value, currentPage.value + halfRange);

  if (currentPage.value - startPage < halfRange) {
    endPage = Math.min(totalPages.value, endPage + (halfRange - (currentPage.value - startPage)));
  }

  if (endPage - currentPage.value < halfRange) {
    startPage = Math.max(1, startPage - (halfRange - (endPage - currentPage.value)));
  }

  const pagesArray = [];
  for (let i = startPage; i <= endPage; i++) {
    pagesArray.push(i);
  }

  return pagesArray;
});

const changePage = (page: number) => {
  emit('page-changed', page);
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    changePage(currentPage.value + 1);
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    changePage(currentPage.value - 1);
  }
};
</script>
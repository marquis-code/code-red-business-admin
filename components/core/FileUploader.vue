<template>
  <div class="">
    <label>
      <img v-if="!slides.length" src="@/assets/icons/txt-file.svg" alt=""
        class="h-12 w-12 p-3 rounded-full cursor-pointer bg-gray-100" />
      <input type="file" @change="onFileChange" class="mb-4 hidden" />
    </label>

    <div v-if="isLoading" class="flex justify-center items-center h-48">
      <svg class="animate-spin h-8 w-8 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291a7.962 7.962 0 01-1.656-2.291H0c.597 2.34 2.253 4.297 4.344 5.522L6 17.291zM12 20a8 8 0 100-16v4a4 4 0 110 8v4z">
        </path>
      </svg>
    </div>

    <div v-else class="">
      <div v-if="editingIndex !== null" class="mb-4 p-4 rounded border shadow space-y-3">
        <!-- <div class="flex justify-between items-center">
          <p class="text-sm text-gray-800 font-bold">Slide {{ currentIndex }} (max. {{ character_count }} characters)
          </p>
          <p
            :class="`text-sm text-gray-800 font-bold ${editingText.length > character_count ? 'text-red-800' : editingText.length === character_count ? 'text-green-800' : ''}`">
            {{ editingText.length }}/320</p>
        </div> -->
        <div class="flex space-x-6">
          <div class="w-9/12">
            <div class="flex justify-between items-center pb-4">
              <p class="text-base text-gray-800 font-bold">Slide {{ currentIndex }} (max. {{ character_count }}
                characters)
              </p>
              <div>
                <p class="font-medium text-red-500 text-base">Editing slide {{ editingIndex + 1 }}</p>
              </div>
              <p
                :class="`text-base text-gray-800 font-bold ${editingText.length > character_count ? 'text-red-800' : editingText.length === character_count ? 'text-green-800' : ''}`">
                {{ editingText.length }}/320</p>
            </div>
            <textarea v-model="editingText" @blur="handleBlur"
              class="w-full h-[500px] border-gray-200 outline-none text-sm ring-0 leading-snug p-3 border rounded resize-none mb-2"></textarea>
            <div class="flex justify-end items-end space-x-2">
              <div class="space-x-3">
                <button @click="saveEditing" :disabled="editingText.length > character_count"
                  class="px-4 py-2 bg-green-500 disabled:cursor-not-allowed disabled:opacity-25 text-white rounded hover:bg-green-600">Save</button>
                <button @click="cancelEditing"
                  class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Cancel</button>
              </div>
            </div>
          </div>
          <div class="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
            <div class="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
            <div class="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
            <div class="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
            <div class="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
            <div class="rounded-[2rem] overflow-hidden w-[272px] h-[572px]" :style="{ backgroundColor: color }">
                <div :style="{ backgroundColor: color }"
                :class="`${!color.length ? 'border border-gray-600' : ''}`">
                <p :style="{ fontFamily: selectedFont }" class="text-preview"
                :class="`text-base leading-relaxed p-3 ${!color.length ? 'text-gray-700' : 'text-white'}`">{{ editingText
                }}</p>
            </div>
            </div>
        </div>
        </div>
      </div>

      <div v-if="previousEditingIndex !== null || editingIndex !== null"
        class="mb-4 p-4 rounded border shadow space-y-3">
        <p class="text-sm text-gray-800 font-bold">
          Previous edited slide: {{ previousIndex }} and currently editing: {{ currentIndex }}
        </p>
      </div>

      <div class="grid grid-cols-4 lg:grid-cols-12 gap-2 mt-4">
        <div v-for="(slide, slideIndex) in slides" :key="slideIndex" @click="startEditing(slideIndex)"
          :class="[slide.color, 'relative p-3 rounded shadow flex border border-gray-200 items-center justify-center cursor-pointer', { 'border-2 border-green-500': slideIndex === editingIndex }]"
          class="w-24 h-24">
          <div class="flex flex-col items-center justify-center space-y-2">
            <div class="pt-3">
              <p class="flex-1 text-[10px] text-gray-800 mt-1 leading-snug">{{ slide.text.slice(0, 30) + '...' }}</p>
            </div>
            <div>
              <button @click.stop="removeSlide(slideIndex)" type="button"
                class="absolute top-1 left-1 text-red-500 hover:text-red-700 flex justify-center items-center bg-white rounded-full shadow h-6 w-6 p-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="#d0021b" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <div class="absolute top-1 right-1">
                <p class="pb-4 text-sm font-semibold">{{ slideIndex + 1 }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2";
import mammoth from 'mammoth';
import { PDFDocument } from 'pdf-lib';
const character_count = ref(320)

const slides = ref<{ text: string; color?: string }[]>([]);
const editingIndex = ref<number | null>(null);
const previousEditingIndex = ref<number | null>(null);
const editingText = ref<string>('');
const isLoading = ref<boolean>(false);
const previousIndex = ref<number | null>(null);
const currentIndex = ref<number | null>(null);

const splitTextIntoSlides = (text: string) => {
  const trimmedText = text.trim().replace(/\s+/g, ' ');
  const chunks = [];
  for (let i = 0; i < trimmedText.length; i += 320) {
    chunks.push(trimmedText.slice(i, i + 320));
  }
  const newSlides = chunks.map(chunk => ({ text: chunk }));
  slides.value = [...slides.value, ...newSlides].slice(0, 25);
  return newSlides; // Return the newly created slides
};

const handleBlur = () => {
    saveEditing()
}

const removeSlide = (index: number) => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Delete Slide.",
    cancelButtonText: "Nah, Just kidding",
  }).then((result) => {
    if (result.value) {
      slides.value.splice(index, 1);
    } else {
      Swal.fire("Cancelled", "Action was cancelled", "info");
    }
  });
};

const startEditing = (index: number) => {
  previousEditingIndex.value = editingIndex.value !== null ? editingIndex.value : null;
  editingIndex.value = index;
  editingText.value = slides.value[index].text;
};

watch(editingIndex, (newVal: any, oldVal: any) => {
  previousIndex.value = oldVal === null ? 'N/A' : oldVal + 1
  currentIndex.value = newVal + 1
})

const saveEditing = () => {
  if (editingIndex.value !== null) {
    slides.value[editingIndex.value].text = editingText.value;
    previousEditingIndex.value = editingIndex.value; // Update previousEditingIndex on save
    editingIndex.value = null;
    editingText.value = '';
  }
};

const cancelEditing = () => {
  editingIndex.value = null;
  editingText.value = '';
};

const readDocxFile = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
};

const readPdfFile = async (file: File): Promise<string> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdfDoc = await PDFDocument.load(arrayBuffer);
  const pages = pdfDoc.getPages();
  let text = '';

  for (const page of pages) {
    const textContent = await page.getTextContent();
    text += textContent.items.map(item => item.str).join(' ') + '\n';
  }

  return text;
};

const uploadFile = async (file: File) => {
  isLoading.value = true;
  let text = '';
  if (file.type === 'application/pdf') {
    text = await readPdfFile(file);
  } else if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    text = await readDocxFile(file);
  } else if (file.type === 'text/plain') {
    text = await file.text();
  } else {
    Swal.fire('Unsupported file type', 'Please upload a DOCX, PDF, or TXT file.', 'error');
    isLoading.value = false;
    return;
  }
  splitTextIntoSlides(text);
  isLoading.value = false;
};

const emit = defineEmits(['content']);
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const file = target.files[0];
    uploadFile(file)
      .then(() => {
        emit('content', slides.value);
      })
      .catch(error => {
        console.error('Error processing file', error);
        isLoading.value = false;
      });
  }
};

defineProps({
  color: {
    type: String,
    default: ''
  },
  selectedFont: {
    type: String
  }
});
</script>

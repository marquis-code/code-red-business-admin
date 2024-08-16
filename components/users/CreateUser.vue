<template>
  <form @submit.prevent="handleCreateUser" class="mx-3 md:mx-6 py-6">
    <div class="space-y-8 bg-white px-4  rounded-2xl">
      <div class="space-y-3">
        <p class="text-gray-900 font-semibold">Profile image</p>
        <div>
          <label class="">
            <img v-if="!uploading && Object.keys(uploadResponse).length" :src="form.imageSrc" alt=""
              class="has-animation h-20 w-20 object-cover object-center border-[0.8px] border-gray-400 shadow rounded-full" />
              <div v-if="uploading && !Object.keys(uploadResponse).length"
              class="h-20 w-20 rounded-full bg-slate-100"></div>
            <img v-if="!form.imageSrc" src="@/assets/icons/dashboard/camera.svg" alt="" class="h-20 w-20" />
            <input @change="onFileChange" type="file" class="hidden" />
          </label>
        </div>
      </div>
      <div class="lg:flex space-y-3 lg:space-y-0 justify-between items-center gap-x-10">
        <div class="w-full space-y-1">
          <label class="text-xs md:text-sm font-medium">First name</label>
          <input v-model="form.fname" class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            type="text" />
        </div>
        <div class="w-full space-y-1">
          <label class="text-xs md:text-sm font-medium">Last name</label>
          <input v-model="form.lname" class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            type="text" />
        </div>
      </div>
      <div class="lg:flex space-y-3 lg:space-y-0 justify-between items-center gap-x-10">
        <div class="w-full space-y-1">
          <label class="text-xs md:text-sm font-medium">Gender </label>
          <select class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            v-model="form.gender">
            <option value="" disabled>Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div class="w-full space-y-1">
          <label class="text-xs md:text-sm font-medium">Date of Birth</label>
          <input type="date" v-model="form.dob"
            class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3" />
        </div>
      </div>
      <div class="lg:flex space-y-3 lg:space-y-0 justify-between items-center gap-x-10">
        <div class="w-full space-y-1">
          <label class="text-sm font-medium">Email</label>
          <input v-model="form.email" type="email"
            class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3" />
        </div>
        <div class="w-full space-y-1">
          <label class="text-xs md:text-sm font-medium">Handle</label>
          <input v-model="form.handle" class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3"
            type="text" />
        </div>
      </div>
      <div class="lg:flex space-y-3 lg:space-y-0 justify-between items-center gap-x-10">
        <div class="w-full space-y-1 relative">
          <label class="text-xs md:text-sm font-medium">Password</label>
          <input id="password" :type="showPassword ? 'text' : 'password'" name="password" placeholder=""
            v-model="form.password"
            class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3" />
          <img @click="showPassword = !showPassword" :src="eye" alt=""
            class="absolute cursor-pointer top-9 right-4 h-6 w-6" />
        </div>
        <div class="w-full space-y-1 relative">
          <label class="text-xs md:text-sm font-medium">Re-enter password</label>
          <input id="password" :type="showPassword ? 'text' : 'password'" name="password" placeholder=""
            v-model="form.confirmPassword"
            class="bg-gray-50 rounded-md w-full outline-none py-3 border-gray-300 border pl-3" />
          <img @click="showPassword = !showPassword" :src="eye" alt=""
            class="absolute cursor-pointer top-9 right-4 h-6 w-6" />
        </div>
      </div>
      <div>
        <h2 class="text-sm font-medium mb-4">Select Your Interests</h2>
        <div class="mb-4" v-if="!loading && interestList.length">
          <div v-for="interest in interestList" :key="interest.id" class="inline-block mr-2 mb-2">
            <button type="button" :class="[
    'px-4 py-2 rounded border text-xs',
    selectedInterests.includes(interest) ? 'bg-green-500 text-white' : 'bg-white text-black'
  ]" @click="toggleInterest(interest)">
              {{ interest.name }}
            </button>
          </div>
        </div>
        <div v-else class="h-10 bg-slate-100 rounded"></div>
        <h3 class="text-sm font-medium mb-2">Selected Interests</h3>
        <ul v-if="finalSelectedInterest.length" class="flex flex-wrap gap-2">
          <li v-for="interest in finalSelectedInterest" :key="interest.id" class="text-xs border rounded-full px-2 py-1">
            {{ interest.name }}
          </li>
        </ul>
        <p class="text-sm text-gray-600">No selected interest available</p>
      </div>
            <div class="flex justify-end items-end gap-x-3">
        <button type="reset" class="text-[#0BA9B9] border-[#0BA9B9] border px-3 py-2 rounded-lg">
          Cancel
        </button>
        <button  type="submit"
          class="bg-[#0BA9B9] disabled:cursor-not-allowed disabled:opacity-25 text-white px-6 py-2 rounded-lg">
          Create
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { useUploadImageFile } from '@/composables/files/useUploadImageFile'
const { uploadImageFile, uploadResponse, loading: uploading } = useUploadImageFile()
import { useFetchInterest } from '@/composables/user/getUserInterest'
import openEye from '@/assets/icons/eye-open.svg'
import closeEye from '@/assets/icons/eye-close.svg'
import { useCreateUser } from '@/composables/user/createUser'
const { createUser, isFormEmpty, form, genderType, processing, setPayload } = useCreateUser()
const { fetchInterest, interestList, loading, pagination } = useFetchInterest()
const showPassword = ref(false)
const showModal = ref(false)
const eye = computed(() => {
  return !showPassword.value ? closeEye : openEye;
})

// const onFileChange = (e: any) => {
//   const file = e.target.files[0];
//   if (file && file.type.startsWith("image/")) {
//     form.value.imageSrc = URL.createObjectURL(file);
//   } else {
//     form.value.imageSrc = null;
//   }
// }

const onFileChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;
    if (file && file.type.startsWith("image/")) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('fileType', 'avatar');

        uploadImageFile(formData);
        form.value.imageSrc = URL.createObjectURL(file);
    } else {
      form.value.imageSrc = null;
    }
};

const handleCreateUser = () => {
  const payload = {
    profilePicture: uploadResponse.value.url
  }
  setPayload(payload)
  createUser()
}

fetchInterest()

interface Interest {
  id: number
  name: string
}

const selectedInterests = ref<Interest[]>([])
const comparisonArray = ref<Interest[]>([])
const finalSelectedInterest = ref<Interest[]>([])

const toggleInterest = async (interest: Interest) => {
  const index = selectedInterests.value.indexOf(interest)
  if (index === -1) {
    selectedInterests.value.push(interest)
    finalSelectedInterest.value.push(interest)
    if (selectedInterests.value.length === interestList.value.length) {
      comparisonArray.value = [...selectedInterests.value]
      if (selectedInterests.value.length === comparisonArray.value.length && pagination.value.pages !== pagination.value.page) {
        selectedInterests.value = []
        comparisonArray.value = []
        pagination.value.page++
        await fetchInterest()
      }
    }
  } else {
    selectedInterests.value.splice(index, 1)
    finalSelectedInterest.value.splice(index, 1)
  }
}

</script>

<style scoped>
.has-animation {
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
</style>

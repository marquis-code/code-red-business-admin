<template>
    <main>
      <form @submit.prevent="handleCreateSponsoredAds" class="pt-6 px-6 space-y-4 max-w-md border rounded-lg">
        <div>
          <h1 class="text-lg font-medium py-0 my-0">Create Sponsored Ads</h1>
          <p class="text-sm text-gray-600 py-0 my-0">
            Enter client name, upload sponsored file, start date, end date and target link to begin
          </p>
        </div>
        <div>
          <label for="client_name" class="block text-xs font-medium leading-6 text-gray-900">Client Name</label>
          <div class="mt-1">
            <input
              type="text"
              v-model="payload.clientName"
              name="client_name"
              id="client_name"
              class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm"
            />
          </div>
        </div>
  
        <div>
          <label for="ads_image" class="block text-xs font-medium leading-6 text-gray-900">Uploaded Ads File</label>
          <div>
            <label>
              <img
                v-if="imagePreview"
                :src="imagePreview"
                alt=""
                class="has-animation h-20 w-20 object-cover object-center border-[0.8px] border-gray-400 shadow rounded-full"
              />
              <img v-else src="@/assets/icons/dashboard/camera.svg" alt="" class="h-20 w-20" />
              <input @change="onFileChange" type="file" class="hidden" />
            </label>
          </div>
          <button v-if="route.query.action === 'edit'" type="button" @click="triggerFileInput" class="mt-2 text-blue-600 underline">
            Update Image
          </button>
        </div>
  
        <div>
          <label for="target_link" class="block text-xs font-medium leading-6 text-gray-900">Target Link</label>
          <div class="mt-1">
            <input
              type="url"
              id="target_link"
              name="target_link"
              placeholder=""
              v-model="payload.targetLink"
              class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm"
            />
          </div>
        </div>
  
        <div>
          <p class="flex items-center font-semibold gap-x-2 text-gray-700 text-sm my-3">
            <img src="@/assets/icons/info.svg" alt="" />
            You would be charged 20k per day
          </p>
          <label for="start_date" class="block text-xs font-medium leading-6 text-gray-900">Start Date</label>
          <div class="mt-1">
            <input
              type="date"
              v-model="startDate"
              name="start_date"
              id="start_date"
              class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm"
            />
          </div>
        </div>
  
        <div>
          <label for="end_date" class="block text-xs font-medium leading-6 text-gray-900">End Date</label>
          <div class="mt-1">
            <input
              type="date"
              v-model="endDate"
              name="end_date"
              id="end_date"
              class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm"
            />
          </div>
        </div>
  
        <p  class="text-sm font-semibold py-0 my-0">Total Fee: {{ totalPrice.toLocaleString() }} Naira</p>
        <!-- <p  class="text-sm font-semibold py-0 my-0">{{ displayText }}</p> -->
  
        <div>
          <label for="status" class="block text-xs font-medium leading-6 text-gray-900">Status</label>
          <div class="mt-1">
            <select
              v-model="payload.status"
              class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm"
            >
              <option :value="item.code" v-for="item in statusList" :key="item.code">{{ item.name }}</option>
            </select>
          </div>
        </div>
  
        <div class="w-full py-10">
          <button
            type="submit"
            :disabled="route.query.action === 'create' ? creating : updating"
            class="disabled:opacity-25 disabled:cursor-not-allowed w-full py-3 rounded-md bg-green-600 text-white"
          >
            {{ (creating || updating) ? 'Processing' : 'Submit' }}
          </button>
        </div>
      </form>
    </main>
  </template>

<script setup lang="ts">
import { useBannerAdsPrice } from '@/composables/sponsored-ads/useBannerAdsPrice';
import { useUploadImageFile } from '@/composables/files/useUploadImageFile'
import { useCreateSponsoredAds } from '@/composables/sponsored-ads/create'
import { useUpdateSponsoredAds } from '@/composables/sponsored-ads/update'
import { useFlutterwaveSDK } from "@/composables/payment/flutterwave";


const { startDate, endDate, totalPrice, displayText } = useBannerAdsPrice();
const { createSponsoredAds, payload, loading: creating, setSponsoredAds } = useCreateSponsoredAds()
const { updateSponsoredAds, payload: updatePayload, loading: updating, setSponsoredAdsUpdate } = useUpdateSponsoredAds()
const { uploadImageFile, uploadResponse, loading: uploading } = useUploadImageFile()
const { handlePayment, paymentForm } = useFlutterwaveSDK();
const route = useRoute()
const uploadedAdsImage = ref('') as any;
const router = useRouter()

// const payNow = async () => {
//   try {
//     // Set the amount for the payment form
//     paymentForm.value.amount = totalPrice.value;
//     await handlePayment();

//     useNuxtApp().$toast.success("Your request is processed we would revert shortly.", {
//       autoClose: 5000,
//       dangerouslyHTMLString: true,
//     });

//   } catch (error) {
//     console.error("Payment or Order creation failed:", error);
//     useNuxtApp().$toast.error("Something went wrong!", {
//       autoClose: 5000,
//       dangerouslyHTMLString: true,
//     });
//   } finally {
//     processingPayment.value = false;
//   }
// };


const props = defineProps({
    ads: {
        type: Object,
        default: () => ({})
    }
})

const statusList = ref([
    {
        name: 'Active',
        code: 'active'
    }
])

definePageMeta({
    layout: 'dashboard'
})


onMounted(() => {
    if (route.query.action === 'edit') {
        payload.value.clientName = props.ads.clientName
        payload.value.imageUrl = props.ads.image
        payload.value.targetLink = props.ads.link
        payload.value.startDate = props.ads.startDate
        payload.value.endDate = props.ads.endDate
        payload.value.status = props.ads.status
        imagePreview.value = props.ads.image
    }
})

const computedFormAction = computed(() => {
    switch (route.query.action) {
        case 'edit':
            return updateSponsoredAds
        case 'create':
            return createSponsoredAds
        default:
            return createSponsoredAds
    }
})

const imagePreview = ref<string | null>(null)
const imageBase64 = ref<string | null>(null)

const handleFileChange = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
            imagePreview.value = e.target?.result as string
            imageBase64.value = (e.target?.result as string).split(',')[1]
        }
        reader.readAsDataURL(file)
    }
}

const onFileChange = (e: Event) => {
    const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
    const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];

    const target = e.target as HTMLInputElement;
    const file = target.files ? target.files[0] : null;

    if (file) {
        // Check file type
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
            useNuxtApp().$toast.error("Please upload a file in JPG, JPEG, or PNG format.", {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            imagePreview.value = null;
            return;
        }

        // Check file size
        if (file.size > MAX_FILE_SIZE) {
            useNuxtApp().$toast.error("File size exceeds the maximum limit of 2MB.", {
                autoClose: 5000,
                dangerouslyHTMLString: true,
            });
            imagePreview.value = null;
            return;
        }

        // If file is valid
        if (file.type.startsWith("image/")) {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('fileType', 'asset');

            uploadImageFile(formData);

            uploadedAdsImage.value = file;
            imagePreview.value = URL.createObjectURL(file);
        } else {
            imagePreview.value = null;
        }
    } else {
        imagePreview.value = null;
    }
};

const triggerFileInput = () => {
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
        fileInput.click();
    }
};

const emit = defineEmits(['success'])

const handleCreateSponsoredAds = async () => {
    try {
        paymentForm.value.amount = totalPrice.value;
        const paymentResult = await handlePayment();
        console.log('Payment successful:', paymentResult);
            const formData = {
        clientName: payload.value.clientName,
        imageUrl: uploadResponse.value.url,
        targetLink: payload.value.targetLink,
        startDate: payload.value.startDate,
        endDate: payload.value.endDate,
        status: payload.value.status,
    }
    setSponsoredAds(formData)
    createSponsoredAds().then(() => {
        router.push('/dashboard/ads')
    })
  } catch (error) {
    console.error('Payment failed:', error);
  }
}

const handleUpdateSponsoredAds = () => {
    const formData = {
        clientName: payload.value.clientName,
        imageUrl: uploadResponse.value.url,
        targetLink: payload.value.targetLink,
        startDate: payload.value.startDate,
        endDate: payload.value.endDate,
        status: payload.value.status,
    }
    setSponsoredAdsUpdate(formData)
    updateSponsoredAds().then(() => {
        emit('success')
    })
}
</script>

<template>
  <main>
    <div v-if="usersList.length && !loadingUsers" class="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8 p-4">
      <div v-for="(person, index) in usersList" :key="index"
        class="h-44 pt-3 relative rounded-lg bg-white shadow border-[0.6px]">
        <div class="flex items-center justify-center" :class="[
      'whitespace-nowrap py-4 pr-3 text-xs font-medium',
      selectedPeople.includes(person.email)
        ? 'text-indigo-600'
        : 'text-gray-900',
    ]">
          <DashboardImageZoom v-if="person.profilePicture" class="h-10 w-10" :src="person.profilePicture" />
          <div v-else class="h-10 w-10 rounded-full p-2 bg-gray-500 text-white flex justify-center items-center">
            {{ generateInitials(person.fname, person.lname) }}
          </div>
        </div>
        <p class="flex justify-center items-center text-sm gap-x-2">
          <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{ person.lname ?? "N/A"
            }}</nuxt-link>
          <nuxt-link class="no-underline text-gray-800" :to="`/dashboard/users/${person.id}`">{{ person.lname ?? "N/A"
            }}</nuxt-link>
        </p>
        <p class="flex justify-center items-center text-sm"> <nuxt-link class="no-underline text-gray-800"
            :to="`/dashboard/users/${person.id}`">{{ person.lname ?? "N/A"
            }}</nuxt-link></p>
        <div class="whitespace-nowrap absolute top-0 right-0 text-center py-4 pl-3 pr-4 text-xs font-medium sm:pr-3 ">
          <button @click="toggleDropdown(index)">
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none"
              stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="12" cy="5" r="1"></circle>
              <circle cx="12" cy="19" r="1"></circle>
            </svg>
          </button>
          <div v-if="openDropdownIndex === index"
            class="absolute mt-1.5 w-32 bg-white -left-14 rounded-lg shadow-xl z-10">
            <div>
              <a href="#" @click.prevent="handleEditUer(person)"
                class="flex items-center p-3 text-sm text-gray-800 font-semibold capitalize transition-colors duration-300 transform">
                <span class="mx-1"> Edit </span>
              </a>

              <a href="#" @click.prevent="handleRemoveUser(person)"
                class="flex items-center p-3 text-sm text-red-500 font-semibold capitalize transition-colors duration-300 transform">
                <span class="mx-1"> Remove </span>
              </a>

              <a href="#" @click.prevent="toggleUserStatus(person)"
                class="flex items-center p-3 text-sm text-gray-800 font-semibold capitalize transition-colors duration-300 transform">
                <span class="mx-1">
                  {{ person.isActive ? "Suspend" : "Unsuspend" }}
                </span>
              </a>
            </div>
          </div>
        </div>
        <div
          class="whitespace-nowrap absolute top-0 left-0 text-center py-4 pl-3 pr-4 text-xs font-medium sm:pr-3 px-7 sm:w-12 sm:px-6">
          <!-- <div v-if="selectedPeople.includes(person.email)" class="absolute inset-y-0 left-0 w-0.5 bg-indigo-600">
          </div> -->
          <input type="checkbox"
            class="absolute left-4 top-1/2 -mt-1 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
            :value="person.email" v-model="selectedPeople" />
        </div>
      </div>
    </div>
    <CoreBaseModal :show="openRemoveUserModal" @update:show="false">
      <section class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
        <div>
          <img src="@/assets/icons/danger.svg" class="h-20 w-20" alt="warning" />
        </div>
        <div>
          <h1 class="font-semibold text-xl">Remove user</h1>
          <p class="text-gray-500">
            Are you sure you want to remove this user? This action cannot be
            undone.
          </p>
        </div>
        <div class="flex justify-end items-end gap-x-3 w-full pt-6">
          <button @click="openRemoveUserModal = false"
            class="text-black text-xs font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
            Cancel
          </button>
          <button :disabled="processing" @click="proceedToRemove" type="button"
            class="bg-[#D92D20] disabled:cursor-not-allowed disabled:opacity-25 text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
            {{ processing ? "processing..." : "Remove" }}
          </button>
        </div>
      </section>
    </CoreBaseModal>

    <CoreBaseModal :show="updateUserStatusModal" @update:show="false">
      <section v-if="selectedStatus === 'suspend'" class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
        <h1 class="font-semibold text-xl text-gray-900 py-1">Suspend</h1>
        <div class="space-y-6">
          <div class="space-y-2 z-0">
            <label class="font-medium text-gray-800 text-sm">Suspension Category</label>
            <select class="bg-gray-50 rounded-md w-full outline-none py-3 text-sm border-gray-300 border pl-3"
              v-model="form.category">
              <option value="" disabled>Select suspension category</option>
              <option value="male">Bribery</option>
              <option value="female">Corruption</option>
            </select>
          </div>
          <div>
            <label for="Indefinately">
              <input v-model="form.isIndefinately" name="Indefinately" id="Indefinately" type="checkbox" />
              Indefinitely
            </label>
          </div>
          <div class="space-y-2 z-0" v-if="!form.isIndefinately">
            <div class="font-medium text-gray-800 text-sm">Until:</div>
            <vue-tailwind-datepicker class="outline-none ring-0" :formatter="formatter" v-model="form.date" />
          </div>
        </div>
        <div class="flex justify-end items-end gap-x-3 w-full pt-6">
          <button @click="updateUserStatusModal = false" type="button"
            class="text-[#0BA9B9] text-xs font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
            Cancel
          </button>
          <button :disabled="!isFormEmpty" @click="proceedToSuspendUser" type="button"
            class="bg-[#0BA9B9] text-sm w-full disabled:cursor-not-allowed disabled:opacity-25 text-white font-medium px-6 py-3 rounded-lg">
            Continue
          </button>
        </div>
      </section>
      <section v-if="selectedStatus === 'reactivate'" class="bg-white p-6 space-y-6 max-w-screen-lg rounded-md">
        <div>
          <img src="@/assets/icons/warning.svg" class="h-20 w-20" alt="warning" />
        </div>
        <div>
          <h1 class="font-semibold text-xl">Confirm</h1>
          <p class="text-gray-700">
            Are you sure you want to {{ selectedStatus }} this user?
          </p>
        </div>
        <div class="flex justify-end items-end gap-x-3 w-full pt-6">
          <button @click="updateUserStatusModal = false"
            class="text-black text-xs font-medium w-full border-gray-400 border px-3 py-3 rounded-lg">
            Cancel
          </button>
          <button :disabled="loading" @click="proceedToSuspendUser"
            class="bg-[#0BA9B9] disabled:opacity-25 disabled:cursor-not-allowed text-sm w-full text-white font-medium px-6 py-3 rounded-lg">
            {{ loading ? "processing..." : "Proceed" }}
          </button>
        </div>
      </section>
    </CoreBaseModal>

    <CoreSlideOver :show="showEditModal" @update:show="false" title="Edit User Information"
      description="Get started by filling in the information below to update a user">
      <template #content>
        <div class="pt-6 px-6 space-y-4">
          <div>
            <label for="first-name" class="block text-xs font-medium leading-6 text-gray-900">First Name</label>
            <div class="mt-1">
              <input type="text" v-model="payload.fname" name="first-name" id="first-name"
                class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm" />
            </div>
          </div>

          <div>
            <label for="last-name" class="block text-xs font-medium leading-6 text-gray-900">Last Name</label>
            <div class="mt-1">
              <input type="text" v-model="payload.lname" name="last-name" id="last-name"
                class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm" />
            </div>
          </div>

          <div>
            <label for="email" class="block text-xs font-medium leading-6 text-gray-900">Email</label>
            <div class="mt-1">
              <input type="email" v-model="payload.email" name="email" id="email"
                class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-xs font-medium leading-6 text-gray-900">Password</label>
            <div class="mt-1">
              <input type="password" v-model="payload.password" name="password" id="password"
                class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm" />
            </div>
          </div>

          <div>
            <label for="country-code" class="block text-xs font-medium leading-6 text-gray-900">Country Code</label>
            <div class="mt-1">
              <input type="tel" v-model="payload.countryCode" name="country-code" id="country-code"
                class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm" />
            </div>
          </div>

          <div>
            <label for="phone" class="block text-xs font-medium leading-6 text-gray-900">Phone</label>
            <div class="mt-1">
              <input type="tel" v-model="payload.phone" name="phon" id="phone"
                class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm" />
            </div>
          </div>

          <div>
            <label for="handle" class="block text-xs font-medium leading-6 text-gray-900">Handle</label>
            <div class="mt-1">
              <input type="text" v-model="payload.handle" name="handle" id="handle"
                class="block w-full rounded-md border-[0.6px] px-3 outline-none font-light py-3 text-gray-900 shadow-sm" />
            </div>
          </div>
        </div>
      </template>

      <template #actionsBtn>
        <div class="flex flex-shrink-0 justify-end px-4 py-4">
          <button type="button" @click="showEditModal = false"
            class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" :disabled="editingUser" @click="proceedToEdit"
            class="ml-4 disabled:cursor-not-allowed disabled:opacity-25 inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            {{ editingUser ? "editing..." : "Save" }}
          </button>
        </div>
      </template>
    </CoreSlideOver>
  </main>
</template>

<script setup lang="ts">
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import { useFetchUserStories } from "@/composables/user/fetchUserStories";
import { useEditUser } from "@/composables/user/editUser";
import { useRemoveUser } from "@/composables/user/removeUser";
import { useDeactivateUser } from "@/composables/user/deactivateUser";
const { deactivateUser, loading } = useDeactivateUser();
const { editUser, loading: editingUser, payload } = useEditUser();
const { removeUser, loading: processing } = useRemoveUser();
const {
  fetchUserStories,
  userStoriesList,
  loading: loadingUserStories,
} = useFetchUserStories();
const selectedPeople = ref([]) as any;
const selectedOption = ref("") as any;
const selectedUser = ref({}) as any;
const showEditModal = ref(false) as any;
const props = defineProps({
  usersList: {
    type: Array,
    default: () => [],
  },
  loadingUsers: {
    type: Boolean,
    default: false,
  },
  // searchQuery: {
  //   type: String,
  //   default: ''
  // }
});
const formatter = ref({
  date: "DD MMM YYYY",
  month: "MMM",
});

const form = ref({
  category: "",
  isIndefinately: false,
  date: [] as any,
});

const isFormEmpty = computed(() => {
  if (form.value.isIndefinately) {
    return !!(form.value.category && form.value.date);
  } else {
    return !!form.value.category;
  }
});

const handleRemoveUser = (person: any) => {
  openRemoveUserModal.value = true;
  selectedUser.value = person;
};

const handleEditUer = (user: any) => {
  showEditModal.value = true;
  selectedUser.value = user;
  payload.value = user;
};

const proceedToEdit = () => {
  editUser(selectedUser.value.id).then((data) => {
    useNuxtApp().$toast.success("User was edited successfully", {
      autoClose: 5000,
      dangerouslyHTMLString: true,
    });
    showEditModal.value = false;
  });
};

const proceedToRemove = () => {
  removeUser(selectedUser.value.id).then((data) => {
    useNuxtApp().$toast.success("User was removed successfully", {
      autoClose: 5000,
      dangerouslyHTMLString: true,
    });
    openRemoveUserModal.value = false;
  });
};

const proceedToSuspendUser = () => {
  const payload = {
    isActive: selectedUser.value.isActive ? false : true,
  };
  deactivateUser(selectedUser.value.id, payload).then((data) => {
    useNuxtApp().$toast.success("User status was updated successfully", {
      autoClose: 5000,
      dangerouslyHTMLString: true,
    });
    updateUserStatusModal.value = false;
  });
};

const selectedStatus = ref("");

const openRemoveUserModal = ref(false);
const updateUserStatusModal = ref(false);

const openDropdownIndex = ref(null);

function toggleDropdown(index: any) {
  openDropdownIndex.value = openDropdownIndex.value === index ? null : index;
}

const indeterminate = computed(() => {
  return (
    selectedPeople.value.length > 0 &&
    selectedPeople.value.length < props.usersList.length
  );
});
const toggleUserStatus = (user: any) => {
  selectedUser.value = user;
  updateUserStatusModal.value = true;
  if (user.isActive) {
    selectedStatus.value = "suspend";
  }

  if (!user.isActive) {
    selectedStatus.value = "reactivate";
  }
};

const generateInitials = (fname: string, lname: string) => {
  return `${fname.charAt(0).toUpperCase()}${lname.charAt(0).toUpperCase()}`;
};

// const getUserPods = async (user: any) => {
//   await fetchUserStories(user.id).then(() => {
//     return userStoriesList.value.length
//   })
// }
</script>

<style></style>
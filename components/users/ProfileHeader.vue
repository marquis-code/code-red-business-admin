<template>
  <div class="flex">
    <div v-if="loadingUser && !Object.keys(user).length" class="rounded-full bg-slate-500 h-16 w-16 animate-pulse">
    </div>
    <div @click="handleProfileTabSelection" v-if="user?.profilePicture && !loadingUser"
      class="lg:w-1/12 flex justify-center items-center">
      <img :src="user?.profilePicture" alt="avatar" class="h-16 w-16 rounded-full cursor-pointer" />
    </div>
    <div @click="handleProfileTabSelection" v-if="!loadingUser && user?.profilePicture === null"
      class="h-16 w-16 mr-4 rounded-full cursor-pointer bg-gray-500 text-white flex justify-center items-center">
      {{ computedInitials }}
    </div>
    <div class="w-11/12 hidden lg:block ml-14">
      <div class="bg-[#F5F5F5] rounded-xl p-3 flex justify-between items-center">
        <div v-for="(itm, idx) in userStats" :key="idx"
          :class="itm.key === route.query.page ? 'bg-gray-100 rounded-sm' : 'bg-[#F5F5F5]'"
          class="w-full border-r last:border-r-0 border-gray-300 py-2">
          <div class="flex justify-center items-center cursor-pointer" @click="setActiveTab(itm)">
            <div class="flex justify-center items-center flex-col">
              <p :class="itm.key === route.query.page ? 'text-gray-900' : 'text-gray-400'
      " class="text-xl font-bold py-0 my-0">
                {{ itm.count }}
              </p>
              <p :class="itm.key === route.query.page ? 'text-[#667085]' : 'text-gray-400'
      " class="text-sm font-medium py-0 my-0 flex items-center gap-x-3">
                {{ itm.title }}
                <img v-if="itm.title === 'Stories'" src="@/assets/icons/dashboard/stories-link.svg" alt="'" />
              </p>
            </div>
            <p class="bg-gray-300 h-12"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => { },
  },
  loadingUser: {
    type: Boolean,
    required: false,
    default: false,
  },
  userStats: {
    type: Array,
    required: true,
    default: () => [],
  },
  activeTable: {
    type: String,
    required: true
  },
  activeTab: {
    type: String,
    required: true
  }
});
const emit = defineEmits<{
  (event: "selected", state: string): void;
  (event: "profileSelected"): void;
}>();
const activeTable = ref("insights");
const setActiveTab = (state: string) => {
  emit("selected", state);
};

const computedInitials = computed(() => {
  return props?.user
    ? `${props.user.fname?.charAt(0)?.toUpperCase()} ${props.user?.lname
      ?.charAt(0)
      ?.toUpperCase()}`
    : "";
});

const handleProfileTabSelection = () => {
  emit("profileSelected");
}
</script>
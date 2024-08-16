<template>
  <main>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 p-4"
    >
      <div
        v-for="person in users"
        :key="person.email"
        class="flex justify-center items-center flex-col gap-y-3 bg-white rounded-lg border border-gray-200 py-10"
      >
        <image-zoom
          class="h-20 w-20 cursor-pointer"
          :src="require(`@/assets/icons/dashboard/${person.avatar}.svg`)"
        />
        <p class="font-bold text-lg">{{ person.fname }}</p>
        <p class="text-gray-400">{{ person.username }}</p>
      </div>
    </div>
    <!-- <remove-user-confirmation-modal
      @proceed="handleProceedRemoval"
      @close="isConfirmingRemoveUser = false"
      :isLoading="isConfirmingRemoveUser"
    />
    <remove-user-success-modal
      @close="isRemoveUserSuccess = false"
      @proceed="isRemoveUserSuccess = false"
      :isLoading="isRemoveUserSuccess"
    />
    <activate-user-confirmation-modal
      @close="isConfirmingActivateUser = false"
      @proceed="handleProceedActivation"
      :isLoading="isConfirmingActivateUser"
    />
    <activate-user-success-modal
      @close="isActivateUserSuccess = false"
      @proceed="isActivateUserSuccess = false"
      :isLoading="isActivateUserSuccess"
    />
    <user-suspend-modal
      :isLoading="isSuspendModal"
      @close="isSuspendModal = false"
      @proceedSuspension="isSuspendModal = false"
    />
    <user-suspend-confirmation
      :isLoading="isSuspendConfirmationModal"
      @close="isSuspendConfirmationModal = false"
      @proceed="handleSuspendConfirmation"
    />
    <user-suspend-success
      :isLoading="isSuspendSuccessModal"
      @close="isSuspendSuccessModal = false"
      @proceed="isSuspendSuccessModal = false"
    /> -->
  </main>
</template>

<script>
import ImageZoom from "@/components/dashboard/ImageZoom.vue";
export default {
  components: {
    ImageZoom,
  },
  props: {
    users: {
      type: Array,
      required: true,
    },
  },
  methods: {
    handleSuspendConfirmation() {
      this.isSuspendConfirmationModal = false;
      this.isSuspendSuccessModal = true;
    },
    handleFormCompletion() {
      this.isSuspendModal = false;
      this.isSuspendConfirmationModal = true;
      // this.isSuspendConfirmationModal = true;
    },
    handleTableView(itm) {
      this.tableView = itm;
    },
    updateCurrentPage(newPage) {
      this.currentPage = newPage;
    },
    toggleDropdown(rowId) {
      if (this.openDropdown === rowId) {
        this.openDropdown = null;
      } else {
        this.openDropdown = rowId;
      }
    },
    closeDropdown() {
      this.openDropdown = null;
    },
    editUser(user) {
      this.openDropdown = null;
    },
    removeUser(user) {
      this.isConfirmingRemoveUser = true;
      this.openDropdown = null;
    },
    toggleUserStatus(user) {
      if (user.isActive) {
        this.isSuspendModal = true;
      } else {
        this.isConfirmingActivateUser = true;
      }
      this.openDropdown = null;
    },
    handleProceedRemoval() {
      this.isConfirmingRemoveUser = false;
      this.isRemoveUserSuccess = true;
    },
    handleProceedActivation() {
      this.isConfirmingActivateUser = false;
      this.isActivateUserSuccess = true;
    },
    handleSearch(val) {
      console.log(val, "search val here from users");
    },
  },
};
</script>

<style>
</style>

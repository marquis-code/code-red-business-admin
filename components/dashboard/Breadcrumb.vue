<template>
  <nav class="text-gray-700">
    <ol class="flex items-center px-0 mx-0">
      <nuxt-link to="/dashboard" class="no-underline">Home</nuxt-link>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="21"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#9b9b9b"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M9 18l6-6-6-6" />
      </svg>
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        class="flex items-center"
      >
        <nuxt-link
          class="no-underline px-0 mx-0"
          :to="breadcrumb.to"
          :class="breadcrumbClass(index)"
          >{{ breadcrumb.text }}</nuxt-link
        >
        <span v-if="index < breadcrumbs.length - 1" class="mx-2"
          ><svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9b9b9b"
            stroke-width="2.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M9 18l6-6-6-6" /></svg
        ></span>
      </li>
    </ol>
  </nav>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      let paths = this.$route.path.split("/").filter((p) => p);
      return paths.map((path, index) => {
        return {
          text: path.charAt(0).toUpperCase() + path.slice(1),
          to: "/" + paths.slice(0, index + 1).join("/"),
        };
      });
    },
  },
  methods: {
    breadcrumbClass(index) {
      return {
        "text-blue-500 hover:text-blue-600":
          index < this.breadcrumbs.length - 1,
        "text-gray-500": index === this.breadcrumbs.length - 1,
      };
    },
  },
};
</script>

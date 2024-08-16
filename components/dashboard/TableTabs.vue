<template>
  <div>
    <div class="hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select
        id="tabs"
        name="tabs"
        class="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
      >
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          {{ tab.name }}
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <div class="border-b border-gray-200">
        <nav class="-mb-px flex space-x-8" aria-label="Tabs">
          <a
            v-for="tab in tabs"
            :key="tab.name"
            href="#"
            :class="[
              tab.current
                ? 'border-[#0BA9B9] text-black'
                : 'border-transparent text-gray-500 hover:border-gray-200 hover:text-gray-700',
              'flex whitespace-nowrap border-b-2 py-2 px-1 no-underline text-sm font-medium',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
            <span
              v-if="tab.count"
              :class="[
                tab.current
                  ? 'bg-[#0BA9B9] text-white'
                  : 'bg-gray-100 text-gray-900',
                'ml-3 hidden rounded-full py-0.5 px-2.5 text-xs font-medium md:inline-block',
              ]"
              >{{ tab.count }}</span
            >
          </a>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tabs: [{ name: "USER", href: "#", count: "400", current: true }],
    };
  },
};
</script>

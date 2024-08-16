<template>
    <div>
        <div class="border-b border-gray-200">
            <nav class="-mb-px flex space-x-8" aria-label="Tabs">
                <button v-for="item in breadcrumbTabs" :key="item.key" @click="handleSelectedTab(item.key)"
                    :class="[activeTable === item.key ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500']"
                    class=" whitespace-nowrap  border-b-4 py-1.5 px-1 text-sm font-medium">
                    {{ item.text }}
                </button>
            </nav>
        </div>
    </div>
</template>

<script setup lang="ts">
const activeTable = ref("insight")
// const router = useRouter()
// const route = useRoute()

const breadcrumbTabs = ref([
    {
        key: 'insight',
        text: "Insight",
    },
    {
        key: 'stories',
        text: "Pods",
    },
    {
        key: 'wallet',
        text: "Wallet & Payout",
    }
])

// onMounted(() => {
//     // emit('selected', activeTable.value)
//     // router.push({ path: route.path, query: { page: activeTable.value } })
// })

const emit = defineEmits<{
    (event: 'selected', state: string): void
}>()

const handleSelectedTab = (item: any) => {
    activeTable.value = item
    // activeTable.value = itemcommented
    // router.push({ path: route.path, query: { page: item } })
    emit('selected', item)
}
</script>
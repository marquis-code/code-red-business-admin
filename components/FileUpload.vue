<template>
    <div>
        <input type="file" @change="handleFileUpload" />
        <div v-if="fileContent">
            <h2>File Content:</h2>
            <pre>{{ fileContent }}</pre>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { readDocxFile, readPdfFile } from '@/utils/fileReader';

const fileContent = ref<string | null>(null);

async function handleFileUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const fileType = file.type;

        try {
            if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                fileContent.value = await readDocxFile(file);
            } else if (fileType === 'application/pdf') {
                fileContent.value = await readPdfFile(file);
            } else {
                fileContent.value = 'Unsupported file type';
            }
        } catch (error) {
            fileContent.value = `Error reading file: ${error.message}`;
        }
    }
}
</script>

<style scoped>
input {
    margin: 10px 0;
}

pre {
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 5px;
}
</style>
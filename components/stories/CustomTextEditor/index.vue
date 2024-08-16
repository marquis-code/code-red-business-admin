<template>
	<div class="quill-quill">
		<quill-editor
			:content="editorValue"
			:toolbar="customToolbar"
			:content-type="contentType"
			theme="snow"
			:enable="false"
			@update:content="handleUpdate"
		/>
	</div>
</template>
<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import './themes/styles.css'
import props from './props'

const propsValue = defineProps({
    ...props
})

const emit = defineEmits(['update:modelValue', 'descriptionLength'])
const editorValue = ref(propsValue.modelValue)
const customToolbar = ref(propsValue.toolbar || [])
customToolbar.value = [
    ['bold', 'italic', 'underline']
    // [{ size: ['small', false, 'large', 'huge'] }]
    // [{ align: '' }, { align: 'center' }],
    // [{ list: 'bullet' }]
]

const handleUpdate = (data: any) => {
    editorValue.value = data
    emit('update:modelValue', data)
	const regEx = /(<([^>]+)>)/ig
	const lengthOfText = data.replace(regEx, '').length
	emit('descriptionLength', lengthOfText)
}
</script>

<style scoped></style>

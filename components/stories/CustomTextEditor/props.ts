import { PropType } from 'nuxt/dist/app/compat/capi'

export default {
    modelValue: {
        type: String,
        default: ''
    },
    placeholder: {
        type: String,
        required: false,
        default: ''
    },
    content: {
        type: [String, Object] as PropType<string | Delta>,
        required: false,
        default: () => {}
    },
    contentType: {
        type: [Object, String, String] as PropType<'delta' | 'html' | 'text'>,
        required: false,
        default: 'delta'
    },
    disabled: {
        type: Boolean,
        required: false,
        default: false
    },
    toolbar: {
        type: Array,
        required: false,
        default: () => {}
    },
    readOnly: {
        type: Boolean,
        required: false,
        default: false
    },
    enable: {
        type: Boolean,
        required: false,
        default: false
    }
}

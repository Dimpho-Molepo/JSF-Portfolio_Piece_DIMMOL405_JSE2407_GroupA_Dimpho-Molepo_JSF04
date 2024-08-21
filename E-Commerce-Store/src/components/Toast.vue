<template>
  <Transition name="toast-fade">
    <div
      v-if="visible"
      :class="[
        'fixed top-4 left-1/2 transform -translate-x-1/2 z-50',
        'max-w-sm w-full shadow-lg rounded-lg pointer-events-auto',
        'flex items-center justify-between overflow-hidden',
        toastClass
      ]"
      @click="closeToast"
    >
      <div class="flex-1 p-4">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            {{ icon }}
          </div>
          <div class="ml-3 flex-1">
            <p class="text-sm font-medium">
              <slot></slot>
            </p>
          </div>
        </div>
      </div>
      <div class="flex border-l border-gray-200">
        <button
          class="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium focus:outline-none focus:ring-2"
          @click="closeToast"
        >
          Close
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed, onMounted, defineProps, defineEmits } from 'vue'
/**
 * Define the props for the toast component
 */
const props = defineProps({
  /**
   * The type of toast to display (success, error, or warning)
   * @type {String}
   * @default 'success'
   * @validator {(value) => ['success', 'error', 'warning'].includes(value)}
   */
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning'].includes(value)
  },
  /**
   * The duration of the toast in milliseconds
   * @type {Number}
   * @default 3000
   */
  duration: {
    type: Number,
    default: 3000
  }
})

/**
 * Define the events emitted by the toast component
 */
const emit = defineEmits(['closed'])

/**
 * Whether the toast is currently visible
 * @type {Boolean}
 */
const visible = ref(true)

/**
 * Compute the CSS class for the toast based on its type
 * @returns {String} The CSS class for the toast
 */
const toastClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-50 text-green-800'
    case 'error':
      return 'bg-red-50 text-red-800'
    case 'warning':
      return 'bg-yellow-50 text-yellow-800'
    default:
      return ''
  }
})

/**
 * Compute the icon to display for the toast based on its type
 * @returns {String} The icon to display for the toast
 */
const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    default:
      return '✅'
  }
})

/**
 * Start the timer to automatically close the toast after the specified duration
 */
const startTimer = () => {
  setTimeout(() => {
    visible.value = false
    emit('closed')
  }, props.duration)
}

/**
 * Close the toast manually
 */
const closeToast = () => {
  visible.value = false
  emit('closed')
}

/**
 * Start the timer when the component is mounted
 */
onMounted(() => {
  startTimer()
})
</script>

<style scoped>
.toast-fade-enter-active,
.toast-fade-leave-active {
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateY(-1rem) translateX(-50%);
}
</style>

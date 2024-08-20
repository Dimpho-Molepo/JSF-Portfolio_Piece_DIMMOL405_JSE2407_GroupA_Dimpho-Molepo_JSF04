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

const props = defineProps({
  type: {
    type: String,
    default: 'success',
    validator: (value) => ['success', 'error', 'warning'].includes(value)
  },
  duration: {
    type: Number,
    default: 3000
  }
})

const emit = defineEmits(['closed'])
const visible = ref(true)

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

const startTimer = () => {
  setTimeout(() => {
    visible.value = false
    emit('closed')
  }, props.duration)
}

const closeToast = () => {
  visible.value = false
  emit('closed')
}

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

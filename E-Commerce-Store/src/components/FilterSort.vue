<template>
  <div
    class="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 p-4 max-w-6xl mx-auto"
  >
    <div class="w-[50%] sm:w-auto">
      <select
        :value="props.selectedCategory"
        @change="$emit('update:selectedCategory', $event.target.value)"
        class="w-full sm:w-48 md:w-64 p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All Categories</option>
        <option v-for="category in props.categories" :key="category" :value="category">
          {{ category }}
        </option>
      </select>
    </div>

    <div class="w-[50%] sm:w-auto">
      <select
        :value="props.selectedSort"
        @change="$emit('update:selectedSort', $event.target.value)"
        class="w-full sm:w-48 md:w-64 p-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">Default Sorting</option>
        <option value="lowToHigh">Price: Low to High</option>
        <option value="highToLow">Price: High to Low</option>
      </select>
    </div>

    <button
      @click="$emit('reset')"
      class="w-[50%] sm:w-auto px-4 py-2 text-sm font-medium text-gray-900 bg-slate-100 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
    >
      Reset Filters
    </button>
  </div>
</template>

<script setup>
/**
 * @module FilterSort
 * @description Component for filtering and sorting products
 */

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  selectedCategory: {
    type: String,
    default: ''
  },
  selectedSort: {
    type: String,
    default: ''
  }
})

defineEmits(['update:selectedCategory', 'update:selectedSort', 'reset'])
</script>

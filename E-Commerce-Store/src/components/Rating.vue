<template>
  <div class="flex items-center">
    <div class="flex items-center">
      <span v-for="star in 5" :key="star" class="star-rating">
        <svg
          :class="['w-4 h-4', star <= roundedRating ? 'text-yellow-400' : 'text-gray-300']"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
        >
          <path
            d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"
          />
        </svg>
      </span>
    </div>
    <p class="ml-2 text-sm font-medium text-gray-500">{{ rating.toFixed(1) }} out of 5</p>
    <span v-if="showCount" class="w-1 h-1 mx-1.5 bg-gray-500 rounded-full"></span>
    <span v-if="showCount" class="text-sm font-medium text-gray-500">{{ count }} reviews</span>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Rating',
  props: {
    rating: {
      type: Number,
      required: true
    },
    count: {
      type: Number,
      default: 0
    },
    showCount: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const roundedRating = computed(() => Math.round(props.rating))

    return {
      roundedRating
    }
  }
}
</script>

<style scoped>
.star-rating {
  display: inline-block;
  transition: transform 0.2s;
}

.star-rating:hover {
  transform: scale(1.2);
}
</style>

<template>
  <div
    @click="handleClick"
    class="flex flex-col max-h-[130rem] cursor-pointer max-w-80 hover:-translate-y-1 hover:scale-105 duration-300 bg-white border border-slate-200 shadow shadow-slate-950/5 rounded-2xl overflow-hidden"
  >
    <img class="object-contain h-48 mt-3" :src="image" alt="{title}" />

    <div class="flex-1 flex flex-col p-4">
      <div class="flex-1">
        <header class="mb-2 flex-2">
          <h2 class="text-lg line-clamp-2 font-extrabold leading-snug">
            <div
              class="text-slate-600 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300"
            >
              {{ title }}
            </div>
          </h2>
        </header>
        <Rating :rating="rating.rate" :count="rating.count" />
        <div class="text-base line-clamp-2 font-extrabold text-slate-500 leading-snug">
          <h2>R{{ price }}</h2>
        </div>
      </div>

      <div class="flex mt-1 space-x-2">
        <div class="justify-start flex-1">
          <span
            class="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10"
          >
            {{ category }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Rating from '../Rating.vue'

export default {
  name: 'ProductCard',
  components: {
    Rating
  },
  props: ['id', 'title', 'image', 'price', 'category', 'description', 'rating'],
  methods: {
    handleClick() {
      this.$router.push(`/products/${this.id}`)
    }
  }
}
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { GENDER } from './StickerModal.vue'
const props = defineProps({
  name: String,
  gender: String as PropType<GENDER>,
})
</script>
<template>
  <div
    class="w-20 h-20 rounded-full cursor-pointer relative"
    :class="[{ 'sticker-boy': props.gender === 'boy' }, { 'sticker-girl': props.gender === 'girl' }]"
  >
    <div
      class="w-4/5 h-[20px] leading-5 rounded-[10px] bg-[#b08968] absolute -bottom-3 left-1/2 -translate-x-1/2 text-[#1b263b] text-sm"
    >
      {{ props.name }}
    </div>
  </div>
</template>
<style lang="scss">
.sticker-boy {
  background-image: url(../assets/sticker-boy.png);
  @apply bg-no-repeat bg-contain bg-center;
}
.sticker-girl {
  background-image: url(../assets/sticker-girl.png);
  @apply bg-no-repeat bg-contain bg-center;
}
</style>

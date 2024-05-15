<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import type { PropType } from 'vue'
import { GENDER } from './StickerModal.vue'
import GenderSticker from './GenderSticker.vue'
interface tmp {
  key: string
  name: string
  gender: string
}

const props = defineProps({
  gender: String as PropType<GENDER>,
  girlList: Array<any>,
  boyList: Array<any>,
})
const boyContainer = ref<HTMLElement>()
const girlContainer = ref<HTMLElement>()
const name = ref(localStorage.getItem('guessName') || '')

watchEffect(() => {
  switch (props.gender) {
    case GENDER.BOY:
      break
    case GENDER.GIRL:
      break
    default:
      break
  }
})
</script>
<template>
  <div class="relative w-full h-full rounded-[10px] guess-board text-center pt-9">
    <div class="font-YoungSerif text-[48px] text-[#1b263b]">He or She ?</div>
    <div class="font-CormorantGaramond font-medium text-lg">What will baby be?</div>

    <div class="w-full h-[calc(100%-140px)] flex justify-center items-center divide-x-2 mt-2">
      <div class="w-full h-full">
        <span>Boy</span>
        <div ref="boyContainer" class="grid grid-cols-3 justify-items-center">
          <GenderSticker v-if="props.gender === 'boy'" :name="name" :gender="GENDER.BOY" class="scale-50" />
          <GenderSticker
            v-for="(item, index) in props.boyList"
            :key="item.key"
            :name="item.username"
            :gender="GENDER.BOY"
            class="scale-50"
          />
        </div>
      </div>
      <div class="w-full h-full">
        <span>Girl</span>
        <div ref="girlContainer">
          <GenderSticker v-if="props.gender === 'girl'" :name="name" :gender="GENDER.GIRL" class="scale-50" />
          <GenderSticker
            v-for="(item, index) in props.girlList"
            :key="item.key"
            :name="item.username"
            :gender="GENDER.GIRL"
            class="scale-50"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.guess-board {
  background-image: url(../assets/bg-guess.png);
  @apply bg-no-repeat bg-cover bg-center;
}
</style>

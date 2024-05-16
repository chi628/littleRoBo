<script setup lang="ts">
import { GENDER } from './StickerModal.vue'
import GenderSticker from './GenderSticker.vue'
import { useGuessResultStore } from '../index'

const guessResultStore = useGuessResultStore()
</script>
<template>
  <div class="relative w-full h-full rounded-[10px] guess-board text-center pt-9">
    <div
      class="absolute left-0 right-0 -top-[30px] flex justify-around items-center text-[#1b263b] font-bold text-[28px]"
    >
      <div class="w-[60px] h-[60px] leading-[60px] rounded-full bg-[#d7b489] shadow-xl">小</div>
      <div class="w-[60px] h-[60px] leading-[60px] rounded-full bg-[#e9bfab] shadow-xl relative top-2">蘿</div>
      <div class="w-[60px] h-[60px] leading-[60px] rounded-full bg-[#d7b489] shadow-xl relative top-[5px]">蔔</div>
    </div>
    <div class="font-YoungSerif text-[48px] text-[#1b263b]">He or She ?</div>
    <div class="font-CormorantGaramond font-medium text-lg">What will baby be?</div>

    <div class="w-full h-[calc(100%-140px)] flex justify-center items-center divide-x-2 mt-2">
      <div class="w-full h-full">
        <span>Boy</span>
        <div class="grid grid-cols-3 justify-items-center">
          <GenderSticker
            v-for="result in guessResultStore.boyList"
            :key="result.key"
            :name="result.username"
            :gender="GENDER.BOY"
            class="scale-50"
          />
        </div>
      </div>
      <div class="w-full h-full">
        <span>Girl</span>
        <div class="grid grid-cols-3 justify-items-center">
          <GenderSticker
            v-for="result in guessResultStore.girlList"
            :key="result.key"
            :name="result.username"
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
  background-image: url(../assets/bg-guess.jpg);
  @apply bg-no-repeat bg-cover bg-center;
}
</style>

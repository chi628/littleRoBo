<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { GENDER } from './StickerModal.vue'
import { useUserStore } from '../index'

const userStore = useUserStore()

const isGuessBoy = ref(false)

const scratchEl = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  isGuessBoy.value = userStore.voteRes?.gender === GENDER.BOY

  if (scratchEl.value && canvas.value) {
    const width = scratchEl.value.getBoundingClientRect().width
    const height = scratchEl.value.getBoundingClientRect().height
    canvas.value.width = width
    canvas.value.height = height
    ctx = canvas.value.getContext('2d')

    const gap = Math.floor(width * 0.043)
    const _width = Math.floor((width - gap * 2) / 3)
    const radius = Math.floor(_width / 2)

    if (ctx) {
      // cols 列 直行橫列
      for (let row = 0; row < 3; row++) {
        for (let cols = 0; cols < 3; cols++) {
          const xCoord = radius + (_width + gap) * cols
          const yCoord = 6 + radius + (_width + gap) * row
          ctx.beginPath()
          ctx.arc(xCoord, yCoord, radius, 0, 2 * Math.PI)
          ctx.fillStyle = 'gray'
          ctx.fill()
        }
      }
      ctx.globalCompositeOperation = 'destination-out'

      canvas.value.addEventListener('mousemove', scratch)
      canvas.value.addEventListener('touchmove', scratch)
      canvas.value.addEventListener('mousedown', startScratch)
      canvas.value.addEventListener('touchstart', startScratch)
      canvas.value.addEventListener('mouseup', endScratch)
      canvas.value.addEventListener('touchend', endScratch)
    }
  }
})

const scratch = (e: MouseEvent | TouchEvent) => {
  if (ctx) {
    const bounds = canvas.value!.getBoundingClientRect()
    const x = (e instanceof MouseEvent ? e.clientX : e.touches[0].clientX) - bounds.left
    const y = (e instanceof MouseEvent ? e.clientY : e.touches[0].clientY) - bounds.top
    ctx.beginPath()
    ctx.arc(x, y, 8, 0, Math.PI * 2)
    ctx.fill()
  }
}

const startScratch = () => {
  if (ctx) {
    ctx.globalCompositeOperation = 'destination-out'
  }
}

const endScratch = () => {
  if (ctx) {
    ctx.globalCompositeOperation = 'source-over'
  }
}
</script>
<template>
  <div class="w-full aspect-[7/10] relative" :class="[isGuessBoy ? 'ans-boy' : 'ans-girl']">
    <div
      class="absolute left-0 right-0 -top-[30px] flex justify-around items-center text-[#1b263b] font-bold text-[28px] text-center"
    >
      <div class="w-[60px] h-[60px] leading-[60px] rounded-full bg-[#d7b489] shadow-xl">小</div>
      <div class="w-[60px] h-[60px] leading-[60px] rounded-full bg-[#e9bfab] shadow-xl relative -top-2">蘿</div>
      <div class="w-[60px] h-[60px] leading-[60px] rounded-full bg-[#d7b489] shadow-xl relative -top-[5px]">蔔</div>
    </div>
    <div ref="scratchEl" class="absolute w-1/2 h-[38%] top-[46%] left-1/2 -translate-x-[52%]">
      <canvas ref="canvas" width="100%" height="100%"></canvas>
    </div>
    <span
      class="bg-[#fe9b00] rounded-[19px] absolute -bottom-[10px] px-3 leading-6 text-white text-sm left-1/2 -translate-x-1/2"
    >
      小提醒：連線成功，代表你答對囉
    </span>
  </div>
</template>

<style lang="scss">
.ans-boy {
  background-image: url(@/assets/ans-boy.jpg);
  @apply bg-no-repeat bg-contain bg-center;
}
.ans-girl {
  background-image: url(@/assets/ans-girl.jpg);
  @apply bg-no-repeat bg-contain bg-center;
}
</style>

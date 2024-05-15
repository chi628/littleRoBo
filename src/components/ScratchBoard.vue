<script setup lang="ts">
import { onMounted, ref, type PropType } from 'vue'
import type { GENDER } from './StickerModal.vue'

const props = defineProps({
  gender: String as PropType<GENDER>,
})

const scratchEl = ref<HTMLDivElement>()
const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D | null = null

onMounted(() => {
  if (scratchEl.value && canvas.value) {
    const width = scratchEl.value.getBoundingClientRect().width
    const height = scratchEl.value.getBoundingClientRect().height
    canvas.value.width = width
    canvas.value.height = height
    ctx = canvas.value.getContext('2d')

    const gap = Math.floor(width * 0.043)
    const _width = Math.floor((width - gap * 2) / 3)
    const radius = Math.floor(_width / 2)

    console.log('gap', gap, width, _width)

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
  <div
    class="w-full aspect-[7/10] relative"
    :class="[{ 'ans-girl': props.gender === 'girl' }, { 'ans-boy': props.gender === 'boy' }]"
  >
    <div ref="scratchEl" class="absolute w-1/2 h-[38%] top-[46%] left-1/2 -translate-x-[52%]">
      <canvas ref="canvas" width="100%" height="100%"></canvas>
    </div>
  </div>
</template>

<style lang="scss">
.ans-boy {
  background-image: url(@/assets/ans-boy.png);
  @apply bg-no-repeat bg-contain bg-center;
}
.ans-girl {
  background-image: url(@/assets/ans-girl.png);
  @apply bg-no-repeat bg-contain bg-center;
}
</style>

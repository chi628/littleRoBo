<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import GuessBoard from './components/GuessBoard.vue'
import StickerModal from './components/StickerModal.vue'
import ScratchBoard from './components/ScratchBoard.vue'
import { GENDER } from './components/StickerModal.vue'
import { readData } from './firebase'
import { useGuessList } from './index'

const guessGender = ref<GENDER>()
const showVoteModal = ref(false)
const showVoteBtn = ref(true)
const showResultBtn = ref(false)
const showResultView = ref(false)
const boyList = ref<{ key: string; name: string; gender: string }[]>()
const girlList = ref<{ key: string; name: string; gender: string }[]>()
const hasGuess = ref(false)
const guessName = ref(localStorage.getItem('guessName') || '')
onMounted(async () => {
  const res = await readData()

  boyList.value = res.boyList
  girlList.value = res.girlList

  const guessBoy = res.boyList.filter(o => o.username === guessName.value)
  const guessGirl = res.girlList.filter(o => o.username === guessName.value)

  hasGuess.value = guessBoy.length > 0 || guessGirl.length > 0

  if (hasGuess.value) {
    showVoteBtn.value = false
    showResultBtn.value = true
    if (guessBoy.length > 0) {
      guessGender.value = GENDER.BOY
    } else {
      guessGender.value = GENDER.GIRL
    }
  }
})
</script>

<template>
  <div
    class="w-full max-w-[480px] h-full max-h-[864px] mx-auto flex flex-col justify-center items-center overflow-hidden"
  >
    <div v-if="!showResultView" class="w-[95%] h-[90%] relative">
      <GuessBoard :gender="guessGender" :boyList="boyList" :girlList="girlList" />
      <div class="absolute -bottom-[19px] left-1/2 -translate-x-1/2">
        <button
          v-show="showVoteBtn"
          class="w-[130px] h-[38px] leading-[38px] rounded-[19px] text-white text-center bg-[#b5838d]"
          @click="
            () => {
              showVoteModal = true
              showVoteBtn = false
            }
          "
        >
          我要投票
        </button>
        <button
          v-show="showResultBtn"
          class="w-[130px] h-[38px] leading-[38px] rounded-[19px] text-white text-center bg-[#b5838d]"
          @click="
            () => {
              showResultBtn = false
              showResultView = true
            }
          "
        >
          查看結果
        </button>
      </div>
    </div>
    <StickerModal v-if="showVoteModal" @gender="(g:GENDER) => {guessGender = g; showResultBtn = true}" />
    <ScratchBoard v-if="showResultView" :gender="guessGender" />

    <!-- <a href='https://zh.pngtree.com/freebackground/light-pink-geometric-color-block-plant-line-background_1280233.html'>免費的背景照片來自 zh.pngtree.com/</a> -->
    <!-- <a href="https://www.flaticon.com/free-icons/close" title="close icons">Close icons created by inkubators - Flaticon</a> -->
    <!-- <a href="https://www.flaticon.com/free-icons/next" title="next icons">Next icons created by th studio - Flaticon</a> -->
  </div>
</template>

<style lang="scss">
.gender-guess {
  &-bg {
    background-image: url('@/assets/bg-guess.png');
    @apply bg-no-repeat bg-cover bg-center;
  }

  &-title {
    font-family: 'Young Serif', serif;
    font-weight: 400;
    font-style: normal;
    font-size: 48px;
    color: #1b263b;
  }
  &-subtitle {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 600;
    font-style: normal;
  }
}
.button {
  @apply w-[130px] h-[38px] leading-[38px] rounded-[19px];
  @apply bg-[#b5838d] text-white text-center text-center;
}
.sticker-boy {
  background-image: url(./assets/sticker-boy.png);
  @apply bg-no-repeat bg-contain bg-center;
}
.sticker-girl {
  background-image: url(./assets/sticker-girl.png);
  @apply bg-no-repeat bg-cover bg-center;
}
.tmp-title {
  font-family: 'Noto Sans TC', sans-serif;
  font-optical-sizing: auto;
  font-weight: 600;
  font-style: normal;
  font-size: 28px;
  color: #1d3557;
}
.answer-bg {
  background-image: url(@/assets/answer-bg.png);
  @apply bg-no-repeat bg-contain bg-center;
}
.ans-boy {
  background-image: url(@/assets/ans-boy.png);
  @apply bg-no-repeat bg-contain bg-center;
}
.ans-girl {
  background-image: url(@/assets/ans-girl.png);
  @apply bg-no-repeat bg-contain bg-center;
}
h1 {
  font-family: 'NotoSansTC';
}
</style>

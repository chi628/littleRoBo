<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import GuessBoard from './components/GuessBoard.vue'
import StickerModal from './components/StickerModal.vue'
import ScratchBoard from './components/ScratchBoard.vue'
import { readData } from './firebase'
import { useGuessResultStore, useUserStore } from './index'

const guessResultStore = useGuessResultStore()
const userStore = useUserStore()

const showVoteModal = ref(false)
const showResultView = ref(false)
const isFetching = ref(false)

const showVoteBtn = computed(() => !userStore.hasVote)

onMounted(async () => {
  userStore.name = localStorage.getItem('guessName') || ''
  getVoteResult()
})

const getVoteResult = async () => {
  if (isFetching.value) {
    return
  }
  isFetching.value = true

  const res = await readData()

  if (res) {
    if (Object.values(res).filter(o => o.username === userStore.name).length > 0) {
      userStore.hasVote = true
      userStore.voteRes = Object.values(res).filter(o => o.username === userStore.name)[0]
    }

    guessResultStore.boyList = Object.keys(res)
      .map(key => {
        return { key, ...res[key] }
      })
      .filter(o => o.gender === 'boy')

    guessResultStore.girlList = Object.keys(res)
      .map(key => {
        return { key, ...res[key] }
      })
      .filter(o => o.gender === 'girl')
  }

  isFetching.value = false
}
</script>

<template>
  <div
    class="w-full max-w-[480px] h-full max-h-[864px] mx-auto flex flex-col justify-center items-center overflow-hidden"
  >
    <template v-if="isFetching">
      <div
        class="w-full h-full flex flex-col justify-center items-center space-y-3 text-[#6c584c] font-bold text-[32px]"
      >
        <p class="font-Outfit">I am RoBo</p>
        <p class="font-NotoSansTC">我是小蘿蔔</p>
      </div>
    </template>
    <template v-else>
      <div v-if="!showResultView" class="w-[95%] h-[90%] relative z-10">
        <GuessBoard />
        <div class="absolute -bottom-[19px] left-1/2 -translate-x-1/2">
          <button
            v-if="showVoteBtn"
            class="w-[130px] h-[38px] leading-[38px] rounded-[19px] text-white text-center bg-[#b5838d]"
            @click="
              () => {
                showVoteModal = true
              }
            "
          >
            我要投票
          </button>
          <button
            v-else
            class="w-[130px] h-[38px] leading-[38px] rounded-[19px] text-white text-center bg-[#b5838d]"
            @click="
              () => {
                showResultView = true
              }
            "
          >
            查看結果
          </button>
        </div>
      </div>
      <StickerModal
        :show="showVoteModal"
        @close="
          () => {
            showVoteModal = false
          }
        "
      />
      <ScratchBoard v-if="showResultView" />
    </template>

    <div class="text-xs scale-50 fixed bottom-0">
      <a
        href="https://zh.pngtree.com/freebackground/light-pink-geometric-color-block-plant-line-background_1280233.html"
        >免費的背景照片來自 zh.pngtree.com/</a
      >
      |
      <a href="https://www.flaticon.com/free-icons/close" title="close icons"
        >Close icons created by inkubators - Flaticon</a
      >
      |
      <a href="https://www.flaticon.com/free-icons/next" title="next icons"
        >Next icons created by th studio - Flaticon</a
      >
    </div>
  </div>
</template>

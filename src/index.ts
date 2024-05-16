import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { GenderList, VoteInfo } from './type/index'

export const useGuessResultStore = defineStore('guessResult', () => {
  const boyList = ref<GenderList[]>()
  const girlList = ref<GenderList[]>()

  return {
    boyList,
    girlList,
  }
})

export const useUserStore = defineStore('userInfo', () => {
  const name = ref('')
  const hasVote = ref(false)
  const voteRes = ref<VoteInfo>()

  return {
    name,
    hasVote,
    voteRes,
  }
})

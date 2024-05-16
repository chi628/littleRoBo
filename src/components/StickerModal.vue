<script lang="ts">
export enum GENDER {
  BOY = 'boy',
  GIRL = 'girl',
}
</script>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import GenderSticker from './GenderSticker.vue'
import { generateUserId, writeUserData } from '../firebase'
import { useUserStore, useGuessResultStore } from '../index'

const props = defineProps({
  show: Boolean,
})

const emit = defineEmits(['close'])

enum STEP {
  INPUT_NAME,
  VOTE,
}

const guessResultStore = useGuessResultStore()
const userStore = useUserStore()

const step = ref<STEP>(STEP.INPUT_NAME)
const showNameHint = ref(false)
const showSecondStep = ref(false)

onMounted(() => {
  if (userStore.name !== '') {
    step.value = STEP.VOTE
    showSecondStep.value = true
  }
})

const onInputKeyup = (event: KeyboardEvent) => {
  if (event.keyCode === 13) {
    nextStep()
  }
}

const nextStep = () => {
  if (userStore.name.length > 0) {
    step.value = STEP.VOTE
    localStorage.setItem('guessName', userStore.name)
  } else {
    showNameHint.value = true
  }
}

const onLeave = () => {
  if (step.value === STEP.VOTE) {
    showSecondStep.value = true
  }
}

const chooseGender = (gender: GENDER) => {
  const userId = generateUserId(userStore.name)
  writeUserData(userId, userStore.name, gender)

  switch (gender) {
    case GENDER.BOY:
      guessResultStore.boyList?.unshift({
        key: userId,
        username: userStore.name,
        gender,
      })
      break
    case GENDER.GIRL:
      guessResultStore.girlList?.unshift({
        key: userId,
        username: userStore.name,
        gender,
      })
      break
    default:
      break
  }

  userStore.hasVote = true
  userStore.voteRes = {
    username: userStore.name,
    gender,
  }
  closeModal()
}

const closeModal = () => {
  emit('close')
}
</script>
<template>
  <Transition>
    <div
      v-if="props.show"
      class="w-full max-w-[480px] h-[200px] rounded-t-[19px] fixed bottom-0 bg-[#d6ccc2] flex flex-col justify-center items-center overflow-hidden z-20"
    >
      <div class="icon-close absolute top-4 right-6 w-6 h-6" @click="closeModal"></div>
      <div class="w-[80%] h-[150px]">
        <Transition @after-leave="onLeave" name="input-name">
          <div v-if="step === STEP.INPUT_NAME" class="h-full space-y-2">
            <p class="font-NotoSansTC font-bold text-lg">請輸入您的名字</p>
            <div class="flex items-center space-x-4">
              <input
                v-model="userStore.name"
                @keyup="onInputKeyup"
                type="text"
                class="w-[80%] h-[38px] rounded-[10px] border border-solid border-[#d6ccc2] focus:outline-none px-2"
              />
              <div class="icon-next w-6 h-6" @click="nextStep"></div>
            </div>
            <p v-show="showNameHint" class="font-NotoSansTC text-xs font-bold text-[#a4161a] text-center">
              請至少輸入一個字!!
            </p>
          </div>
        </Transition>
        <Transition name="vote">
          <div v-if="showSecondStep" class="h-full text-center space-y-3">
            <p class="text-[#1b263b] font-bold font-NotoSansTC">按下猜測的性別，就完成投票囉</p>
            <div class="flex justify-center items-center space-x-6">
              <div @click="chooseGender(GENDER.BOY)">
                <span class="text-lg text-[#1b263b] font-bold">Boy</span>
                <GenderSticker :name="userStore.name" :gender="GENDER.BOY" />
              </div>
              <div @click="chooseGender(GENDER.GIRL)">
                <span class="text-lg text-[#1b263b] font-bold">Girl</span>
                <GenderSticker :name="userStore.name" :gender="GENDER.GIRL" />
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </Transition>
</template>
<style lang="scss">
@keyframes show-up {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0);
  }
}
.v-enter-active {
  animation: show-up 0.5s;
}
.v-leave-active {
  animation: show-up 0.5s reverse;
}
@keyframes slide-off {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}
.input-name-leave-active {
  animation: slide-off 0.5s;
}

@keyframes spot {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.vote-enter-active {
  animation: spot 0.3s;
}
.icon-close {
  background-image: url(../assets/close.png);
  @apply bg-no-repeat bg-contain bg-center;
}
.icon-next {
  background-image: url(../assets/right.png);
  @apply bg-no-repeat bg-contain bg-center;
}
</style>

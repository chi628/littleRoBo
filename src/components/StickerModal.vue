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

enum STEP {
  INPUT_NAME,
  VOTE,
}

const isShow = ref(false)
const step = ref<STEP>(STEP.INPUT_NAME)
const name = ref('')
const showNameHint = ref(false)
const showFirstStep = ref(true)
const showSecondStep = ref(false)
const emit = defineEmits(['gender'])

onMounted(() => {
  isShow.value = true
  name.value = localStorage.getItem('guessName') || ''
  if (name.value) {
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
  if (name.value.length > 0) {
    step.value = STEP.VOTE
    localStorage.setItem('guessName', name.value)
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
  emit('gender', gender)
  isShow.value = false
  const userId = generateUserId(name.value)
  writeUserData(userId, name.value, gender)
}
</script>
<template>
  <Transition>
    <div
      v-if="isShow"
      class="w-full max-w-[480px] h-[200px] rounded-t-[19px] fixed bottom-0 bg-[#d6ccc2] flex flex-col justify-center items-center overflow-hidden"
    >
      <div class="icon-close absolute top-4 right-6 w-6 h-6" @click="isShow = false"></div>
      <div class="w-[80%] h-[150px]">
        <Transition @after-leave="onLeave" name="input-name">
          <div v-if="step === STEP.INPUT_NAME" class="h-full space-y-2">
            <p class="font-NotoSansTC font-bold text-lg">請輸入您的名字</p>
            <div class="flex items-center space-x-4">
              <input
                v-model="name"
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
            <p class="text-[#1b263b] font-bold font-NotoSansTC">按下猜測的性別，就可以投票囉</p>
            <div class="flex justify-center items-center space-x-6">
              <div @click="chooseGender(GENDER.BOY)">
                <span class="text-lg text-[#1b263b] font-bold">Boy</span>
                <GenderSticker :name="name" :gender="GENDER.BOY" />
              </div>
              <div @click="chooseGender(GENDER.GIRL)">
                <span class="text-lg text-[#1b263b] font-bold">Girl</span>
                <GenderSticker :name="name" :gender="GENDER.GIRL" />
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

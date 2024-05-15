import { computed, ref } from 'vue'

interface tmp {
  name: string
  gender: string
}

export const useGuessList = () => {
  const list = ref<tmp[]>([])

  const newList = computed(() => list.value)

  const updateList = (l: tmp[]) => {
    list.value = l
    console.log('update', l, newList.value, list.value)
  }

  return {
    list,
    newList,
    updateList,
  }
}

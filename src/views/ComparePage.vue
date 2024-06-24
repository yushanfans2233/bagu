<template>
  <div>
    <textarea v-model="text1"></textarea>
    <textarea v-model="text2"></textarea>
    <div v-if="isSame">Same</div>
    <div v-else>Different</div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const text1 = ref('')
    const text2 = ref('')

    const isSame = computed(() => text1.value === text2.value)

    return {
      text1,
      text2,
      isSame
    }
  }
}
</script>
<template>
  <ul>
    <li v-for="(item, index) in exercises" :key="index">
      <TemplatePanel :template="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useExerciseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import TemplatePanel from '@/components/TemplatePanel.vue'

const store = useExerciseStore()
var { exercises } = storeToRefs(store)


</script>

<style scoped>
ul {
  max-width: 800px;
  margin: 0 auto;
}

li {
  display: block;
  margin: 10px;
}
</style>

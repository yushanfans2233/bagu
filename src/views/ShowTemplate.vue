<template>
  <ul>
    <li v-for="(item, index) in templates" :key="index">
      <TemplatePanel :template="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
import TemplatePanel from '@/components/TemplatePanel.vue'
import { storeToRefs } from 'pinia'
import { useTemplateStore } from '@/stores'

const store = useTemplateStore()
var { templates } = storeToRefs(store)


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

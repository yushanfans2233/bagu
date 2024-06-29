<template>
    <div class="card flex justify-center">
        <label for="title">标题: </label>
        <br>
        <InputText id="title" v-model="titleValue" rows="1" :invalid="titleValue ===''"  />
    </div>

    <div class="card flex justify-center">
        <label for="content">内容: </label>
        <br>
        <Textarea id="content" v-model="contentValue" rows="5" cols="100" :invalid="contentValue ===''"  />
    </div>
    <div class="card flex justify-center">
        <Button label="保存" @click="save"/>
    </div>

</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplateStore } from '@/stores'


const router = useRouter()

const store = useTemplateStore()
const titleValue = ref('')
const contentValue = ref('')

const save = () => {
  if (titleValue.value.length < 1) {
    alert('标题长度必须大于 1')
    return
  }

  if (contentValue.value.length < 8) {
    alert('内容长度必须大于 8')
    return
  }

  store.addTemplate(titleValue.value, contentValue.value)
  alert('保存成功')
  router.push('/')
}

</script>
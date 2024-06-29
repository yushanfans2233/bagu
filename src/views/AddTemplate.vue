<template>
  <div class="card flex justify-center">
    <label for="title">标题: </label>
    <br>
    <InputText id="title" v-model="titleValue" rows="1" :invalid="titleValue === ''" />
  </div>

  <div class="card flex justify-center">
    <label for="content">内容: </label>
    <br>
    <Textarea id="content" v-model="contentValue" rows="5" cols="100" :invalid="contentValue === ''" />
  </div>
  <div class="card flex justify-center">
    <Toast />
    <div class="flex flex-wrap gap-2">
      <Button label="保存" @click="save" />
    </div>
  </div>

</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Toast from 'primevue/toast'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useTemplateStore } from '@/stores'
import { useToast } from 'primevue/usetoast'


const router = useRouter()

const store = useTemplateStore()

const titleValue = ref('')
const contentValue = ref('')

const toast = useToast()
const showSuccess = (message: string, content: string) => {
  toast.add({ severity: 'success', summary: message, detail: content, life: 3000 })
}

const showError = (message: string, content: string) => {
  toast.add({ severity: 'error', summary: message, detail: content, life: 3000 })
}

const save = () => {
  if (titleValue.value.length < 1) {
    showError('标题', '标题不能为空')
    return
  }

  if (contentValue.value.length < 1) {
    showError('内容', '内容不能为空')
    return
  }

  store.addTemplate(titleValue.value, contentValue.value)

  showSuccess('模板', '添加成功')
  setTimeout(() => {
    router.push('/')
  }, 1000)
}


</script>
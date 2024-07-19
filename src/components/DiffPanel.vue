<template>
  <div class="w-full h-full rounded-md shadow-md" ref="container"></div>
</template>

<script setup lang="ts">
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { onMounted, ref, watch } from 'vue'

interface Props {
  left: string,
  right: string
}

const props = defineProps<Props>()

self.MonacoEnvironment = {
  getWorker: () => new EditorWorker()
}

const container = ref<HTMLDivElement>()

onMounted(async () => {
  if (!container.value) {
    throw new Error('cannot find container')
  }

  const { editor } = await import('monaco-editor')

  editor.defineTheme('custom-diff-theme', {
    base: 'vs',
    inherit: true,
    rules: [],
    colors: {
      'diffEditor.insertedLineBackground': '#f0fdfa',
      'diffEditor.insertedTextBackground': '#22c55e',
      'diffEditor.removedLineBackground': '#fff1f2',
      'diffEditor.removedTextBackground': '#fca5a5',
    },
  })

  const leftModel = editor.createModel(props.left, 'text/plain')
  const rightModel = editor.createModel(props.right, 'text/plain')

  const diffEditor = editor.createDiffEditor(container.value, {
    readOnly: true,
    wordWrap: 'on',
    automaticLayout: true,
    theme: 'custom-diff-theme',
    minimap: { enabled: false },
  })

  diffEditor.setModel({
    original: leftModel,
    modified: rightModel,
  })

  watch([() => props.left, () => props.right], () => {
    leftModel.setValue(props.left)
    rightModel.setValue(props.right)
  })
})
</script>

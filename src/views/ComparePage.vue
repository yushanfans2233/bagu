<template>
  <div class="monaco-editor-container">
    <h1>文本1</h1>
    <div ref="originalEditorContainer" class="monaco-editor"></div>
    <h1>文本2</h1>
    <div ref="modifiedEditorContainer" class="monaco-editor"></div>
    <h1>对比</h1>
    <div ref="diffEditorContainer" class="monaco-editor"></div>
  </div>
</template>

<script setup>
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import {onMounted, ref, watch} from 'vue';

const originalText = ref('');
const modifiedText = ref('');

const originalEditorContainer = ref(null);
const modifiedEditorContainer = ref(null);
const diffEditorContainer = ref(null);

let originalEditor, modifiedEditor, diffEditor;

onMounted(() => {
  originalEditor = monaco.editor.create(originalEditorContainer.value, {
    value: originalText.value,
    language: 'text',
    theme: 'vs-dark',
    minimap: {enabled: false},
  });

  modifiedEditor = monaco.editor.create(modifiedEditorContainer.value, {
    value: modifiedText.value,
    language: 'text',
    theme: 'vs-dark',
    minimap: {enabled: false},
  });

  diffEditor = monaco.editor.createDiffEditor(diffEditorContainer.value, {
    enableSplitViewResizing: false,
    readOnly: true,
    theme: 'vs-dark',
    minimap: {enabled: false},
  });

  originalEditor.onDidChangeModelContent(() => {
    updateDiff();
  });

  modifiedEditor.onDidChangeModelContent(() => {
    updateDiff();
  });
});

watch([originalText, modifiedText], () => {
  updateDiff();
});

function updateDiff() {
  const originalModel = monaco.editor.createModel(originalEditor.getValue(), 'text/plain');
  const modifiedModel = monaco.editor.createModel(modifiedEditor.getValue(), 'text/plain');

  diffEditor.setModel({
    original: originalModel,
    modified: modifiedModel,
  });
}
</script>

<style scoped>
.monaco-editor-container {
  display: flex;
  flex-direction: column;
  height: 600px;
  width: 1200px;
}

.monaco-editor {
  flex: 1;
}
</style>
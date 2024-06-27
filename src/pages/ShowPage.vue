<template>
  <div class="container">
    <div class="left-nav">
      <!-- 左侧导航栏内容 -->
      <ul>
        <li><a href="#">导航项1</a></li>
        <li><a href="#">导航项2</a></li>
        <li><a href="#">导航项3</a></li>
      </ul>
    </div>
    <div class="right-content">
      <!-- 右侧内容栏内容 -->
      <div class="card-container">
        <div class="card-grid">
          <div class="card" v-for="(item, index) in exercises" :key="index">
            <p>{{ item.id }}</p>
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </div>
          <div class="card add-card" @click="add">
            <i class="fas fa-plus"></i>
            <p>添加卡片</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useExerciseStore } from '@/stores'
import { storeToRefs } from 'pinia'
import { Exercise } from '@/stores/modules/exercise/types'
import { nanoid } from 'nanoid'


const store = useExerciseStore()
var { exercises } = storeToRefs(store)

const add = () => {
  store.addExercise(new Exercise(nanoid(), '新卡片', '新卡片内容'))

}

</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.left-nav {
  width: 200px;
  background-color: #f1f1f1;
  padding: 20px;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  overflow-y: auto;
}

.right-content {
  width: calc(100% - 200px);
  padding: 20px;
  margin-left: 200px;
}

.card-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px;
  max-width: 1200px;
  width: 100%;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.add-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: #888;
}

.add-card i {
  font-size: 24px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
}

a {
  color: #333;
  text-decoration: none;
  font-size: xx-large;
}
</style>

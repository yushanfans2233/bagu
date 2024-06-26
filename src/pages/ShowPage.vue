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
          <div class="card" v-for="(item, index) in cards" :key="index">
            <h3>{{ item.title }}</h3>
            <p>{{ item.content }}</p>
          </div>
          <div class="card add-card">
            <i class="fas fa-plus"></i>
            <p>添加卡片</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyPage',
  data() {
    return {
      cards: [
        { title: '卡片标题1', content: '卡片内容1' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题2', content: '卡片内容2' },
        { title: '卡片标题3', content: '卡片内容3' },
        { title: '卡片标题4', content: '卡片内容4' }
      ]
    }
  }
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
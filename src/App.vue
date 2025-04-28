<script setup lang="ts">
// Componente principal
</script>

<template>
  <div class="app">
    <header>
      <h1>Quiz</h1>
    </header>

    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Reset CSS básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #2c3e50;
  background-color: #f8fafc;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background-color: white;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
}

header h1 {
  color: #3b82f6;
  font-size: 2rem;
}

main {
  flex: 1;
  padding: 2rem;
}
</style>

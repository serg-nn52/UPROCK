<template>
  <header class="header">Приложение</header>
  <div class="wrapper">
    <div class="container">
      <slot></slot>
    </div>
  </div>
  <footer class="footer">2022</footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({});
</script>

<style lang="scss" scoped>
@import '@/styles/colors';
.header {
  height: 100px;
  line-height: 100px;
  background: linear-gradient(90deg, $bg-form-first 0%, $bg-form-second 100%);
  text-align: center;
  font-size: 24px;
}
.wrapper {
  min-height: calc(100vh - 200px);
  background: linear-gradient(90deg, $bg-first 0%, $bg-second 100%);
  padding: 1rem;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    max-width: 1200px;
    margin: 0 auto;
  }
}
.footer {
  height: 100px;
  line-height: 100px;
  background: linear-gradient(270deg, $bg-form-first 0%, $bg-form-second 100%);
  text-align: center;
  font-size: 24px;
}
</style>

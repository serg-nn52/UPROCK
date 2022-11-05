<template>
  <div class="login-page">
    <LoginForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LoginForm from '@/components/LoginForm.vue';

export default defineComponent({
  components: {
    LoginForm,
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/colors';
@import '@/styles/media';

.login-page {
  align-items: center;
  background: linear-gradient(90deg, #29323c, #485563);
  display: flex;
  justify-content: center;
  min-height: 100vh;
  padding: 50px 20px;
  width: 100%;
}
</style>

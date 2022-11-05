<template>
  <layout-page>
    <h2>Страница не найдена!</h2>
  </layout-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutPage from '@/App/LayoutPage.vue';

export default defineComponent({
  components: { LayoutPage },
});
</script>

<style lang="scss" scoped>
@import '@/styles/colors';
h2 {
  margin-top: 100px;
  color: $dark-black;
}
</style>

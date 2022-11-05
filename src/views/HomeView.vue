<template>
  <LayoutPage>
    <UserInfo />
  </LayoutPage>
</template>

<script>
import LayoutPage from '@/App/LayoutPage.vue';
import UserInfo from '../components/UserInfo.vue';

export default {
  name: 'HomeView',
  components: {
    LayoutPage,
    UserInfo,
  },
};
</script>

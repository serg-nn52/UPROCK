<template>
  <div class="buttons">
    <button type="button" @click="logOut">Выйти из {{ getUser.email }}</button>
  </div>
  <h2>Добро пожаловать,</h2>
  <h2>{{ getUser.name }}</h2>
  <img src="@/assets/user-photo.jpg" alt="photo" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { paths } from '@/router';

export default defineComponent({
  methods: {
    logOut() {
      this.$store.commit('resetState');
      this.$router.push(paths.LOGIN);
    },
  },
  computed: mapGetters(['getToken', 'getUser']),
  beforeMount() {
    !this.getToken && this.$router.push(paths.LOGIN);
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/colors';
@import '@/styles/media';

.buttons {
  margin-bottom: 20px;
  text-align: right;
  @include media-breakpoint-down(sm) {
    text-align: center;
  }
  button {
    max-width: 300px;
    padding: 5px 10px;
    border: none;
    border-radius: 3px;
    background-color: $bg-form-second;
    transition: 0.3s;
    &:hover {
      background-color: $bg-form-first;
    }
    @include media-breakpoint-down(sm) {
      width: 300px;
      max-width: 100%;
    }
  }
}

h2 {
  color: $dark-black;
}
img {
  width: 300px;
  max-width: 100%;
  margin: 0 auto;
  margin-top: 25px;
}
</style>

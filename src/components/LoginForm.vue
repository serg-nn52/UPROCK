<template>
  <div class="form">
    <LoaderApp v-if="getStatus === 'loading'" />
    <h2>Аутентификация</h2>
    <form action="#" @submit.prevent="sendForm">
      <div className="field">
        <label htmlFor="email">Введите email</label>
        <input
          type="text"
          id="email"
          placeholder="ivanov@yandex.by"
          v-model="email"
          :class="{ 'border-red': emailError }"
        />
        <div :class="{ hide: !emailError }" class="error">
          Введите корректный email!
        </div>
      </div>
      <div className="field">
        <label htmlFor="password">Введите пароль</label>
        <input
          type="password"
          id="password"
          placeholder="Введите пароль!"
          v-model="password"
          :class="{ 'border-red': passwordError }"
        />
        <div :class="{ hide: !passwordError }" class="error">
          Пароль от 6 до 10 символов
        </div>
      </div>
      <button :disabled="getStatus === 'loading'" type="submit">Sign in</button>
    </form>
    <div class="notice">
      <div v-if="getStatus === '401'" class="error">
        The email address or password is incorrect.
      </div>
      <div v-else-if="getStatus === '400'" class="error">Server error!</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import LoaderApp from './LoaderApp.vue';
import { paths } from '@/router';

export default defineComponent({
  components: { LoaderApp },
  computed: mapGetters(['getStatus', 'getToken']),
  data() {
    return {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
    };
  },
  beforeMount() {
    this.getToken && this.$router.push(paths.HOME);
  },
  methods: {
    validate() {
      /^[A-Z0-9._%+-]+@[A-Z0-9-]+\.[A-Z]{2,4}$/i.test(this.email.trim())
        ? (this.emailError = false)
        : (this.emailError = true);
      this.password.length < 6 || this.password.length > 10
        ? (this.passwordError = true)
        : (this.passwordError = false);
    },
    sendForm() {
      this.validate();
      if (this.passwordError || this.emailError) return;
      this.$store.commit('addLoading');
      this.$store.dispatch('userAuth', {
        email: this.email,
        password: this.password,
      });
      this.email = '';
      this.password = '';
    },
  },
});
</script>

<style lang="scss" scoped>
@import '@/styles/colors';
@import '@/styles/media';

.opacity {
  opacity: 0.7;
}
.form {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 400px;
  max-width: 90%;
  padding: 50px 40px 30px 40px;
  background: linear-gradient(90deg, $bg-form-first 0%, $bg-form-second 100%);
  border: 2px solid $black;
  box-shadow: 0 0 50px $black;
  border-radius: 20px;
  overflow: hidden;
  @include media-breakpoint-down(sm) {
    width: 300px;
    padding: 30px 20px;
  }

  h2 {
    margin-bottom: 5px;
    font-size: 2rem;
    color: $title-color;
    text-align: center;
    @include media-breakpoint-down(sm) {
      font-size: 1.4rem;
      margin: 0;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 5px;
    .info {
      text-align: center;
      font-size: 16px;
      color: $error-color;
    }
    button {
      height: 40px;
      min-width: 200px;
      margin-top: 15px;
      padding: 5px 10px;
      align-self: center;
      font-size: 18px;
      color: $text-color;
      background-color: $button-color;
      border: none;
      border-radius: 20px;
      box-shadow: 0 0 50px $button-color;
      outline: none;
      transition-duration: 0.3s;
      @include media-breakpoint-down(sm) {
        margin-top: 0;
      }
      &:hover {
        color: $white;
        background-color: lighten($button-color, 10%);
      }
      &:disabled {
        opacity: 0.5;
      }
      &:disabled:hover {
        opacity: 0.5;
        color: $text-color;
        background-color: $button-color;
      }
    }
    a {
      display: block;
      margin-top: 20px;
      text-align: center;
      text-decoration: none;
      color: $title-color;
      &:hover {
        color: darken($title-color, 10%);
      }
    }
  }
  .field {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 5px;
    @include media-breakpoint-down(sm) {
      gap: 3px;
    }
    label {
      color: $label-color;
      text-align: left;
    }
    input {
      height: 30px;
      padding: 3px 10px;
      border: none;
      cursor: pointer;
      color: $black;
      border-radius: 5px;
      background-color: $white;
      &::placeholder {
        opacity: 0.8;
      }
      &:focus {
        padding: 2px 9px;
        border: 1px $blue solid;
        outline: none;
      }
    }
    .border-red {
      border: 2px solid $error-color;
      transition: 0.2s;
      &:focus {
        border: 2px solid $error-color;
      }
    }
  }
  .error {
    height: 15px;
    color: $error-color;
    text-align: left;
    @include media-breakpoint-down(sm) {
      font-size: 14px;
    }
  }
  .hide {
    opacity: 0;
    height: 15px;
  }
  .notice {
    height: 20px;
  }
}
</style>

<template>
  <div class="wrapper">
    <img src="@/assets/loader.gif" alt="loader" />
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  width: 100%;
  height: 100%;
  background: rgba($color: #333, $alpha: 0.7);
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
  }
}
</style>

<script lang="ts" setup name="ZButton">
defineProps({
  text: {
    type: String,
    default: ''
  },
  btnSize: {
    type: String,
    default: 'default'
  },
  size: {
    type: Number,
    default: 14
  },
  type: {
    type: String,
    default: 'default'
  },
  left: {
    type: Number,
    default: 0
  },
  right: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
</script>

<template>
  <div :type="type" :size="btnSize" :class="`z-button-${type}`" :disabled="disabled" :loading="loading" :style="{
    marginLeft: `${left}px`,
    marginRight: `${right}px`
  }">
    {{ text }}
  </div>
</template>

<style lang="scss" scoped>
.z-button-blue {
  background: #80d4fb;
  color: #fff;
  border: none;

  &:hover,
  &:focus,
  &:active {
    background: #80d4fb80;
    color: #fff;
  }

  .anticon {
    color: #fff;
  }
}

.z-button-warn {
  background: #ec622b;
  color: #fff;
  border: none;
  outline: none;

  &:hover,
  &:focus,
  &:active {
    background-color: #ec622b80;
    color: #fff;
  }

  .anticon {
    color: #fff;
  }
}
</style>

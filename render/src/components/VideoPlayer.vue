<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
  src: string
  autoplay: boolean
  controls: boolean
  loop: boolean
  preload: 'none' | 'metadata' | 'auto'
}>()
</script>

<template>
  <div class="video-player">
    <video
      :controls="props.controls"
      :loop="props.loop"
      :autoplay="props.autoplay"
      :preload="props.preload"
    >
      <source :src="props.src">
    </video>
  </div>
</template>

<style lang="scss" scoped>
.video-player {
  width: 100%;
  video {
    width: 100%;
  }
}
</style>

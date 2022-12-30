<script setup lang="ts">
import { ref } from 'vue'
import { darkTheme } from 'naive-ui'
import type { TreeOption } from 'naive-ui'
import VideoPlayer from './components/VideoPlayer.vue'

const videoTree = ref<IVideoTree[]>([])

const handleSelectedSource = async (type: SelectFileType = 'openDirectory') => {
  const res = await window.electronAPI.getVideoSource(type)
  if (typeof res !== 'boolean')
    videoTree.value = res
}

const curVideoPath = ref<string>('')

const nodeProps = ({ option }: { option: TreeOption }) => {
  return {
    onClick() {
      console.log(option)
      curVideoPath.value = new URL(option.value as string, import.meta.url).href
      console.log(curVideoPath.value)
    }
  }
}
</script>

<template>
  <n-config-provider :theme="darkTheme">
    <div class="app">
      <div class="video-wrap">
        <VideoPlayer
          :src="curVideoPath"
          :autoplay="false"
          :controls="true"
          :loop="false"
          preload="metadata"
        />
      </div>
      <div class="source-list">
        <div class="btns">
          <n-button
            size="small"
            @click="handleSelectedSource('openDirectory')"
          >
            添加文件夹
          </n-button>
          <n-button
            size="small"
            @click="handleSelectedSource('openFile')"
          >
            添加视频
          </n-button>
        </div>
        <n-tree
          v-if="videoTree.length > 0"
          block-line
          :data="videoTree"
          key-field="value"
          label-field="label"
          children-field="children"
          selectable
          :expand-on-click="true"
          :node-props="nodeProps"
        />
      </div>
    </div>
  </n-config-provider>
</template>

<style lang="scss" scoped>
.app {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  background-color: rgb(20, 20, 22);
  color: #fff;
  .video-wrap {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 400px;
  }
  .source-list {
    padding: 16px 8px 0px;
    width: 200px;
    border-left: 1px solid #fff;
    overflow-y: auto;
    .btns {
      display: flex;
      justify-content: space-between;
      padding-bottom: 8px;
      margin-bottom: 8px;
      border-bottom: 1px solid #fff;
    }
  }
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
const handleSetTitle = () => {
  window.electronAPI.setTitle('this is title')
}
const counter = ref<number>(0)

window.electronAPI.updateCounter((e, type) => {
  if (type === 'add')
    counter.value += 1
  else if (type === 'decr')
    counter.value -= 1
})

const handOpenFile = async () => {
  const res = await window.electronAPI.openFile()
  console.log(res)
}
</script>

<template>
  <div>
    <h1>hello world</h1>
    <button @click="handleSetTitle">
      setTitle
    </button>
    <div> {{ counter }} </div>
    <button @click="handOpenFile">
      openFile
    </button>
  </div>
</template>

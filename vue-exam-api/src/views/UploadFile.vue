<script setup lang="ts">
import {ref} from 'vue'
const file = ref()
function test(e:any){
//   const a = useUploadFileStorage()
//   a.uploadFile(file.value[0])
// console.log(file.value[0])
}
</script>
<template>
  test
  <v-img src="https://teststorageapi.sgp1.digitaloceanspaces.com/website.png"></v-img>
  <v-img src="https://teststorageapi.sgp1.digitaloceanspaces.com/file.jpg"></v-img>
  <v-file-input clearable v-model="file" label="File input" @change="test"></v-file-input>
</template>
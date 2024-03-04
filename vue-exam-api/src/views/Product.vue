<template>
s{{ data }}
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
const data = ref()
onMounted(async()=>{
  await fetch('https://dummyapi.online/api/products')
    .then((response) => response.json())
    .then(json => {data.value = json})
  })
</script>
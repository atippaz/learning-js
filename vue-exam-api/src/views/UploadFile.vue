<script setup lang="ts">
import {ref,onMounted} from 'vue'
const file = ref()
const data = ref([])
const load = ref(false)
onMounted(async() => {
  data.value = await fetch('http://localhost:3001/list').then(x=>x.json()).then(x=>x).catch(x=>x)
})
async  function tests(e:any){
  console.log('aa');
  load.value = true;
  const formdata = new FormData();
formdata.append("file", file.value[0]);
alert('uploading please wait . . . ')
fetch("http://localhost:3001/uploadFile", { method: "POST",
  body: formdata,
  redirect: "follow"})
  .then((response) => response.text())
  .then(async(result) => {console.log(result)
    data.value = await fetch('http://localhost:3001/list').then(x=>x.json()).then(x=>x).catch(x=>x)
    file.value = null
alert('finish ')

  })
  .catch((error) => console.error(error));
  load.value = false;

}
</script>
<template>
  upload file below here
<v-file-input clearable v-model="file" :loading="load" label="File input" @change="tests"></v-file-input>

  {{ data }}
  <v-container>
    <v-row >
      <v-col cols="3" v-for="i in data" :key="i">
        <v-img  :src="i" width="200" ></v-img>
      </v-col>
    </v-row>
  </v-container>

</template>
<template>
  <AppContainer>
    <input type="file" @change="onFileChange">
    <img :src="imageUrl">
  </AppContainer>
</template>

<script setup lang="ts">
import { AppContainer } from "../components/Container";
import { ref } from "vue";

const imageUrl = ref("")

const cloudName = 'hzxyensd5';
const unsignedUploadPreset = 'doc_codepen_example';

function onFileChange(event: any) {
  const file = event.target.files[0]
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const fd = new FormData();
  fd.append('upload_preset', unsignedUploadPreset);
  fd.append('tags', 'browser_upload');
  fd.append('file', file);

  fetch(url, {
    method: 'POST',
    body: fd,
  })
    .then((response) => response.json())
    .then((data) => {
      const url = data.secure_url;
      const tokens = url.split('/');
      tokens.splice(-3, 0, 'w_150,c_scale');
      imageUrl.value = tokens.join('/')
      console.log(tokens.join('/'))
    }
    )
}
</script>

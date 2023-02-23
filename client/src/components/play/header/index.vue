<template>
  <div class="header">
    <div class="left">
      <var-icon name="chevron-left" @click="back()" />
    </div>
    <div class="content">
      <div class="author">{{ author }}</div>
      <div class="name">{{ name }}</div>
    </div>
    <div class="right"></div>
  </div>
</template>
<script setup>
import {ref} from "vue"
import { useRoute, useRouter } from "vue-router";
const { query } = useRoute();
const router = useRouter();
let { author, name } = query;
author = ref(author);
name = ref(name);
function back() {
  router.go(-1);
}
</script>
<style lang="scss" scope>
.header {
  display: flex;
  flex-direction: row;
  align-items: center;
  .content {
    display: flex;
    flex-grow: 1;
  }
}
</style>

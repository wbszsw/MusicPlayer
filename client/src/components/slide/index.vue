<template>
  <div class="slide-wrap">
    <div class="slide-menban"></div>
    <div class="move"></div>
  </div>
</template>
<script setup>
import slideComponents from "@/components/slide-components";
import { ref, reactive } from "vue";
const props = defineProps(["start"]);
const wrapRef = reactive({});
const move = reactive({});
</script>

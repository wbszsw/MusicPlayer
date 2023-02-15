<script setup lang="ts">
import TheWelcome from "../components/TheWelcome.vue";
import { ref, reactive,watch } from "vue";
const msg = reactive({ count: 1 });
const count = ref(1);
function updateMsg(val) {
  msg.count = val;
  console.log("msg:",msg)
}

watch('count', (e)=> {
  console.log({e})
})

</script>

<template>
  <main>
    <TheWelcome
      :msg="msg"
      v-model='count'
      @updateMsg="updateMsg"
    />
  </main>
</template>

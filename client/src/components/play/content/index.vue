<template>
  <div class="play-content">
    <Transition>
      <lyric v-show="type === 1" @click="changeType(0)" />
    </Transition>
    <Transition>
      <poster v-show="type === 0" @click="changeType(1)" />
    </Transition>
  </div>
</template>
<script setup>
import { ref } from "vue";
import lyric from "@/components/play/content/lyric/index.vue";
import poster from "@/components/play/content/poster/index.vue";
let type = ref(1);
function changeType(val) {
  type.value = val;
}
</script>
<style lang="scss" scope>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

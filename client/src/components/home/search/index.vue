<template>
  <div>
    <div class="search">
      <var-input
        placeholder="请搜索你想要的歌曲"
        clearable
        :maxlength="10"
        v-model="value"
      />
    </div>
    <div class="search-submit">
      <var-button
        size="small"
        loading-type="rect"
        :loading="loading ? 'loading' : undefined"
        @click="submit()"
        >搜索</var-button
      >
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
const { loading } = defineProps(["loading"]);
const searchEmit = defineEmits(["searchUpdateData"]);
const value = ref("");

let timer = null;
function submit() {
  if (timer) {
    return;
  }
  timer = setTimeout(() => {
    searchEmit("searchUpdateData", this.value, true);
    clearTimeout(timer);
    timer = null;
  }, 500);
}
</script>
<style lang="scss" scope>
.search {
  padding: 12px;
}
.search-submit {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 25px 0;
}
</style>

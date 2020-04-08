<style scoped>
ol {
  width: 90%;
}
</style>

<template>
  <div aria-label="パンくずリスト">
    <ol class="breadcrumb mb-1">
      <li class="breadcrumb-item">
        <router-link to="/">ホーム</router-link>
      </li>
      <li class="breadcrumb-item active" aria-current="page">トーク</li>
      <li class="breadcrumb-item active" aria-current="page">{{ count }}件</li>
    </ol>
  </div>
</template>

<script lang="ts">
export default {
  props: ['count']
};
</script>

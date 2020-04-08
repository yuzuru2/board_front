<template>
  <div class="d-flex justify-content-center">
    <b-pagination v-model="num" :total-rows="count" :per-page="100" @change="click"></b-pagination>
  </div>
</template>

<script lang="ts">
import router from "@/router";

export default {
  mounted() {},
  props: ["num", "count"],
  methods: {
    click(num: number) {
      window.scrollTo(0, 0);
      router
        .push(`/talks/${router.currentRoute.params.id}/${num}`)
        .catch(err => {});
    }
  }
};
</script>

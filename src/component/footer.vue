<style scoped>
footer {
  margin-top: auto;
  text-align: center;
  height: 50px;
  background-color: rgb(255, 141, 153);
}
</style>

<template>
  <footer>
    <router-link to="/" style="color:#fff;" @click.native="footer_click()">{{constant.TITLE}}</router-link>
  </footer>
</template>

<script lang="ts">
import { constant } from "@/constant";

export default {
  data() {
    return {
      constant: constant
    };
  },
  methods: {
    footer_click() {
      window.scrollTo(0, 0);
    }
  }
};
</script>
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
      <li v-if="name !== ''" class="breadcrumb-item active">{{name}}</li>
      <li v-if="sub !== ''" class="breadcrumb-item active">{{sub}}</li>
      <li class="breadcrumb-item active" aria-current="page">{{set_count}}件</li>
    </ol>
  </div>
</template>

<script lang="ts">
import { constant } from "@/constant";
import router from "@/router";
import { v_home } from "@/store/modules/home";

export default {
  data() {
    return {
      name: "",
      sub: ""
    };
  },

  mounted() {
    this.$store.subscribe((mutation, state) => {
      this.set_data();
    });
    this.set_data();
  },

  computed: {
    set_count() {
      return v_home.count;
    }
  },

  methods: {
    set_data() {
      if (router.currentRoute.name === "search") {
        this.name = "検索";
        this.sub = router.currentRoute.params.str;
        return;
      }
      if (router.currentRoute.name === "genre") {
        this.name = "ジャンル";
        this.sub = constant.GENRE[router.currentRoute.params.id];
        return;
      }
      this.name = "";
      this.sub = "";
    }
  }
};
</script>
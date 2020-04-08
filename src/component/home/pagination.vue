<template>
  <div class="d-flex justify-content-center">
    <b-pagination v-model="num" :total-rows="get_data_length" :per-page="10" @change="click"></b-pagination>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { v_home } from "@/store/modules/home";
import { constant } from "@/constant";

export default {
  computed: {
    num: {
      get() {
        return v_home.pagination;
      },
      set(value) {}
    },
    get_data_length() {
      return v_home.count;
    }
  },

  methods: {
    click(num: number) {
      window.scrollTo(0, 0);

      if (router.currentRoute.name === "genre") {
        router
          .push(`/genre/${router.currentRoute.params.id}/${num}`)
          .catch(err => {});
        return;
      }

      if (router.currentRoute.name === "search") {
        router
          .push(`/search/${router.currentRoute.params.str}/${num}`)
          .catch(err => {});
        return;
      }

      router.push(`/info/${num}`).catch(err => {});
    }
  }
};
</script>

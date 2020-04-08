<template>
  <div class="mx-auto" style="max-width: 300px;">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        placeholder="検索"
        aria-label
        aria-describedby="basic-addon1"
        maxlength="15"
        @keydown.enter="click"
        v-model="text"
      />

      <!-- 検索ボタン -->
      <div class="input-group-append">
        <button class="btn btn-info" type="button" @click="click">
          <i class="fa fa-search"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { constant } from "@/constant";
export default {
  data() {
    return {
      text: ""
    };
  },
  methods: {
    click(): void {
      if (this.text === "") {
        router.push("/").catch(err => {});
        return;
      }
      router.push(`/search/${this.text}/1`).catch(err => {});
    }
  }
};
</script>
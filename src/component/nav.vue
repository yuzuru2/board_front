<template>
  <b-navbar toggleable="true">
    <router-link to="/" style="color:#fff;">{{constant.TITLE}}</router-link>

    <b-navbar-toggle target="nav-collapse" expanded="false" id="_navbar-toggler"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav class="ml-auto">
        <ul class="nav navbar-nav">
          <li
            class="list-group-item"
            v-for="(row, index) in constant.GENRE"
            :key="index"
            @click="click()"
          >
            <router-link :to="{ name: 'genre', params: { id: index, num: 1 } }">{{ row }}</router-link>
          </li>
        </ul>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script lang="ts">
import router from "@/router";
import { constant } from "@/constant";

export default {
  data() {
    return {
      constant: constant,
      name: router.currentRoute.name
    };
  },

  methods: {
    click() {
      if (this.name !== "talks") {
        (<HTMLInputElement>document.getElementById("_navbar-toggler")).click();
        window.scrollTo(0, 0);
      }
    }
  }
};
</script>

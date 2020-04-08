<style scoped>
article {
  width: 85%;
  padding-right: 20px;
}

._card_header {
  font-size: 13px;
  padding: 0 1.25rem;
}

.it-Tags_item {
  color: #666;
  font-size: 12px;
}

/* スマホ用 */
@media screen and (max-width: 767px) {
  article {
    width: 95%;
  }
}
</style>

<template>
  <div>
    <article class="mx-auto">
      <template v-for="(row, index) in get_data">
        <div class="card" :key="index">
          <div class="card-header text-center _card_header">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            {{ row.updatedAt }}
            &nbsp;&nbsp;
            <br />

            <router-link
              class="it-Tags_item"
              :to="{ name: 'genre', params: { id: row.genreId, num: 1 } }"
              @click.native="click()"
            >{{ get_genre[row.genreId] }}</router-link>

            <br />
            投稿数: {{ row.count }}
          </div>
          <div class="card-body">
            <router-link :to="{ name: 'talks', params: { id: row.id, num: 1 } }">{{ row.name }}</router-link>
          </div>
        </div>
        <br :key="index + 1000000" />
      </template>
    </article>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { v_home } from "@/store/modules/home";
import { constant } from "@/constant";

export default {
  computed: {
    get_data() {
      return v_home.data;
    },
    get_genre() {
      return constant.GENRE;
    }
  },

  methods: {
    click() {
      window.scrollTo(0, 0);
    }
  }
};
</script>

<style scoped>
header {
  background: rgb(255, 141, 153);
}

main {
  background-color: rgb(250, 243, 234);
  padding-top: 20px;
  min-height: 100vh;
}

section {
  width: 70%;
  padding-left: 20px;
}

article {
  width: 85%;
  padding-right: 20px;
}

aside {
  width: 30%;
  background-color: #fff;
}

/* スマホ用 */
@media screen and (max-width: 767px) {
  section {
    width: 100%;
  }

  aside {
    display: none;
  }
}
</style>

<template>
  <div>
    <!-- ローディング画面 -->
    <Loading v-if="!display"></Loading>

    <div v-if="display">
      <header>
        <Nav />
      </header>
      <main>
        <div class="row">
          <section>
            <Breadcrumb />

            <Search />

            <br />

            <Modal />

            <br />

            <Article />

            <br />
            <Pagination />
          </section>
          <aside>バナースペース</aside>
        </div>
      </main>

      <div class="sumaho_banner">バナースペース</div>

      <Footer />
    </div>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { Component, Vue } from "vue-property-decorator";

import { constant } from "@/constant";
import { v_home } from "@/store/modules/home";

import Loading from "@/component/loading.vue";
import Nav from "@/component/nav.vue";
import Pagination from "@/component/home/pagination.vue";
import Search from "@/component/home/search.vue";
import Article from "@/component/home/article.vue";
import Breadcrumb from "@/component/home/breadcrumb.vue";
import Modal from "@/component/home/modal.vue";
import Footer from "@/component/footer.vue";

export default {
  components: {
    Nav,
    Pagination,
    Search,
    Loading,
    Article,
    Breadcrumb,
    Modal,
    Footer
  },

  data() {
    return {
      display: false
    };
  },

  async mounted() {
    await this.request(router.currentRoute.params.num);
  },

  watch: {
    async $route(to: {
      name: string;
      params: { num?: number; str?: string; id?: string };
    }) {
      await this.request(to.params.num);
    }
  },

  methods: {
    async request(num: number) {
      let url = constant.REQUEST_URL[process.env.NODE_ENV];

      switch (router.currentRoute.name) {
        case "home":
          url += "/info/1";
          break;
        case "genre":
          url += `/genre/${router.currentRoute.params.id}/${num}`;
          break;
        case "info":
          url += `/info/${num}`;
          break;
        case "search":
          url += `/search/${router.currentRoute.params.str}/${num}`;
          break;
        default:
          break;
      }

      const _res = await fetch(url, {
        method: "get",
        headers: constant.HEADER
      });

      if (_res.status !== 200) {
        router.push("/").catch(err => {});
        return;
      }

      const _json: {
        list: [
          {
            id: string;
            name: string;
            genreId: string;
            updatedAt: Date;
            count: number;
          }
        ];
        count: number;
      } = await _res.json();

      v_home.SET_DATA(_json.list);
      v_home.SET_COUNT(_json.count);
      num === undefined
        ? v_home.SET_PAGINATION(1)
        : v_home.SET_PAGINATION(Number(num));

      this.display = true;
    }
  }
};
</script>

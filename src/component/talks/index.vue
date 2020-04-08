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
            <Breadcrumb :count="count" />

            <br />

            <Modal @get="request" />

            <br />

            <Article :data="data" />

            <br />
            <Pagination :num="num" :count="count" />
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
import Pagination from "@/component/talks/pagination.vue";
import Article from "@/component/talks/article.vue";
import Breadcrumb from "@/component/talks/breadcrumb.vue";
import Modal from "@/component/talks/modal.vue";
import Footer from "@/component/footer.vue";

export default {
  components: { Nav, Pagination, Loading, Article, Breadcrumb, Modal, Footer },
  data() {
    return {
      display: false,
      data: [],
      num: 1,
      count: 0
    };
  },

  async mounted() {
    await this.request(router.currentRoute.params.num);
  },

  methods: {
    async request(num: number) {
      const _res = await fetch(
        `${constant.REQUEST_URL[process.env.NODE_ENV]}/talks/${
          router.currentRoute.params.id
        }/${num}`,
        {
          method: "get",
          headers: constant.HEADER
        }
      );

      if (_res.status !== 200) {
        router.push("/").catch(err => {});
        return;
      }

      const _json: {
        list: [
          {
            name: string;
            message: string;
            updatedAt: Date;
          }
        ];
        count: number;
      } = await _res.json();

      this.data = _json.list;
      this.count = _json.count;
      this.num = num;

      this.display = true;
    }
  },

  watch: {
    async $route(
      to: { name: string; params: { num: number } },
      from: { params: { num: number } }
    ) {
      await this.request(to.params.num);
    }
  }
};
</script>

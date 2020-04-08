<style scoped>
article {
  width: 85%;
  padding-right: 20px;
}

._card_header {
  font-size: 13px;
  padding: 0 1.25rem;
}

p {
  white-space: pre-line;
  word-wrap: break-word;
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
      <template v-for="(row, index) in data">
        <div class="card" :key="index">
          <div class="card-header text-center _card_header">
            <i class="fa fa-clock-o" aria-hidden="true"></i>
            {{ get_time(row.updatedAt) }}
            &nbsp;&nbsp;
            <br />
            {{ row.name }}
          </div>
          <div class="card-body">
            <p>
              <template v-for="(message, j) in replace(row.message)">
                <span :key="j" v-if="Object.keys(message).indexOf('match') !== -1">
                  <a
                    :href="`${message.match}`"
                    target="_blank"
                    rel="noopener noreferrer"
                  >{{ message.match }}</a>
                </span>

                <span :key="j" v-else>{{ message }}</span>
              </template>
            </p>
          </div>
        </div>
        <br :key="index + row.message" />
      </template>
    </article>
  </div>
</template>

<script lang="ts">
import moment from "moment";

import router from "@/router";

const reactStringReplace = require("react-string-replace");

export default {
  mounted() {},
  props: ["data"],
  methods: {
    replace(str: string) {
      return reactStringReplace(str, /(https?:\/\/\S+)/g, (match, i) => {
        return { match: match };
      });
    },
    get_time(date: Date) {
      return moment(date).format("YYYY-MM-DD HH:mm:ss");
    }
  }
};
</script>

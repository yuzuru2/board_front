<template>
  <div>
    <div style="text-align: center;">
      <b-button type="button" class="btn btn-success" v-b-modal.modal-1
        >板をつくる</b-button
      >
    </div>

    <b-modal id="modal-1" title="板をつくる" ref="my-modal">
      <div class="form-group">
        <label for="FormControlSelect1">板名</label>
        <textarea
          class="form-control"
          rows="2"
          placeholder="50文字内"
          maxlength="50"
          v-model="room_name"
        ></textarea>

        <div class="form-group">
          <label for="FormControlSelect1">ジャンル</label>
          <select
            class="form-control"
            id="FormControlSelect1"
            v-model="genre_id"
          >
            <template v-for="(value, index) in genre">
              <option v-bind:key="index" :value="index">
                {{ genre[index] }}
              </option>
            </template>
          </select>
        </div>
      </div>

      <template v-slot:modal-footer="{}">
        <b-button class="yes_button" variant="success" @click="modal_ok">
          <strong>作成</strong>
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script lang="ts">
import router from '@/router';
import { constant } from '@/constant';

export default {
  data() {
    return {
      room_name: '',
      genre_id: '0',
      genre: constant.GENRE,
    };
  },

  methods: {
    async modal_ok() {
      const _name: string = this.room_name;
      const _genreId: string = this.genre_id;

      if (_name.length === 0) {
        alert('板名が入力されていません');
        return;
      }

      this.room_name = '';

      const _res = await fetch(
        `${constant.REQUEST_URL[process.env.NODE_ENV]}/rooms`,
        {
          method: 'post',
          headers: constant.HEADER,
          body: JSON.stringify({
            name: _name,
            genreId: Number(_genreId),
          }),
        }
      );

      if (_res.status !== 200) {
        router.push('/').catch((err) => {});
        return;
      }

      const _json: { id: string } = await _res.json();
      router.push(`/talks/${_json.id}/1`).catch((err) => {});
    },
  },
};
</script>

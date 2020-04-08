<template>
  <div>
    <div style="text-align: center;">
      <b-button type="button" class="btn btn-success" v-b-modal.modal-1
        >投稿</b-button
      >
    </div>

    <b-modal id="modal-1" title="投稿" ref="my-modal">
      <div class="form-group">
        <label for="FormControlSelect1">なまえ</label>
        <input
          class="form-control"
          placeholder="名前 15文字以内"
          maxlength="15"
          v-model="name"
        />
      </div>

      <div class="form-group">
        <label for="FormControlSelect2">メッセージ</label>
        <textarea
          class="form-control"
          rows="3"
          placeholder="150文字内"
          maxlength="150"
          v-model="message"
        ></textarea>
      </div>

      <template v-slot:modal-footer="{}">
        <b-button class="yes_button" variant="success" @click="modal_ok">
          <strong>投稿</strong>
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
      name: '名無し',
      message: '',
    };
  },

  methods: {
    async modal_ok() {
      const _name: string = this.name;
      const _message: string = this.message;

      if (_name.length === 0) {
        alert('なまえが入力されていません');
        return;
      }

      if (_message.length === 0) {
        alert('メッセージが入力されていません');
        return;
      }

      this.name = '名無し';
      this.message = '';

      (<HTMLInputElement>document.getElementsByClassName('close')[0]).click();

      const _res = await fetch(
        `${constant.REQUEST_URL[process.env.NODE_ENV]}/talks`,
        {
          method: 'post',
          headers: constant.HEADER,
          body: JSON.stringify({
            name: _name,
            roomId: router.currentRoute.params.id,
            message: _message,
          }),
        }
      );

      if (_res.status !== 200) {
        router.push('/').catch((err) => {});
        return;
      }

      // 親コンポーネントへ
      this.$emit('get', router.currentRoute.params.num);
    },
  },
};
</script>

import Vue from 'vue';
import Vuex from 'vuex';
import { i_home } from '@/store/modules/home';

Vue.use(Vuex);

export interface State {
  home: i_home;
}

export default new Vuex.Store<State>({});

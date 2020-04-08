import {
  Mutation,
  VuexModule,
  getModule,
  Module
} from 'vuex-module-decorators';
import store from '@/store/store';

/**
 * 時間を操るライブラリ
 */
import moment from 'moment';

export interface i_home {
  pagination: number;
  data: {
    id: string;
    name: string;
    genreId: string;
    updatedAt: string;
    count: number;
  }[];
  count: number;
}
@Module({ dynamic: true, store, name: 'v_home', namespaced: true })
class Home extends VuexModule implements i_home {
  pagination: number = 1;
  data: {
    id: string;
    name: string;
    genreId: string;
    updatedAt: string;
    count: number;
  }[] = [];
  count: number = 0;

  @Mutation
  public SET_PAGINATION(pagination: number) {
    this.pagination = pagination;
  }

  @Mutation
  public SET_DATA(
    data: [
      {
        id: string;
        name: string;
        genreId: string;
        updatedAt: Date;
        count: number;
      }
    ]
  ) {
    this.data = data.map(m => {
      return {
        id: m.id,
        name: m.name,
        genreId: m.genreId,
        updatedAt: moment(m.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        count: m.count
      };
    });
  }

  @Mutation
  public SET_COUNT(count: number) {
    this.count = count;
  }
}

export const v_home = getModule(Home);

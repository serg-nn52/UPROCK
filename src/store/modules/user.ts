import { paths } from './../../router/index';
import { State } from '../index';
import { axiosInstance } from '@/network';
import router from '@/router';
import { ActionContext } from 'vuex';

export type TUserType = {
  id: string;
  email: string;
  name: string;
  photo: string;
  token: string;
  password: string;
};

export type TUserState = {
  user: TUserType;
  statusRequest: string;
};

const initialUserState = {
  user: {} as TUserType,
  statusRequest: 'notSend',
};

export default {
  actions: {
    async userAuth(ctx: ActionContext<TUserState, State>, user: TUserType) {
      const { commit, getters } = ctx;
      try {
        const res = await axiosInstance.post('/api/users', user);
        if (res.status === 200) {
          commit('addUser', res.data);
          getters.getToken && router.push(paths.HOME);
        }
        commit('addStatus', res.status);
      } catch (e: any) {
        commit('addStatus', e.response.status);
      }
    },
  },
  mutations: {
    addUser(state: TUserState, user: TUserType) {
      state.user = user;
    },
    addStatus(state: TUserState, status: number) {
      state.statusRequest = '' + status;
    },
    addLoading(state: TUserState) {
      state.statusRequest = 'loading';
    },
    resetState(state: TUserState) {
      (state.statusRequest = 'notSend'), (state = initialUserState);
    },
  },
  getters: {
    getStatus(state: TUserState) {
      return state.statusRequest;
    },
    getUser(state: TUserState) {
      return state.user;
    },
    getToken(state: TUserState) {
      return state.user.token;
    },
  },
  state: () => {
    return {
      user: initialUserState,
    };
  },
};

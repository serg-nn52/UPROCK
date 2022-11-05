import { State } from '../index';
import { axiosInstance } from '@/network';
import router from '@/router';

export type TUserType = {
  id: string;
  email: string;
  name: string;
  photo: string;
  token: string;
  password: string;
};

const initialUserState: TUserType = {} as TUserType;

export default {
  actions: {
    async userAuth({ commit, getters }: any, user: TUserType) {
      try {
        const res = await axiosInstance.post('/api/users', user);
        if (res.status === 200) {
          commit('addUser', res.data);
          getters.getToken && router.push('/');
        }
        commit('addStatus', res.status);
      } catch (e: any) {
        commit('addStatus', e.response.status);
        console.log(e);
      }
    },
  },
  mutations: {
    addUser(state: State, user: TUserType) {
      state.user = user;
    },
    addStatus(state: State, status: number) {
      state.statusRequest = '' + status;
    },
    addLoading(state: State) {
      state.statusRequest = 'loading';
    },
    resetState(state: State) {
      (state.statusRequest = 'notSend'), (state.user = initialUserState);
    },
  },
  getters: {
    getStatus(state: State) {
      return state.statusRequest;
    },
    getUser(state: State) {
      return state.user;
    },
    getToken(state: State) {
      return state.user.token;
    },
  },
  state: () => {
    return {
      user: initialUserState,
      statusRequest: 'notSend',
    };
  },
};

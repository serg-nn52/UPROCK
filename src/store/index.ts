import user, { TUserType } from './modules/user';
import { createStore } from 'vuex';

export interface State {
  user: TUserType;
  statusRequest: string;
}

const store = createStore<State>({
  modules: {
    user,
  },
});

export default store;

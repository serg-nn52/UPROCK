import user, { TUserState } from './modules/user';
import { createStore } from 'vuex';

//RootState
export interface State {
  user: TUserState;
}

const store = createStore<State>({
  modules: {
    user,
  },
});

export default store;

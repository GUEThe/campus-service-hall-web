import Vue from "vue";
import Vuex from "vuex";

import { UserInfo, Department } from "@/api/models";

Vue.use(Vuex);

export interface IRootState {
  user: UserInfo;
  dept: any;
}

// Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<IRootState>({});

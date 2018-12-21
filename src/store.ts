import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './interfaces';
import graphView from './vuex-module';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: { graphView }
};

export default new Vuex.Store(store);

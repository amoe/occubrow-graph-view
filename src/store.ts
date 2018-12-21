import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import mc from './mutation-constants';
import { NodeFillMap, RootState } from './interfaces';
import graphView from './vuex-module';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    modules: { graphView }
};

export default new Vuex.Store(store);

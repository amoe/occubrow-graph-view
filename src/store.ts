import Vue from 'vue';
import Vuex from 'vuex';
import mc from './mutation-constants';
import actions from './actions';

Vue.use(Vuex);

export default new Vuex.Store({
    getters,
    state: {
        count: 0,
        // needs to be initialized to null, not an empty array, otherwise you
        // see a strange intermediate state
        graphData: null,
        possibleRoots: [],
        selectedRoot: 'Oyl',
        // Stores a reference to the DOM elements that get populated by the
        // taxonomy widgets; this is needed to allow registering them as
        // potential hit areas for draggable.
        widgetDropTargets: [],
        nodeDropTargets: [],
        nodeFill: {},
        popoverActive: false,
        taxonomyModel: null
    },
    mutations: {
        increment(state) {
            state.count++;
        },
        [mc.SET_TAXONOMY_MODEL]: (state, taxonomyModel) => {
            state.taxonomyModel = taxonomyModel;
        },
        [mc.ACTIVATE_POPOVER]: (state) => {
            state.popoverActive = true;
        },
        [mc.SET_HOVERED_NODE_INDICES]: (state, hovered: number[]) => {
            state.nodeFill = {};

            for (let i of hovered) {
                state.nodeFill[i] = 'green';
            }
        },
        [mc.SET_NODE_DND_TARGETS]: (state, targets: Vue[]) => {
            state.nodeDropTargets = targets;
        },
        [mc.SET_GRAPH_DATA]: (state, data) => {
            state.graphData = data;
        },
        [mc.SET_POSSIBLE_ROOTS]: (state, possibleRoots) => {
            state.possibleRoots = possibleRoots;
        },
        [mc.SELECT_ROOT]: (state, newRoot) => {
            state.selectedRoot = newRoot;
        }
    },
    actions
});

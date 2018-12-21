import Vue from 'vue';
import Vuex from 'vuex';
import mc from './mutation-constants';
import actions from './actions';
import { NodeFillMap } from './interfaces';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // needs to be initialized to null, not an empty array, otherwise you
        // see a strange intermediate state
        graphData: null,
        possibleRoots: [],
        selectedRoot: 'Oyl',
        // Stores a reference to the DOM elements that get populated by the
        // taxonomy widgets; this is needed to allow registering them as
        // potential hit areas for draggable.
        widgetDropTargets: [],
        nodeDropTargets: [] as Vue[],
        nodeFill: {} as NodeFillMap,
        taxonomyModel: null
    },
    mutations: {
        [mc.SET_TAXONOMY_MODEL]: (state, taxonomyModel) => {
            state.taxonomyModel = taxonomyModel;
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
    getters: {
        graphData(state, getters) {
            return state.graphData;
        },
        possibleRoots(state, getters) {
            return state.possibleRoots;
        },
        selectedRoot(state, getters) {
            return state.selectedRoot;
        },
        widgetDropTargets(state, getters) {
            return state.widgetDropTargets;
        },
        nodeDropTargets(state, getters): Vue[] {
            return state.nodeDropTargets;
        },
        nodeFill(state, getters) {
            return state.nodeFill;
        },
        taxonomyModel(state, getters) {
            return state.taxonomyModel;
        }
    },
    actions
});

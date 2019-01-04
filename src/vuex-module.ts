import Vue from 'vue';
import mc from './mutation-constants';
import { StoreOptions, Module } from 'vuex';
import actions from './actions';
import { GraphViewState, RootState, NodeFillMap, TokenTreeNode } from './interfaces';


const graphView: Module<GraphViewState, RootState> = {
    state: {
        possibleRoots: [],
        selectedRoot: 'Oyl',
        // Stores a reference to the DOM elements that get populated by the
        // taxonomy widgets; this is needed to allow registering them as
        // potential hit areas for draggable.
        widgetDropTargets: [],
        nodeDropTargets: [],
        nodeFill: {},
        graphData: null
    },
    mutations: {
        [mc.SET_HOVERED_NODE_INDICES]: (state, hovered: number[]) => {
            state.nodeFill = {};

            for (let i of hovered) {
                state.nodeFill[i] = 'green';
            }
        },
        [mc.SET_NODE_DND_TARGETS]: (state, targets: Vue[]) => {
            state.nodeDropTargets = targets;
        },
        [mc.SET_POSSIBLE_ROOTS]: (state, possibleRoots) => {
            state.possibleRoots = possibleRoots;
        },
        [mc.SELECT_ROOT]: (state, newRoot) => {
            state.selectedRoot = newRoot;
        },
        [mc.SAVE_GRAPH_DATA]: (state, graphData: TokenTreeNode) => {
            state.graphData = graphData;
        },
    },
    getters: {
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
        nodeFill(state, getters): NodeFillMap {
            return state.nodeFill;
        },
        graphDataFromStore(state, getters): TokenTreeNode | null {
            return state.graphData;
        }
    },
    actions
};

export default graphView;

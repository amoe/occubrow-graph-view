import Vue from 'vue';
import mc from './mutation-constants';
import { StoreOptions, Module } from 'vuex';
import actions from './actions';
import { GraphViewState, RootState, NodeFillMap, TokenTreeNode, TokenDatum, TokenNode } from './interfaces';
import TreeModel from 'tree-model';

// Should never show up in practice because graphData is a required prop
// on GraphView and that will directly set graphData to another value.  Not
// allowing null values on graphData enables us to do aggregations etc without
// checking for null everywhere.
const DUMMY_TOKEN = {
    content: 'NO_DATA',
    id: 0,
    label: 'Token',
    strength: 0
};

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
        graphData: DUMMY_TOKEN
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
        graphDataFromStore(state, getters): TokenTreeNode {
            return state.graphData;
        },
        graphTree(state, getters): TokenNode {
            const config = { childrenPropertyName: 'children' }
            const treeModel = new TreeModel(config);
            return treeModel.parse<TokenDatum>(state.graphData);
        },
        maximumStrength(state, getters): number {
            return 0;
        }
    },
    actions
};

export default graphView;

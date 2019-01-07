<template>
    <g :transform="rootTranslation">
      <!-- The group for nodes and their associated labels -->
      <!-- The funny thing is that it's totally possible to rewrite these as
           a group of computed properties derived from the state. -->
      <!-- We just do it in this d3-ish way as a first pass. -->

      <graph-node v-for="(node, index) in allIncludingRoot"
                  ref="nodes"
                  :key="index"
                  :node="node"
                  :index="index"
                  :group-class="getNodeGroupClass(node)"
                  :group-transform="getNodeGroupTransformation(node)"
                  :text-transform="getTextRotation(node)"
                  :text-anchor="getTextAnchor(node)"
                  :text-x-offset="getTextXOffset(node)"
                  :text-content="getNodeTextContent(node)">
      </graph-node>

      <path v-for="node in allButRoot"
            class="link"
            :d="getPathDescription(node)"/>
    </g>
</template>

<script lang="ts">
import Vue from 'vue';
import {SimulationNodeDatum} from 'd3-force';
import layoutFunctions from '../layout-functions';
import bus from '../event-bus';
import events from '../events';
import axios from 'axios';
import { PolarPoint, CartesianPoint, GVNode, TokenTreeNode } from '../interfaces';
import GraphNode from './GraphNode.vue';
import {sprintf} from 'sprintf-js';
import mc from '../mutation-constants';
import {mapGetters} from 'vuex';
import Draggable from 'gsap/Draggable';
import * as log from 'loglevel';
import Mustache from 'mustache';
import {hierarchy, cluster} from 'd3';

export default Vue.extend({
    props: {
        graphData: {
            required: true,
            type: Object as () => TokenTreeNode
        },
        width: {type: Number, required: true},
        height: {type: Number, required: true},
        xMargin: {type: Number, required: true},
        yMargin: {type: Number, required: true},
        depthOffset: {type: Number, required: true},
        textOffset: {type: Number, required: true},
        breadth: {type: Number, required: true},
        textContentTemplate: {type: String, required: true}
    },
    components: {GraphNode},
    data() {
        return {
            initialized: false
        };
    },
    created() {
        this.$store.commit(mc.SAVE_GRAPH_DATA, this.graphData);
        this.initialized = true;
        console.log("graph tree is %o", this.graphTree);
    },
    mounted() {
        this.saveNodes();
    },
    watch: {
        graphData(newData: TokenTreeNode, oldData: TokenTreeNode) {
            console.log("GraphView: inside graph data watcher");
            this.$store.commit(mc.SAVE_GRAPH_DATA, newData);
            this.$nextTick(() => this.saveNodes());
        }
    },
    methods: {
        saveNodes() {
            log.debug("saving nodes");
            log.debug("node set was found as %o", this.$refs.nodes);
            this.$store.commit(mc.SET_NODE_DND_TARGETS, this.$refs.nodes);
        },
        getTextRotation(node: GVNode) {
            let rotation;

            if (node.x < 180) {
                rotation = node.x - 90;
            } else {
                rotation = node.x + 90;
            }

            return "rotate(" + rotation + ")";
        },
        getTextAnchor(node: GVNode) {
            if (layoutFunctions.isOnRightSide(node)) {
                return "start";
            } else {
                return "end";
            }
        },
        getTextXOffset(node: GVNode) {
            // This is like exclusive or or some shit.
            if (layoutFunctions.isOnRightSide(node)) {
                return this.textOffset;
            } else {
                return -this.textOffset;
            }
        },
        getPathDescription(node: GVNode) {
            const d = node;

            if (d.parent === null) throw new Error("can't happen");

            const sourcePoint: PolarPoint = {
                angle: d.parent.x,
                radius: d.parent.y
            };

            const targetPoint: PolarPoint = {
                angle: d.x,
                radius: d.y
            };

            log.trace("source point is %o", sourcePoint);
            log.trace("target point is %o", targetPoint);
            log.trace("text associated with target point is %o", d.data.id);

            const sourceRadius = 16;

            return layoutFunctions.getPathDescriptionForEdge(sourcePoint, sourceRadius, targetPoint)
        },
        getNodeGroupTransformation(d: GVNode) {
            const p1: PolarPoint = {
                angle: d.x,
                radius: d.y
            };

            const p2 = layoutFunctions.polarToCartesian(p1);

            return `translate(${p2.x}, ${p2.y})`;
        },
        getNodeGroupClass(d: GVNode) {
            // These classes can be helpful to allow styling the internal and 
            // leaf nodes differently.
            if (d.children) {
                return "node internal-node";
            } else {
                return "node leaf-node";
            }
        },
        getNodeTextContent(d: GVNode) {
            return Mustache.render(this.textContentTemplate, d.data);
        },
    },
    computed: {
        graphTree() {
            return this.$store.getters.graphTree;
        },
        allButRoot: function(this: any) {
            return this.root.descendants().slice(1);
        },
        allIncludingRoot: function(this: any) {
            return this.root.descendants();
        },
        rootTranslation: function(this: any) {
            const xOffset = (this.width / 2) + this.xMargin;
            const yOffset = (this.height / 2) + this.yMargin;
            
            return "translate(" + xOffset + "," + yOffset + ")";
        },
        root: function(this: any) {
            const depth = (this.width / 2) - this.depthOffset;    // This is a radius
            const clusterLayout = cluster().size([this.breadth, depth]);
            const theHierarchy = hierarchy(this.graphDataFromStore, d => d.children);
            clusterLayout(theHierarchy);
            return theHierarchy;
        },
        widgetDropTargets: function(this: any) {
            return this.$store.getters.widgetDropTargets;
        }, ...mapGetters(['possibleRoots', 'selectedRoot', 'graphDataFromStore'])
    }
});
</script>

<style>
.node circle {
    cursor: move;
}

.node text {
    font-size: 0.8em;
}

.link {
      fill: none;
      stroke: #409EFF;
      stroke-opacity: 1.0;
      stroke-width: 1.5px;
}
</style>

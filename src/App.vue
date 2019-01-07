<template>
<div class="page">
  <h1>GRAPH-VIEW -- DEMO PAGE</h1>

  <div class="graph">
    <svg id="svg-frame" :width="width" :height="height">
      <graph-view :width="width"
                  :height="height"
                  :x-margin="xMarginPx"
                  :y-margin="yMarginPx"
                  :depth-offset="depthOffset"
                  :text-offset="textOffset"
                  :breadth="breadth"
                  :text-content-template="textContentTemplate"
                  :graphData="myGraphData"
                  v-on:node-clicked="handleNodeClicked"></graph-view>
    </svg>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from './utility';
import * as d3 from 'd3';
import GraphView from './components/GraphView.vue';
import {mapGetters} from 'vuex';
import bus from './event-bus';
import events from './events';
import * as log from 'loglevel';
import TreeModel from 'tree-model';
import mc from './mutation-constants';
import axios from 'axios';
import shading from '@/shading';
import {TokenTreeNode} from '@/interfaces';
import {FAKE_API_DATA_1, FAKE_API_DATA_2} from '@/fake-api-data';

export default Vue.extend({
    components: {GraphView},
    data: function() {
        return {
            textContentTemplate: "{{content}} [{{taxon}}]",
            visible: false,
            activeControls: [],
            width: 600,
            height: 600,
            yMarginVh: 0.2,
            xMarginVh: 0.15,
            depthOffset: 120,
            textOffset: 22,   // depends on circle radius
            breadth: 360,
            zoomDepth: 2,
            myGraphData: FAKE_API_DATA_1 as TokenTreeNode,
            state: 0,
        };
    },
    created: function() {
        this.$store.commit(mc.SELECT_ROOT, 'keep');
    },
    mounted() {
//        window.setInterval(this.changeData, 1000);
    },
    methods: {
        handleNodeClicked(): void {
            console.log("node was clicked");
        },
        changeData(): void {
            // Alternate between two sets of demo data
            console.log("changing data");

            if (this.state % 2 === 0) {
                this.myGraphData = FAKE_API_DATA_2;
            } else {
                this.myGraphData = FAKE_API_DATA_1;
            }

            this.state = this.state + 1;
        }
    },
    // mapState doesn't work with typescript: "Property 'mapState' does not exist on type"
    // So we manually create the relevant computed properties.
    computed: {
        boxStyles(): object {
            return {
                'background-color': shading.hsla(360, 100, 50, 1.0)
            };
        },
        yMarginPx: function (this: any) {
            return document.documentElement.clientHeight * this.yMarginVh;
        },
        xMarginPx: function (this: any) {
            return document.documentElement.clientHeight * this.xMarginVh;
        },
        count: function (this: any) {
            return this.$store.state.count;
        }, ...mapGetters(['isDragInProgress', 'lastDrop', 'selectedRoot'])
    }
});
</script>

<style>
@font-face {
    font-family: 'Oxygen';
}

body {
    background-color: #fdfdfd;
    font-family: 'Oxygen', sans-serif;
}

h1 {
   font-style: italic;
}


div.graph {
    grid-row: 4;
    grid-column: col-start 4 / span 4;
}

div.text-view {
    grid-row: 5;
    margin: 1em;
    grid-column: col-start 2 / span 10;
}

div.timeline {
    grid-row: 6;
    height: 4em;
    grid-column: col-start 2 / span 10;     
}

.glyph {
    fill: red;
}

/* The svg frame is 'pinned', taken outside of the flow layout, and occupies 
   the entire page. */
#svg-frame {
    position: absolute;
    top: 0px;
    right: 0px;
    left: 0px;
    bottom: 0px;
    width: 100vw;
    height: 100vh;

    /* It's gotta have such a z-index, otherwise it will block HTML items from
       being interacted with. */
    z-index: -1;
}
</style>

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
                  :graphData="myGraphData"></graph-view>
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

const STATIC_TAXONOMY_DATA = {"_type":"Taxon","children":[{"_type":"Taxon","children":[{"_type":"Taxon","id":63754,"name":"Deepstaria enigmatica"},{"_type":"Taxon","id":63759,"name":"Deepstaria reticulum"}],"id":63752,"name":"Deepstaria"},{"_type":"Taxon","children":[{"_type":"Taxon","id":63760,"name":"Aurelia labiata"},{"_type":"Taxon","id":63761,"name":"Aurelia aurita"}],"id":63753,"name":"Aurelia"}],"id":63751,"name":"Ulmaridae"}

const FAKE_API_DATA = {
    "children": [
        {
            "children": [
                {
                    "content": "peace",
                    "id": 63765,
                    "label": "Token"
                },
                {
                    "content": "books",
                    "id": 63767,
                    "label": "Token"
                }
            ],
            "content": "the",
            "id": 63764,
            "label": "Token"
        },
        {
            "children": [
                {
                    "content": "shop",
                    "id": 63732,
                    "label": "Token"
                },
                {
                    "content": "bar",
                    "id": 63782,
                    "label": "Token"
                }
            ],
            "content": "a",
            "id": 63774,
            "label": "Token"
        }
    ],
    "content": "keep",
    "id": 63762,
    "label": "Token"
};


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
            myGraphData: null
        };
    },
    methods: {
        updateFromBackend(this: any) {
            this.myGraphData = FAKE_API_DATA;
        }
    },
    created: function() {
        // XXX: Load up a hard coded taxonomy so that we don't break other bits
        // of code.
        const treeModelConfig = {
            childrenPropertyName: 'children',
            // you can also use modelcomparatorfn here to auto sort the tree
        };

        const apiTree = new TreeModel(treeModelConfig);
        const apiRoot = apiTree.parse(STATIC_TAXONOMY_DATA as any);
        this.$store.commit(mc.SET_TAXONOMY_MODEL, apiRoot);
        this.$store.commit(mc.SELECT_ROOT, 'keep');
        this.updateFromBackend();
    },
    // mapState doesn't work with typescript: "Property 'mapState' does not exist on type"
    // So we manually create the relevant computed properties.
    computed: {
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

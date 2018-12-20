<template>
  <div class="page">
    <div class="graph">
      <svg id="svg-frame" :width="width" :height="height">
        <graph-view :width="width"
                    :height="height"
                    :x-margin="xMarginPx"
                    :y-margin="yMarginPx"
                    :depth-offset="depthOffset"
                    :text-offset="textOffset"
                    :breadth="breadth"></graph-view>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import utility from './utility';
import * as d3 from 'd3';
import graph from './graph';
import GraphView from './components/GraphView.vue';
import {mapGetters} from 'vuex';
import bus from './event-bus';
import events from './events';
import * as log from 'loglevel';
import * as TreeModel from 'tree-model';
import mc from './mutation-constants';
import axios from 'axios';

const STATIC_TAXONOMY_DATA = {"_type":"Taxon","children":[{"_type":"Taxon","children":[{"_type":"Taxon","id":63754,"name":"Deepstaria enigmatica"},{"_type":"Taxon","id":63759,"name":"Deepstaria reticulum"}],"id":63752,"name":"Deepstaria"},{"_type":"Taxon","children":[{"_type":"Taxon","id":63760,"name":"Aurelia labiata"},{"_type":"Taxon","id":63761,"name":"Aurelia aurita"}],"id":63753,"name":"Aurelia"}],"id":63751,"name":"Ulmaridae"}

export default Vue.extend({
    components: {GraphView},
    data: function() {
        return {
            visible: false,
            activeControls: [],
            width: 600,
            height: 600,
            yMarginVh: 0.4,
            xMarginVh: 0.15,
            depthOffset: 120,
            textOffset: 22,   // depends on circle radius
            breadth: 360,
            zoomDepth: 2
        };
    },
    methods: {
        updateFromBackend(this: any) {
            const loading = this.$loading();

            axios.get(
                "/api/tezra/tree?root=" + this.selectedRoot + "&zoom_depth=" + this.zoomDepth
            ).then(response => {
                this.$store.commit(mc.SET_GRAPH_DATA, response.data);
                loading.close();
            }).catch(error => {
                this.$message.error('Failed to query data from API');
                loading.close();
            });
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
        nodesAtLevel: function (this: any) {
            // XXX: We should be taking this tree from the one that is pulled
            // by the WidgetBar component.
            const tree = new TreeModel();
            const root = tree.parse({name: 'a', children: [{name: 'b'}]});

            // We need to map them to name-only afterward, otherwise they
            // just won't print out.
            return graph.getAllNodesAtLevel(root, 2).map(n => n.model.name);
        },
        count: function (this: any) {
            return this.$store.state.count;
        }, ...mapGetters(['isDragInProgress', 'lastDrop', 'popoverActive', 'selectedRoot'])
    }
});
</script>

<style>
@font-face {
    font-family: 'Oxygen';
    src: url("/static/fonts/Oxygen-Regular.ttf");
}

body {
    background-color: #fdfdfd;
    font-family: 'Oxygen', sans-serif;
}

.widget-bar {
    grid-row: 2;
    grid-column: col-start 2 / span 10;
}

div.page {
    display: grid;
    grid-template-columns: repeat(12, [col-start] 1fr);
}

div.header {
    grid-row: 1;
    grid-column: col-start 2 / span 12;
}

h1 {
   font-style: italic;
}


div.taxonomy {
    grid-row: 2;
    height: 8em;
    grid-column: col-start / span 12;
    margin: 1em;
}

div.control-collapse {
    grid-row: 3;
    grid-column: col-start 2 / span 10;
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

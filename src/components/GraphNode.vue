<template>
  <g :class="groupClass" :transform="groupTransform">
  <!-- The starting position is given by a containing <g></g> in the scope
       of the containing Vue component. -->
    <circle class="real-node"
            r="16"
            :fill="getNodeFill()"
            ref="realNodeSvgCircle"/>

    <!-- The ghost node has to handle all of the events, because it's always
         in front of the real node.  -->
    <circle class="ghost-node"
            :r="ghostRadiusPx"
            ref="ghostNodeSvgCircle"
            :cx="cx"
            :cy="cy"
            :opacity="ghostOpacity"
            v-on:mouseover="handleMouseover"
            v-on:mouseout="handleMouseout">
      <title>This is a tooltip</title>
    </circle>

    <text dy="0.31em"
          :transform="textTransform"
          :text-anchor="textAnchor"
          :x="textXOffset">{{textContent}}</text>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import * as d3 from 'd3';
import mc from '../mutation-constants';
import {mapGetters} from 'vuex';
import bus from '../event-bus';
import events from '../events';
import Draggable from 'gsap/Draggable';
import TweenLite from 'gsap/TweenLite';
import constants from '../constants';
import * as log from 'loglevel';
import shading from '@/shading';
import { GVNode, NodeFillMap } from '@/interfaces';

export default Vue.extend({
    props: {
        node: {type: Object as () => GVNode, required: true},
        textTransform: {type: String, required: true},
        textAnchor: {type: String, required: true},
        textXOffset: {type: Number, required: true},
        textContent: {type: String, required: true},
        groupTransform: {type: String, required: true},
        groupClass: {type: String, required: true},
        index: {type: Number, required: true},
    },
    data() {
        return {
            cx: 0,
            cy: 0,
            ghostOpacity: 0.0,
            ghostRadius: 16,
            hoverTimeout: null as (number | null)
        };
    },
    created() {
        bus.$on(events.DRAG_OPERATION_STARTED, () => this.globalDragStartHandler());
    },
    mounted() {
        const instance = this;

        this.$nextTick(function() {
            const ghostCircle = instance.getGhostNodeCircle();

            log.debug("inside circle node callback");

            const vars = {
                onDragStart: function(this: any) {
                    console.log("drag started");
                    instance.ghostOpacity = 0.2;
                    instance.ghostRadius = 16;
                    bus.$emit(events.DRAG_OPERATION_STARTED);
                },
                onDrag: function(this: any) {
                    // For all of these any-annotated functions below, the type is actually
                    // GraphNode.  But I'm worried that it's going to be impossible to
                    // refer to the GraphNode type from within itself.

                    const withoutMe = instance.nodeDropTargets.filter(
                        function (n: any) {
                            return n.index !== instance.index;
                        }
                    );

                    const targetsHit = withoutMe.filter((n: any) => {
                       return this.hitTest(n.getGhostNodeCircle())
                    });

                    const hoveredIndices: number[] = targetsHit.map(
                        function (n: any) { return n.index; }
                    );


                    instance.$store.commit(mc.SET_HOVERED_NODE_INDICES, hoveredIndices);
                },
                onDragEnd: function(this: any) {
                    console.log("drag ended");


                    // XXX: We don't know how to deal with this stuff yet.
                    /* 
                    instance.$store.commit(mc.ACTIVATE_POPOVER);

                    // hittest can't accept a class, only an id, and should really be element

                    const targetsHit = instance.widgetDropTargets.filter(
                        e => this.hitTest(e)
                    );

                    console.log("hit targets were %o", targetsHit);


                    if (targetsHit.length !== 0) {
                        instance.$message('Widget hit detected');
                    }

                    TweenLite.to(
                        this.target, constants.TWEEN_GHOST_RETURN_TIME_SECONDS, { x: 0, y: 0 }
                    );
                    */
                }
            };


            const result = Draggable.create(ghostCircle, vars);
            log.debug("result of creating draggable was %o", result);
        })
    },
    methods: {
        getNodeFill(): string {
            return this.nodeFill[this.index] || this.defaultColor;
        },
        globalDragStartHandler() {
            log.debug("registered start of drag");
        },
        getGhostNodeCircle(): HTMLElement {
            return this.$refs.ghostNodeSvgCircle as HTMLElement;
        },
        handleMouseover(e: Event): void {
             this.hoverTimeout = window.setTimeout(
                 function() {
                     console.log("hover event");
                 },
                 constants.HOVER_RECENTER_ACTION_TIME_MS
             );
        },
        handleMouseout(e: Event) {
            if (this.hoverTimeout === null) throw new Error("can't happen");

            window.clearTimeout(this.hoverTimeout)
        },
    },
    computed: {
        nodeFill(): NodeFillMap {
            return this.$store.getters.nodeFill;
        },
        defaultColor(): string {
            return shading.hsla(220, 3, 19, 1.0);
        },
        // Just a utility method to convert between the units.
        ghostRadiusPx(this: any) {
            return this.ghostRadius;
        },
        widgetDropTargets: function(this: any) {
            return this.$store.getters.widgetDropTargets;
        },
        nodeDropTargets: function(this: any) {
            return this.$store.getters.nodeDropTargets;
        }, ...mapGetters(['nodeFill'])
    }
});
</script>

<style>
/* No styling yet */
</style>


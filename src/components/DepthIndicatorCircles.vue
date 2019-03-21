<template>
  <g>
    <circle v-for="i in nConcentric"
            cx="0" cy="0" :r="i * radius" stroke="red" fill="grey" :opacity="opacity"/>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';
import * as log from 'loglevel';

export default Vue.extend({
    props: ['radius', 'nConcentric'],
    data() {
        return {
            opacity: 0.1,
        };
    },
    created() {
        log.debug("radius is %o", this.radius);
    }
});
</script>

<style lang="less">
</style>

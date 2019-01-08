<template>
  <g>
    <circle v-for="i in nConcentric"
            cx="0" cy="0" :r="i * baseRadius" stroke="red" fill="grey" :opacity="opacity"/>
  </g>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
    data() {
        return {
            nConcentric: 4,
            opacity: 0.1,
            baseRadius: 80
        };
    }
});
</script>

<style lang="less">
</style>

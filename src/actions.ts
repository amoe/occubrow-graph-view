// actions.ts

import axios from 'axios';

const API_PREFIX = "/api";

const actions = {
    increment(context) {
        context.commit('increment')
    },
};

export default actions;

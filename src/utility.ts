import { AxiosError } from 'axios';
import * as log from 'loglevel';

const functions = {
    // This is taken from the Axios docs.  Should be ported to loglevel
    handleAxiosError(error: AxiosError) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            log.debug(error.response.data);
            log.debug(error.response.status);
            log.debug(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser
            // and an instance of http.ClientRequest in node.js
            log.debug(error.request);
        } else {
            // Something happened in setting up the request that triggered an 
            // Error
            log.debug('Error', error.message);
        }
        log.debug(error.config);
    }
};

export default functions;

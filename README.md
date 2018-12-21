# occubrow-graph-view

## Library API

We provide several named exports.

`GraphView` is the main entry point.  It takes the following props.

`GraphViewModule` is an export that contains the vuex module.  You can add this
to your own store via some syntax like the following.

    {
       modules: {graphView: GraphViewModule}
    }

## Packaging as library

    ./node_modules/.bin/vue-cli-service build --target lib --name occubrow-graph-view src/library-entry.ts

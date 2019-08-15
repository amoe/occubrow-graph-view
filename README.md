# occubrow-graph-view

## Library API

We provide several named exports.

`GraphView` is the main entry point.  It takes the following props.

`GraphViewModule` is an export that contains the vuex module.  You can add this
to your own store via some syntax like the following.

    {
       modules: {graphView: GraphViewModule}
    }

We provide a file `dist/occubrow-graph-view.css` to contain all required custom
CSS.  You can import this using webpack's `style-loader`, using a line such as
this (in one of your JavaScript files):

    import 'occubrow-graph-view/dist/occubrow-graph-view.css';

## Example usage

Note that the client needs to provide the parent SVG.  It's unclear at the
moment if this is a bug or a feature.

    <svg width="600" height="600">
      <graph-view :width="600"
                  :height="600"
                  :x-margin="162"
                  :y-margin="432"
                  :depth-offset="120"
                  :text-offset="22"
                  :breadth="360"></graph-view>
    </svg>

## Events

The view will emit the event `node-clicked`.  Your handler function for this
event should accept one argument of type `GVNode`.  eg.

    methods: {
        onNodeClicked(n: GVNode) {
            console.log("clicked node was %o", node.data.content);
        }
    }


## Packaging as library

    ./node_modules/.bin/vue-cli-service build --target lib --name occubrow-graph-view src/library-entry.ts
